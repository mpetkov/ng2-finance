import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ChartVolumeService } from './services/chart-volume.service';
import { ChartCrosshairService } from './services/chart-crosshair.service';
import { ChartTooltipsService } from './services/chart-tooltips.service';
import { ChartService } from '../chart.service';
import { ChartOptionsService } from './services/chart-options.service';

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

export class D3fcComponent {
  @ViewChild('svg') svg:any;
  constructor(private chartService:ChartService,
              private chartOptionsService:ChartOptionsService,
              private chartCrosshairService:ChartCrosshairService,
              private chartTooltipsService:ChartTooltipsService,
              private chartVolumeService:ChartVolumeService) {

    chartService.data$.subscribe(
      data => this.render(data.rows)
    );
  }

  private render(data:any) {
    let container:any = d3.select(this.svg.nativeElement);
    this.chartVolumeService.init(data, container);

    let chart:any = this.getChart(data);
    let area:any = this.getArea(data, chart.yDomain()[0]);
    let line:any = this.getLine();
    let gridlines:any = this.getGridLines();
    let crosshair:any = this.chartCrosshairService.getCrosshair(data, line);
    let lastClose:any = this.chartTooltipsService.getLastClose();

    chart.plotArea(fc.series.multi()
      .series([gridlines, area, line, lastClose, crosshair])
      .mapping((series) => {
        switch (series) {
          case lastClose:
            return [data[data.length - 1]];
          case crosshair:
            return data.crosshair;
          default:
            return data;
        }
      }));

    container
      .datum(data)
      .call(chart);

    this.chartVolumeService.render(data, chart.xScale());
    this.chartOptionsService.updateSelectedPoint(data[data.length - 1]);

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
      .yTicks(5)
      .yNice(5)
      .yOrient('right')
      .yTickSize(this.chartOptionsService.options.yAxisWidth, 0)
      .xTickSize(this.chartOptionsService.options.xAxisHeight)
      .xTicks(3);
  }

  private getArea(data:any, y0Value:number):any {
    return fc.series.area()
      .y0Value(y0Value)
      .yValue((d) => {
        return d.open;
      });
  }

  private getLine():any {
    return fc.series.line()
      .yValue((d) => {
        return d.open;
      });
  }

  private getGridLines():any {
    return fc.annotation.gridline()
      .yTicks(5)
      .xTicks(0);
  }
}
