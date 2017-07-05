import {Injectable} from '@angular/core';
import {ChartTooltipsService} from './chart-tooltips.service';
import {ChartOptionsService} from './chart-options.service';
import {ChartStateService} from '../../state/chart-state.service';
declare const fc: any;
declare const d3: any;

@Injectable()
export class ChartCrosshairService {
  constructor(private chartTooltipsService: ChartTooltipsService,
              private chartOptionsService: ChartOptionsService,
              private chartState: ChartStateService) {
  }

  getCrosshair(data: any, line: any): any {
    data.crosshair = [];
    return fc.tool.crosshair()
      .snap(fc.util.seriesPointSnapXOnly(line, data))
      .xLabel((d: any) => {
        return this.chartOptionsService.options.dateFormat(d.datum.date);
      })
      .yLabel((d: any) => {
        return this.chartOptionsService.options.priceFormat(d.datum.close);
      })
      .decorate((sel: any) => {
        this.updateElements(sel);
        this.chartTooltipsService.addYTooltip(sel);
        this.chartTooltipsService.addXTooltip(sel);
      })
      .on('trackingmove', (crosshairData: any) => {
        if (crosshairData[0]) {
          this.chartState.changePoint(crosshairData[0].datum);
        }
      })
      .on('trackingend', () => {
        this.chartState.changePoint(data[data.length - 1]);
      });
  }

  private updateElements(sel: any) {
    if (sel[0].length !== 0) {
      sel.select('circle')
        .attr('transform', sel.select('.trackball').attr('transform'));
    }
    sel.enter().select('circle')
      .attr('r', 3);

    sel.select('.trackball')
      .attr('transform', 'translate(0,0)');
  }
}
