import {Injectable} from '@angular/core';
import {ChartOptionsService} from './chart-options.service';
declare const fc: any;
declare const d3: any;
@Injectable()
export class ChartTooltipsService {
  constructor(private chartOptionsService: ChartOptionsService) {
  }

  getLastClose(): any {
    return fc.annotation.line()
      .value((d: any) => {
        return d.close;
      })
      .label((d: any) => {
        return this.chartOptionsService.options.priceFormat(d.close);
      })
      .decorate((sel: any) => {
        this.addYTooltip(sel);
        sel.enter().classed('close', true);

        sel.attr('transform', function (d: any) {
          let transform: string;
          if (d3.select('.line')) {
            const y: string = d3.select('.line').attr('d').match(/[^,]*$/)[0];
            if (y) {
              transform = 'translate(0, ' + y + ')';
            }
          }

          if (transform) {
            return transform;
          } else {
            return this.getAttribute('transform');
          }
        });
      });
  }

  addYTooltip(sel: any) {
    sel.enter()
      .select('.right-handle')
      .classed('callout', true)
      .insert('path', ':first-child')
      .attr('transform', 'translate(' + this.chartOptionsService.options.calloutLeftMargin + ', 0)')
      .attr('d', d3.svg.area()(this.chartOptionsService.options.calloutPathData));

    sel.select('text')
      .attr('transform',
        'translate(' + (this.chartOptionsService.options.yAxisWidth - 2) + ', '
        + (this.chartOptionsService.options.calloutHeight / 4) + ')')
      .attr('x', 0)
      .attr('y', 0);
  }

  addXTooltip(sel: any) {
    sel.enter()
      .select('.top-handle')
      .select('text')
      .remove();

    sel.select('.bottom-handle')
      .attr('transform', function (d: any) {
        const x: number = this.parentNode.getAttribute('transform').match(/translate\((.*),/).pop();
        if (x < 30) {
          return 'translate(30, 0)';
        } else {
          return 'translate(0, 0)';
        }
      });

    let container: any = sel.enter()
      .select('.bottom-handle');

    container.classed('callout', true)
      .append('rect')
      .attr('transform', 'translate(-30, 0)')
      .attr('width', 60)
      .attr('height', this.chartOptionsService.options.xAxisHeight);

    container.append('text')
      .attr('y', this.chartOptionsService.options.xAxisHeight / 2)
      .text((d: any) => {
        return this.chartOptionsService.options.dateFormat(d.x);
      });

    container = null;
  }
}
