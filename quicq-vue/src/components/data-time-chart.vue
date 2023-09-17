<template>
    <el-card class="box-card" shadow="hover">
        <template #header>
            <div class="card-header">
                <span>Statistics</span>
                <el-button class="button" text>Operation button</el-button>
            </div>
        </template>
        <v-chart class="chart" :option="option"></v-chart>
    </el-card>
</template>

<script setup lang="ts">

import * as echarts from 'echarts/core';
import {
  TitleComponent,
  CalendarComponent,
  TooltipComponent,
  VisualMapComponent,
} from 'echarts/components';
import { HeatmapChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  CalendarComponent,
  TooltipComponent,
  VisualMapComponent,
  HeatmapChart,
  CanvasRenderer
]);

function getVirtualData(year: string) {
  const date = +echarts.time.parse(year + '-01-01');
  const end = +echarts.time.parse(+year + 1 + '-01-01');
  const dayTime = 3600 * 24 * 1000;
  const data: [string, number][] = [];
  for (let time = date; time < end; time += dayTime) {
    data.push([
      echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
      Math.floor(Math.random() * 10000)
    ]);
  }
  return data;
}

const option = ref({
  title: {
    top: 30,
    left: 'center',
    text: 'Daily Step Count'
  },
  tooltip: {},
  visualMap: {
    min: 0,
    max: 10000,
    type: 'piecewise',
    orient: 'horizontal',
    left: 'center',
    top: 65
  },
  calendar: {
    top: 120,
    left: 30,
    right: 30,
    cellSize: ['auto', 13],
    range: '2016',
    itemStyle: {
      borderWidth: 0.5
    },
    yearLabel: { show: false }
  },
  series: {
    type: 'heatmap',
    coordinateSystem: 'calendar',
    data: getVirtualData('2016')
  }
});

</script>

<style scoped>
.chart {
  height: 35vh;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>