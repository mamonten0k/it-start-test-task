import { xAxisData, bars, series } from './data';
import { tooltipFormatter } from './helpers';

const config = {
  rotate: 0,
  align: 'middle',
  verticalAlign: 'top',
  position: 'top',
  distance: 20,
};

const mySeries = [
  {
    name: 'В программе ЦП',
    type: 'bar',
    stack: 'stack_1',
    data: series['В программе ЦП'],
    barMaxWidth: '40%',
    itemStyle: {
      color: '#56B9F2',
    },
  },
  {
    name: 'В программе ИТ',
    type: 'bar',
    stack: 'stack_1',
    data: series['В программе ИТ'],
    barMaxWidth: '40%',
    itemStyle: {
      color: '#0078D2',
    },
    label: setLabelOption(0, 2),
  },
  {
    name: 'Вне программ ИТ',
    type: 'bar',
    stack: 'stack_2',
    data: series['Вне программ ИТ'],
    barMaxWidth: '40%',
    itemStyle: {
      color: '#22C38E',
    },
  },
  {
    name: 'Вне программ ЦП',
    type: 'bar',
    stack: 'stack_2',
    data: series['Вне программ ЦП'],
    barMaxWidth: '40%',
    itemStyle: {
      color: '#00724C',
    },
    label: setLabelOption(2, 3),
  },
];

export const chartOptions = {
  title: {
    text: 'Проекты в программах и вне программ',
    subtext:
      'Сумма и процентное соотношение проектов, находящихся в программах и вне программ',
    padding: [0, 0, 40, 0],
  },
  grid: {
    top: 80,
    left: 40,
    height: 220,
  },
  legend: {
    data: bars,
    icon: 'circle',
    bottom: '0',
    emphasis: {},
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line',
    },
    formatter: tooltipFormatter,
  },
  xAxis: {
    data: xAxisData,
    axisLine: { onZero: true },
    splitLine: { show: false },
    splitArea: { show: false },
    axisTick: { show: false },
    axisLine: { show: false },
  },
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: mySeries,
};

export function setLabelOption(iFrom, iTo) {
  return {
    show: true,
    position: config.position,
    distance: config.distance,
    align: config.align,
    verticalAlign: config.verticalAlign,
    rotate: config.rotate,
    normal: {
      show: true,
      position: 'top',
      formatter: (params) => {
        let total = 0;
        console.log(params);
        if (params.seriesIndex < 2) {
          mySeries.slice(iFrom, iTo).forEach((serie) => {
            total += serie.data[params.dataIndex];
          });
        } else {
          mySeries.slice(2).forEach((serie) => {
            total += serie.data[params.dataIndex];
          });
        }

        return total;
      },
    },
    fontSize: 12,
    fontWeight: 'bold',
  };
}
