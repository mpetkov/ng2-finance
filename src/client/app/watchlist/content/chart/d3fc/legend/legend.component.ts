import { Component, ViewEncapsulation, ElementRef } from '@angular/core';
import { ChartOptionsService } from '../services/chart-options.service';
import { ChartStateService } from '../../state/index';

declare let fc:any;
declare let d3:any;

@Component({
  moduleId: module.id,
  selector: 'mp-legend',
  template: '',
  styleUrls: ['legend.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LegendComponent {
  private legend:any;

  constructor(private chartOptionsService:ChartOptionsService,
              private chartState:ChartStateService,
              private elementRef:ElementRef) {
    this.legend = fc.chart.legend()
      .items([
        ['Open', (d:any) => {
          return this.chartOptionsService.options.priceFormat(d.open);
        }],
        ['Close', (d:any) => {
          return this.chartOptionsService.options.priceFormat(d.close);
        }],
        ['Low', (d:any) => {
          return this.chartOptionsService.options.priceFormat(d.low);
        }],
        ['High', (d:any) => {
          return this.chartOptionsService.options.priceFormat(d.high);
        }],
        ['Vol', (d:any) => {
          return this.chartOptionsService.options.volumeFormat(d.volume);
        }]
      ]);

    this.chartState.point$
      .subscribe(
        data => this.render(data)
      );
  }

  private render(datapoint:any) {
    d3.select(this.elementRef.nativeElement)
      .data([datapoint])
      .call(this.legend);
  }
}
