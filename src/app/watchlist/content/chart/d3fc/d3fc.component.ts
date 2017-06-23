import {AfterViewInit, Component, ElementRef, HostListener, ViewChild, ViewEncapsulation} from '@angular/core';
import {ChartVolumeService} from './services/chart-volume.service';
import {ChartCrosshairService} from './services/chart-crosshair.service';
import {ChartTooltipsService} from './services/chart-tooltips.service';
import {ChartOptionsService} from './services/chart-options.service';
import {CoreSubscriptions} from '../../../../shared/core/subscriptions';
import {ChartDataInterface} from '../state/chart-state';
import {ChartStateService} from '../state/chart-state.service';

declare const fc: any;
declare const d3: any;

@Component({
  selector: 'mp-d3fc',
  templateUrl: './d3fc.component.html',
  styleUrls: ['./d3fc.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    ChartCrosshairService,
    ChartOptionsService,
    ChartTooltipsService,
    ChartVolumeService
  ]
})

export class D3fcComponent extends CoreSubscriptions implements AfterViewInit {
  @ViewChild('svg') svg: ElementRef;
  smallView = false;
  private data: ChartDataInterface[];
  private container: any;
  private chart: any;
  private range: string;
  private windowWidth: number = window.innerWidth;

  constructor(public chartState: ChartStateService,
              private chartOptionsService: ChartOptionsService,
              private chartCrosshairService: ChartCrosshairService,
              private chartTooltipsService: ChartTooltipsService,
              private chartVolumeService: ChartVolumeService) {
    super();

    this.subscriptions.push(chartState.range$.subscribe(
      range => this.range = range
    ));

    d3.selection.prototype.moveToFront = function () {
      return this.each(function () {
        this.parentNode.appendChild(this);
      });
    };

    this.updateSettings();
  }

  ngAfterViewInit() {
    this.subscriptions.push(this.chartState.data$.subscribe(
      data => this.init(data)
    ));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.resize(event.currentTarget.innerWidth);
  }

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event: any) {
    this.resize(event.currentTarget.innerWidth);
  }

  private resize(windowWidth: number) {
    this.windowWidth = windowWidth;
    if (this.data) {
      this.redraw(this.data, this.container, this.chart);
    }
  }

  private init(data: ChartDataInterface[]) {
    if (data && data.length > 0) {
      this.data = data;
      this.container = d3.select(this.svg.nativeElement);
      this.chartVolumeService.init(data, this.container);
      this.render(data);
      this.redraw(data, this.container, this.chart);
    }
  }

  private render(data: any) {
    this.chart = this.getChart(data);
    const area: any = this.getArea(this.chart.yDomain()[0]);
    const line: any = this.getLine();
    const gridlines: any = this.getGridLines();
    const crosshair: any = this.chartCrosshairService.getCrosshair(data, line);
    const lastClose: any = this.chartTooltipsService.getLastClose();

    const items: any[] = [gridlines, area, line];
    if (!this.smallView) {
      items.push(lastClose, crosshair);
    }

    this.chart.plotArea(fc.series.multi()
      .series(items)
      .mapping((series: any) => {
        switch (series) {
          case lastClose:
            return [data[data.length - 1]];
          case crosshair:
            return data.crosshair;
          default:
            return data;
        }
      }));
  }

  private redraw(data: ChartDataInterface[], container: any, chart: any) {
    const render: boolean = this.updateSettings();
    if (render) {
      this.render(data);
    }

    container
      .datum(data)
      .call(chart);

    this.chartVolumeService.render(data, chart.xScale());
    this.chartState.changePoint(data[data.length - 1]);
    this.applyPostRenderChanges();
  }

  private updateSettings() {
    let render = false;
    if (this.windowWidth < 420) {
      if (!this.smallView) {
        this.smallView = true;
        this.chartOptionsService.options.yAxisWidth = 0;
        this.chartOptionsService.options.yAxisLeftMargin = 3;
        this.chartOptionsService.options.xTicks = 3;
        this.chartOptionsService.options.yTicks = 3;
        render = true;
      }
    } else if (this.smallView) {
      this.smallView = false;
      this.chartOptionsService.options.yAxisWidth = 55;
      this.chartOptionsService.options.yAxisLeftMargin = -3;
      this.chartOptionsService.options.xTicks = 4;
      this.chartOptionsService.options.yTicks = 8;
      render = true;
    }

    return render;
  }

  private applyPostRenderChanges() {
    d3.selectAll('.y-axis text')
      .style('text-anchor', 'end')
      .attr('transform', 'translate(' + this.chartOptionsService.options.yAxisLeftMargin + ', -8)');

    d3.selectAll('.x-axis text')
      .attr('dy', undefined)
      .style({'text-anchor': 'start', 'dominant-baseline': 'central'})
      .attr('transform', 'translate(3, -' + (this.chartOptionsService.options.xAxisHeight / 2 + 3) + ' )');

    if (!this.smallView) {
      d3.select('.plot-area').moveToFront();
    }
  }

  private getChart(data: ChartDataInterface[]): any {
    return fc.chart.linearTimeSeries()
      .xDomain(fc.util.extent(data, 'date'))
      .yDomain(fc.util.extent(data, ['open', 'close']))
      .xTickFormat(this.chartOptionsService.getDateFormat(this.range))
      .yTickFormat(this.chartOptionsService.options.priceFormat)
      .yTicks(this.chartOptionsService.options.yTicks)
      .yNice(this.chartOptionsService.options.yTicks)
      .yOrient('right')
      .yTickSize(this.chartOptionsService.options.yAxisWidth, 0)
      .xTickSize(this.chartOptionsService.options.xAxisHeight)
      .xTicks(this.chartOptionsService.options.xTicks);
  }

  private getArea(y0Value: number): any {
    return fc.series.area()
      .y0Value(y0Value)
      .yValue((d: any) => {
        return d.open;
      });
  }

  private getLine(): any {
    return fc.series.line()
      .yValue((d: any) => {
        return d.open;
      });
  }

  private getGridLines(): any {
    return fc.annotation.gridline()
      .yTicks(this.chartOptionsService.options.yTicks)
      .xTicks(this.chartOptionsService.options.xTicks);
  }
}
