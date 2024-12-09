import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ScrollerLazyLoadEvent, ScrollerModule } from 'primeng/scroller';
import { ItemHeight } from '../constants';
import { DataSourceApiService } from '../data-source-api.service';
import { Quote } from '../data.model';

@Component({
  selector: 'app-scroll-forward',
  standalone: true,
  imports: [
    CommonModule,
    ScrollerModule
  ],
  providers: [
    DataSourceApiService
  ],
  templateUrl: './scroll-forward.component.html',
  styleUrl: './scroll-forward.component.scss'
})
export class ScrollForwardComponent {
  readonly itemHeight = ItemHeight;

  constructor(protected dataSourceApiService: DataSourceApiService) {
    // set document css variable for scroller
    document.documentElement.style.setProperty('--scroller-item-height', `${ ItemHeight }px`);
  }

  protected trackByFn(index: number, item: Quote) {
    return item.id;
  }

  protected loadFirstTime(event?: ScrollerLazyLoadEvent) {
    if (this.dataSourceApiService.loading || this.dataSourceApiService.response) return;

    console.log('loadFirstTime', event);
    this.dataSourceApiService.load();
  }

  protected scrollIndexChange(event: ScrollerLazyLoadEvent) {
    if (this.dataSourceApiService.loading) return;

    // prevent loading if there are no more items
    if (!this.dataSourceApiService.response?.hasMore) return;

    // wait for the last item to be rendered before loading more
    if (this.dataSourceApiService.getData().length !== event.last) return;

    // console.log('scrolling notifications - start', this.loading);
    console.log('scrollIndexChange', event)
    this.dataSourceApiService.load();
  }
}
