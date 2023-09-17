<template>
    <el-card class="box-card" shadow="hover">
        <template #header>
            <div class="card-header">
                <span>Current People in the queue</span>
                <el-select v-model="currentCamera" class="m-2" placeholder="Select" size="large" value-key="index" @change="selectorChangeHandler">
                    <el-option
                    v-for="item in cameraList"
                    :disabled = "item.waitTime == 0"
                    :key="item.index"
                    :label="item.name"
                    :value="item"
                    />
                </el-select>
            </div>
        </template>
        <el-tag :type="occupancyTagColor">{{ occupancyStatus }}</el-tag>
        <el-skeleton :loading="currentCamera.name==''"/>
        <el-text :style="currentCamera.name=='' ? 'opacity:0' : 'opacity:100'">There are currently {{ currentCamera?.peopleCnt }} people in the queue: {{ currentCamera?.name }}.</el-text>
    </el-card>
</template>

<script setup lang="ts">
    import {ref, onMounted} from 'vue';
    import useDataStore from '@/store/module/sync';

    type Camera = {
        index: number,
        name: string,
        peopleCnt: number,
        maximumCapacity: number
    };

    const genesysInfo = useDataStore().genesysInfo
    const quereInfo1 = useDataStore().quereInfo1
    const quereInfo2 = useDataStore().quereInfo2

    //placeholders, need to be fetched from DB.
    const cameraList = ref([
     {index: 0, name: quereInfo1.name, peopleCnt: quereInfo1.people, maximumCapacity: 50, waitTime: quereInfo1.wait_time}, 
     {index: 1, name: quereInfo2.name, peopleCnt: quereInfo2.people, maximumCapacity: 50, waitTime: quereInfo2.wait_time}, 
     {index: 2, name: genesysInfo.name, peopleCnt: 0, maximumCapacity: 0, waitTime: genesysInfo.wait_time}, 
     {index: 3, name: 'Data_source_4', peopleCnt: 0, maximumCapacity: 0, waitTime: 0}, 
     {index: 4, name: 'Data_source_5', peopleCnt: 0, maximumCapacity: 0, waitTime: 0}, 
    ]);

    const currentCamera = ref<Camera>(cameraList.value[0]);

    const occupancyStatus = ref("Analyzing...");

    const occupancyTagColor = ref("info");

    const selectorChangeHandler = () =>{
        if(currentCamera.value == null) return;
        const occupancyRatio = currentCamera.value.peopleCnt / currentCamera.value.maximumCapacity;
        
        if(occupancyRatio <= 0.2){
            occupancyStatus.value = "Not Occupied";
            occupancyTagColor.value = "success";
        }
        else if(occupancyRatio <= 0.4){
            occupancyStatus.value = "Somehow Occupied";
            occupancyTagColor.value = "";
        }
        else if(occupancyRatio <= 0.6){
            occupancyStatus.value = "Occupied";
            occupancyTagColor.value = "info";
        }
        else if(occupancyRatio <= 0.8){
            occupancyStatus.value = "Quite Occupied";
            occupancyTagColor.value = "warning";
        }
        else{
            occupancyStatus.value = "Over Occupied";
                occupancyTagColor.value = "danger";
        }
    }

    onMounted(() => {
        selectorChangeHandler();
    })

</script>

<style scoped>

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>