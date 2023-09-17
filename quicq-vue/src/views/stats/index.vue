<template>
    <div class="">
        <el-page-header :icon="ArrowLeft" class="px-7 py-7 bg-slate-100" @back="backHome">
            <template #content>
                <span class="text-large font-600 mr-3 text-3xl text-bold"> QuikQ Dashboard </span>
                <el-link type="primary" class="mx-10" @click="advanced">Advanced Dashboard</el-link>
            </template>
        </el-page-header>
        <current-people v-if="!isSnyc" :loading="isSnyc"></current-people>
    </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue';
import { ElNotification } from 'element-plus';
import { useRouter } from 'vue-router';
import { onMounted, ref, onBeforeUnmount} from 'vue';
import useDataStore from '@/store/module/sync.ts';
import currentPeople from '@/components/current-people.vue';

const $router = useRouter();

const useStore = useDataStore();

const isSnyc = ref(false);

const timer = ref();

const backHome = () => {
    ElNotification({
        title: "QuizQ",
        message: "Bye~",
        type: "success"
    });
    $router.push('/');

}

onMounted(() => {
    ElNotification({
        title: "QuizQ",
        message: "Welcome to the dashboard!",
        type: "success"
    })
},)

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

const syncData = async () => {
    if(useStore.genesysInfo.name == ''){
        isSnyc.value = true;
    } 
    await useStore.syncData();
    isSnyc.value = false;
}

const advanced = () => {
    $router.push('/dashboard/adv')
}

</script>

<style scoped></style>