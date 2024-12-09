import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Scroller } from 'primeng/scroller';
import { catchError, take, tap } from 'rxjs';
import { DefaultLimit, StartPosition } from './constants';
import { Quote } from './data.model';
import { QuotesResponse } from './response.model';

@Injectable()
export class DataSourceApiService {
  readonly limit = DefaultLimit;
  private skip = StartPosition;

  private htttpClient = inject(HttpClient);
  private url = (limit = this.limit, skip = this.skip) => `https://dummyjson.com/quotes?limit=${ limit }&skip=${ skip }`;

  private _loading = false;
  public get loading() {
    return this._loading;
  }
  public set loading(value: boolean) {
    this._loading = value;
  }

  private _response?: QuotesResponse;
  public set response(value: QuotesResponse | undefined) {
    this._response = value;
  }
  public get response() {
    return this._response;
  }

  private _data: Quote[] = [];
  private set data(value: Quote[]) {
    this._data = value;
  }

  private scrollToBottom(scroller: Scroller, id: number) {
    const index = this.findIndexById(id);
    console.log('scrollToBottom', index, id);

    setTimeout(() => {
      scroller.scrollToIndex(index, 'smooth');
      console.log('scrollToBottom -- done');
    }, 300);

    // const element = scroller.getElementRef().nativeElement;
    // scroller.scrollInView(0, 'to-end');
    // scroller.scrollToIndex(0);

    // scroll to the last item
    // element.scrollTop = element.scrollHeight;

    // scroll to the last item with animation
    // element.scrollTo({
    //   top: element.scrollHeight,
    //   behavior: 'smooth'
    // });


  }


  public getData(reverse?: boolean) {
    if (reverse) {
      return this._data.slice().reverse();
    }

    return this._data;
  }

  public firstitem() {
    return this._data[0];
  }

  public lastItem() {
    return this._data[this._data.length - 1];
  }

  public findIndexById(id: number) {
    return this._data.findIndex(item => item.id === id);
  }

  public load(scroller?: Scroller, scrollToBottom?: boolean) {
    if (this.loading) return;

    const url = this.url();

    this.loading = true;
    console.log('load', url);

    this.htttpClient.get<QuotesResponse>(url).pipe(
      take(1),
      tap(response => {
        const hasMore = response.total > response.skip + response.limit;
        this.response = { ...response, hasMore };

        this.loading = false;

        if (this._data.length) {
          this._data.push(...response.quotes);
        } else {
          this._data = response.quotes;
        }
      }),
      tap(() => {
        this.skip += this.limit;
      }),
      catchError(error => {
        console.error(error);
        this.loading = false;
        return [];
      })
    ).subscribe(() => {
      console.log('loaded', this.response);

      if (scroller && scrollToBottom) {
        this.scrollToBottom(scroller, this.lastItem().id);
      }
    });
  }
}
