<template>
  <div class="">
    <el-page-header :icon="ArrowLeft" class="px-7 py-7 bg-slate-100" @back="backHome">
    <template #content>
      <span class="text-large font-600 mr-3 text-3xl text-bold"> QuikQ Dashboard Advanced </span>
      <el-link type="primary" class="mx-10" @click="simplified">Basic Dashboard</el-link>
    </template>
  </el-page-header>
  <el-row :gutter="0" :class="'mb-5 ml-0 mr-0'" justify="space-between">
    <el-col :span="6">
      <pie-chart></pie-chart>
    </el-col>
    <el-col :span="6">
      <current-people></current-people>
    </el-col>
    <el-col :span="6">
      <fold-chart :camera-info="cameraList[0]"></fold-chart>
    </el-col>
    <el-col :span="6">
      <fold-chart :camera-info="cameraList[1]"></fold-chart>
    </el-col>
  </el-row>
  <el-row :gutter="0" justify="space-between">
    <el-col :span="6">
      <stacked-fold></stacked-fold>
    </el-col>
    <el-col :span="6">
      <fold-chart :camera-info="cameraList[2]"></fold-chart>
    </el-col>
    <el-col :span="6">
      <fold-chart :camera-info="cameraList[3]"></fold-chart>
    </el-col>
    <el-col :span="6">
      <fold-chart :camera-info="cameraList[4]"></fold-chart>
    </el-col>
  </el-row>
  </div>
</template>
  
<script setup lang="ts">
  import { ArrowLeft } from '@element-plus/icons-vue'
  import { ElNotification } from 'element-plus'
  import pieChart from '@/components/pie-chart.vue';
  import {useRouter} from 'vue-router';
  import currentPeople from '@/components/current-people.vue';
  import foldChart from '@/components/fold-chart.vue';
  import stackedFold from '@/components/stacked-fold.vue';
  import {ref, onMounted, onBeforeUnmount} from 'vue';
  import useDataStore from '@/store/module/sync.ts'

  const $router = useRouter();

  const useStore = useDataStore();

  const timer = ref();

  const backHome = () =>{
    ElNotification({
        title:"QuizQ",
        message:"Bye~",
        type:"success"
      });
      $router.push('/');
      
  }

  onMounted(() => {
    ElNotification({
        title:"QuizQ",
        message:"Welcome to the dashboard!",
        type:"success"
      });
  })

  onMounted(() => {
  timer.value = null;
  timer.value = setInterval(() => {
    syncData();
  }, 5000);
})

onBeforeUnmount(() => {
  clearInterval(timer.value)
  timer.value = null;
})


  const genesysInfo = useDataStore().genesysInfo
  const quereInfo1 = useDataStore().quereInfo1
  const quereInfo2 = useDataStore().quereInfo2

    //placeholders, need to be fetched from DB.
    const cameraList = ref([
     {index: 0, name: quereInfo1.name, peopleCnt: quereInfo1.people, maximumCapacity: 50, waitTime: quereInfo1.wait_time}, 
     {index: 1, name: quereInfo2.name, peopleCnt: quereInfo2.people, maximumCapacity: 50, waitTime: quereInfo2.wait_time}, 
     {index: 2, name: genesysInfo.name, peopleCnt: 0, maximumCapacity: 0, wait_time: genesysInfo.wait_time}, 
     {index: 3, name: 'Data_source_4', peopleCnt: 0, maximumCapacity: 0, wait_time: 0}, 
     {index: 4, name: 'Data_source_5', peopleCnt: 0, maximumCapacity: 0, wait_time: 0}, 
    ]);
  const syncData = async () =>{
    await useStore.syncData();
  }

  const simplified = () => {
    $router.push('/dashboard')
  }

</script>

<style scoped>
</style>