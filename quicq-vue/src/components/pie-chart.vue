<template>
    <el-card class="box-card" shadow="hover">
        <template #header>
            <div class="card-header">
                <span>Occupancy Percentage</span>
                <el-button class="button" text @click="switchDailyHistory">{{ switchButtonText }}</el-button>
            </div>
        </template>
        <v-chart class="chart" :option="option"></v-chart>
    </el-card>
</template>

<script setup lang="ts">
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide } from "vue";

const isDaily = ref(true)

const switchButtonText = ref("Switch to History Data")

use([
    CanvasRenderer,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent
]);

provide(THEME_KEY, "light");

const dailyData = ref([
                { value: 9, name: "Not occupied" },
                { value: 5, name: "Somehow occupied" },
                { value: 3, name: "Occupied" },
                { value: 3, name: "Quite occupied" },
                { value: 4, name: "Over occupied" }
]);

const historyData = ref([
                { value: 335, name: "Not occupied" },
                { value: 310, name: "Somehow occupied" },
                { value: 234, name: "Occupied" },
                { value: 135, name: "Quite occupied" },
                { value: 1548, name: "Over occupied" }
]);

const option = ref({
    title: {
        text: "Daily Occupancy Status",
        left: "center"
    },
    tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} hours ({d}%)"
    },
    legend: {
        orient: "vertical",
        left: "left",
        data: ["Not occupied", "Somehow occupied", "Occupied", "Quite occupied", "Over occupied"]
    },
    series: [
        {
            name: "Daily Occupancy Status",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: dailyData.value,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                }
            }
        }
    ]
});

const switchDailyHistory = ( )=>{
    if(isDaily.value)
    {
        isDaily.value = false;
        option.value.title.text = "History Occupancy Status";
        option.value.series[0].name = "History Occupancy Status";
        option.value.series[0].data = historyData.value;
        switchButtonText.value = "Switch to Daily Data"
    }
    else
    {
        isDaily.value = true;
        option.value.title.text = "Daily Occupancy Status";
        option.value.series[0].name = "Daily Occupancy Status";
        option.value.series[0].data = dailyData.value;
        switchButtonText.value = "Switch to History Data"
    }
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