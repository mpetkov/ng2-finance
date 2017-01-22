import { Component, ViewEncapsulation, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { ChartVolumeService } from './services/chart-volume.service';
import { ChartCrosshairService } from './services/chart-crosshair.service';
import { ChartTooltipsService } from './services/chart-tooltips.service';
import { ChartOptionsService } from './services/chart-options.service';
import { ChartStateService } from '../state/index';

declare let fc:any;
declare let d3:any;

@Component({
  moduleId: module.id,
  selector: 'mp-d3fc',
  templateUrl: 'd3fc.component.html',
  styleUrls: ['d3fc.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    ChartCrosshairService,
    ChartOptionsService,
    ChartTooltipsService,
    ChartVolumeService
  ]
})

export class D3fcComponent implements AfterViewInit {
  @ViewChild('svg') svg:any;
  private data:any;
  private container:any;
  private chart:any;

  constructor(public chartState:ChartStateService,
              private chartOptionsService:ChartOptionsService,
              private chartCrosshairService:ChartCrosshairService,
              private chartTooltipsService:ChartTooltipsService,
              private chartVolumeService:ChartVolumeService) {
  }

  ngAfterViewInit() {
    this.chartState.data$.subscribe(
      data => this.init(data.rows)
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(e:any) {
    if (this.data) {
      this.render(this.data, this.container, this.chart);
    }
  }

  private init(data:any) {
    if(data) {
      this.data = data;
      this.container = d3.select(this.svg.nativeElement);
      this.chartVolumeService.init(data, this.container);

      this.chart = this.getChart(data);
      let area:any = this.getArea(data, this.chart.yDomain()[0]);
      let line:any = this.getLine();
      let gridlines:any = this.getGridLines();
      let crosshair:any = this.chartCrosshairService.getCrosshair(data, line);
      let lastClose:any = this.chartTooltipsService.getLastClose();

      this.chart.plotArea(fc.series.multi()
        .series([gridlines, area, line, lastClose, crosshair])
        .mapping((series:any) => {
          switch (series) {
            case lastClose:
              return [data[data.length - 1]];
            case crosshair:
              return data.crosshair;
            default:
              return data;
          }
        }));

      this.render(data, this.container, this.chart);
    }
  }

  private render(data:any, container:any, chart:any) {
    container
      .datum(data)
      .call(chart);

    this.chartVolumeService.render(data, chart.xScale());
    this.chartState.changeSelectedPoint(data[data.length - 1]);
    this.applyPostRenderChanges();
  }

  private applyPostRenderChanges() {
    d3.selectAll('.y-axis text')
      .style('text-anchor', 'end')
      .attr('transform', 'translate(-3, -8)');

    d3.selectAll('.x-axis text')
      .attr('dy', undefined)
      .style({'text-anchor': 'start', 'dominant-baseline': 'central'})
      .attr('transform', 'translate(3, -' + (this.chartOptionsService.options.xAxisHeight / 2 + 3) + ' )');

    d3.selection.prototype.moveToFront = function () {
      return this.each(function () {
        this.parentNode.appendChild(this);
      });
    };

    d3.select('.plot-area').moveToFront();
  }

  private getChart(data:any):any {
    return fc.chart.linearTimeSeries()
      .xDomain(fc.util.extent(data, 'date'))
      .yDomain(fc.util.extent(data, ['open', 'close']))
      .xTickFormat(this.chartOptionsService.options.dateFormat)
      .yTickFormat(this.chartOptionsService.options.priceFormat)
      .yTicks(this.chartOptionsService.options.yTicks)
      .yNice(this.chartOptionsService.options.yTicks)
      .yOrient('right')
      .yTickSize(this.chartOptionsService.options.yAxisWidth, 0)
      .xTickSize(this.chartOptionsService.options.xAxisHeight)
      .xTicks(this.chartOptionsService.options.xTicks);
  }

  private getArea(data:any, y0Value:number):any {
    return fc.series.area()
      .y0Value(y0Value)
      .yValue((d:any) => {
        return d.open;
      });
  }

  private getLine():any {
    return fc.series.line()
      .yValue((d:any) => {
        return d.open;
      });
  }

  private getGridLines():any {
    return fc.annotation.gridline()
      .yTicks(this.chartOptionsService.options.yTicks)
      .xTicks(this.chartOptionsService.options.xTicks);
  }
}
