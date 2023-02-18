import './index.css';
import * as echarts from 'echarts';

import { chartOptions } from './specs/chart';

const myChart = echarts.init(document.getElementById('chart'));

myChart.setOption(chartOptions);
