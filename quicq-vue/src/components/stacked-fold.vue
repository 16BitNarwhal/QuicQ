<template>
<el-card class="box-card" shadow="hover">
        <template #header>
            <div class="card-header">
                <span>Occupancy Percentage</span>
            </div>
        </template>
        <v-chart class="chart" :option="option"></v-chart>
    </el-card>
</template>

<script setup lang="ts">
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide } from "vue";

use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  LineChart,
  CanvasRenderer
])

provide(THEME_KEY, "light");

const option = ref({
  title: {
    text: 'Stacked Line'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Not occupied', 'Somehow occupied', 'Occupied', 'Quite occupied', 'Over occupied'],
    right: "right"
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Total',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
});
</script>

<style scoped>
.chart {
  height: 37vh;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>