<template>
    <el-card class="box-card" shadow="hover">
        <template #header>
            <div class="card-header">
                <span>Occupancy Percentage</span>
            </div>
        </template>
        <el-skeleton :loading="props.cameraInfo.waitTime == 0 " :rows="8"></el-skeleton>
        <v-chart :class="props.cameraInfo.waitTime == 0 ? 'display:none;' : 'chart'" :option="option"></v-chart>
    </el-card>
</template>

<script setup lang="ts">
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent, TitleComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide } from "vue";
import useDataStore from '@/store/module/sync';

use([GridComponent, LineChart, CanvasRenderer, TitleComponent, TooltipComponent]);

provide(THEME_KEY, "light");

const props = defineProps(['cameraInfo']);

type Camera = {
        index: number,
        name: string,
        peopleCnt: number,
        maximumCapacity: number
    };

const cameraInfo:Camera = props['cameraInfo'];

const option = ref({
title: {
        text: "",
        left: "center"
    },
tooltip: {
        trigger: "item",
        formatter: "There are {c} people in the line @ {b}"
    },
  xAxis: {
    type: 'category',
    data:  useDataStore().syncTimeHistory
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data:  [0],
      type: 'line'
    }
]
});


if(cameraInfo.index == 0) 
{
  option.value.title.text = 'RBC University Ave. Waiting Time'
  option.value.series[0].data = useDataStore().queueInfoHistory1;
  option.value.tooltip.formatter = "Waiting time is {c} seconds @ {b}"
}
if(cameraInfo.index == 1){
  option.value.title.text = 'RBC Phillip St. Waiting Time'
  option.value.series[0].data = useDataStore().queueInfoHistory2;
  option.value.tooltip.formatter = "Waiting time is {c} seconds @ {b}"
} 
if(cameraInfo.index == 2){
  option.value.title.text = 'RBC Online Support Waiting Time'
  option.value.series[0].data = useDataStore().genesysInfoHistory;
  option.value.tooltip.formatter = "Waiting time is {c} seconds @ {b}"
} 
if(cameraInfo.index == 3){
  option.value.title.text = 'RBC University Ave. People Count'
  option.value.series[0].data = useDataStore().queueInfoHistoryPpl1;
} 
if(cameraInfo.index == 4){
  option.value.title.text = 'RBC Phillip St. People Count'
  option.value.series[0].data = useDataStore().queueInfoHistoryPpl2;
} 
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