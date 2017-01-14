import { Injectable } from '@angular/core';
import { ChartTooltipsService } from './chart-tooltips.service';
import { ChartOptionsService } from './chart-options.service';
declare let fc:any;
declare let d3:any;

@Injectable()
export class ChartCrosshairService {
  constructor(private chartTooltipsService:ChartTooltipsService,
              private chartOptionsService:ChartOptionsService) {
  }

  getCrosshair(data:any, line:any):any {
    data.crosshair = [];
    return fc.tool.crosshair()
      .snap(fc.util.seriesPointSnapXOnly(line, data))
      .xLabel((d:any) => {
        return this.chartOptionsService.options.dateFormat(d.datum.date);
      })
      .yLabel((d:any) => {
        return this.chartOptionsService.options.priceFormat(d.datum.close);
      })
      .decorate((sel:any) => {
        this.updateElements(sel);
        this.chartTooltipsService.addYTooltip(sel);
        this.chartTooltipsService.addXTooltip(sel);
      })
      .on('trackingmove', (crosshairData) => {
        this.chartOptionsService.updateSelectedPoint(crosshairData[0].datum);
      })
      .on('trackingend', () => {
        this.chartOptionsService.updateSelectedPoint(data[data.length - 1]);
      });
  }

  private updateElements(sel:any) {
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
