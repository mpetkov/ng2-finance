import { Component, ViewEncapsulation } from '@angular/core';
import { ChartsService } from './chart.service';

declare let fc:any;
declare let d3:any;

@Component({
  moduleId: module.id,
  selector: 'mp-chart',
  templateUrl: 'chart.component.html',
  styleUrls: ['chart.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ChartsService]
})

export class ChartComponent {
  constructor(private chartsService: ChartsService) {
    chartsService.data$.subscribe(
      data => this.dataLoaded(data)
    );

    chartsService.load('YHOO');
  }

  private dataLoaded(data:any) {
    this.render(data.rows);
  }

  private render(data:any[]) {
    var yAxisWidth = 40,
      xAxisHeight = 20,
      calloutLeftMargin = 10,
      calloutHeight = 14,
      calloutWidth = yAxisWidth - calloutLeftMargin;

    var dateFormat = d3.time.format('%b%e \'%y');
    var priceFormat = d3.format('.2f');
    var volumeFormat = d3.format('s');

    function calloutPathData(width, height) {
      var h2 = height / 2;
      return [
        [0, 0],
        [h2, -h2],
        [width, -h2],
        [width, h2],
        [h2, h2],
        [0, 0]
      ];
    }

    function addCallout(sel) {
      sel.enter()
        .select('.right-handle')
        .classed('callout', true)
        .insert('path', ':first-child')
        .attr('transform', 'translate(' + calloutLeftMargin + ', 0)')
        .attr('d', d3.svg.area()(calloutPathData(calloutWidth, calloutHeight)));

      sel.select('text')
        .attr('transform', 'translate(' + yAxisWidth + ', ' + (calloutHeight / 4) + ')')
        .attr('x', 0)
        .attr('y', 0);
    }

    function addXCallout(sel) {
      sel.enter()
        .select('.top-handle')
        .select('text')
        .remove();

      var xLabelContainer = sel.enter()
        .select('.bottom-handle');

      xLabelContainer.classed('callout', true)
        .append('rect')
        .attr('transform', 'translate(-40, 0)')
        .attr('width', 80)
        .attr('height', xAxisHeight);

      xLabelContainer.append('text')
        .attr('y', xAxisHeight / 2)
        .text(function(d) { return dateFormat(d.x); });
    }

    var legend = fc.chart.legend()
      .items([
        ['open', function(d) { return priceFormat(d.open); }],
        ['high', function(d) { return priceFormat(d.high); }],
        ['low', function(d) { return priceFormat(d.low); }],
        ['close', function(d) { return priceFormat(d.close); }],
        ['volume', function(d) { return volumeFormat(d.volume); }]
      ]);

    function renderLegend(datapoint) {
      d3.select('#legend')
        .data([datapoint])
        .call(legend);
    }

    data.crosshair = [];

    // add a volume series container to the layout
    var container = d3.select('#time-series');
    var volumeContainer = container.selectAll('g.volume')
      .data([data]);
    volumeContainer.enter()
      .append('g')
      .attr({
        'class': 'volume',
      })
      .layout({
        position: 'absolute',
        top: 150,
        bottom: xAxisHeight,
        right: yAxisWidth,
        left: 0
      });

    var layout = fc.layout();
    container.layout();

    var volumeScale = d3.scale.linear()
      .domain([0, d3.max(data, function (d) { return Number(d.volume); })])
      .range([volumeContainer.layout('height'), 0]);

    // add a time series components
    var chart = fc.chart.linearTimeSeries()
      .xDomain(fc.util.extent(data, 'date'))
      .yDomain(fc.util.extent(data, ['open', 'close']))
      .xTickFormat(dateFormat)
      .yTickFormat(priceFormat)
      .yTicks(5)
      .yNice(5)
      .yOrient('right')
      .yTickSize(yAxisWidth, 0)
      .xTickSize(xAxisHeight)
      .xTicks(3);

    // create the line annotations
    /*var emaClose = fc.annotation.line()
      .value(function(d) { return d.exponentialMovingAverage; })
      .label(function(d) { return priceFormat(d.exponentialMovingAverage); })
      .decorate(function(sel) {
        addCallout(sel);
        sel.enter().classed('ema', true);
      });*/

    var lastClose = fc.annotation.line()
      .value(function(d) { return d.close; })
      .label(function(d) { return priceFormat(d.close); })
      .decorate(function(sel) {
        addCallout(sel);
        sel.enter().classed('close', true);
      });

    // create the series
    var area = fc.series.area()
      .y0Value(chart.yDomain()[0])
      .yValue(function(d) { return d.open; });

    var line = fc.series.line()
      .yValue(function(d) { return d.open; });

    var emaLine = fc.series.line()
      .yValue(function(d) { return d.exponentialMovingAverage; })
      .decorate(function(g) {
        g.classed('ema', true);
      });

    var gridlines = fc.annotation.gridline()
      .yTicks(5)
      .xTicks(0);

    // add a crosshair
    var crosshair = fc.tool.crosshair()
      .snap(fc.util.seriesPointSnapXOnly(line, data))
      .xLabel(function(d) { return dateFormat(d.datum.date); })
      .yLabel(function(d) { return priceFormat(d.datum.close); })
      .decorate(function(sel) {
        if(sel[0].length !== 0) {
          sel.select('circle')
            .attr('transform', sel.select('.trackball').attr('transform'));
        }
        sel.enter().select('circle')
          .attr('r', 3);

        sel.select('.trackball')
          .attr('transform', 'translate(0,0)');

        addCallout(sel);
        addXCallout(sel);
      })
      .on('trackingmove', function(crosshairData) {
        renderLegend(crosshairData[0].datum);
      })
      .on('trackingend', function() {
        renderLegend(data[data.length - 1]);
      });

    // combine the series with a 'multi'
    var multi = fc.series.multi()
      .series([gridlines, area, emaLine, line, lastClose, crosshair])
      .mapping(function(series) {
        switch (series) {
          case lastClose:
            return [data[data.length - 1]];
          case crosshair:
            return data.crosshair;
          default:
            return data;
        }
      });

    chart.plotArea(multi);

    // render the chart
    d3.select('#time-series')
      .datum(data)
      .call(chart);

    // create a volume series and render
    var volume = fc.series.bar()
      .xScale(chart.xScale())
      .yScale(volumeScale)
      .yValue(function(d) { return d.volume; })
      .decorate(function(sel) {
        sel.select('path')
          .style('stroke', function(d, i) {
            return d.close > d.open ? 'red' : 'green';
          });
      });

    volumeContainer
      .datum(data)
      .call(volume);

    // render the legend
    renderLegend(data[data.length - 1]);

    // customise the D3 axis
    d3.selectAll('.y-axis text')
      .style('text-anchor', 'end')
      .attr('transform', 'translate(-3, -8)');

    d3.selectAll('.x-axis text')
      .attr('dy', undefined)
      .style({'text-anchor': 'start', 'dominant-baseline': 'central'})
      .attr('transform', 'translate(3, -' + (xAxisHeight / 2 + 3) + ' )');
  }
}
