import { defineStore } from 'Pinia'
import { syncData } from '@/api/sync'
import type { GenesysInfo, QueueInfo } from '@/api/sync/type'

const useDataStore = defineStore('Data', {
  state: () => {
    return {
        ginfo: {id:'0', type: "", name: "", wait_time:0} as GenesysInfo,
        qinfo1: {id:'0', type: "", name: "", wait_time:0, people:0} as QueueInfo,
        qinfo2: {id:'0', type: "", name: "", wait_time:0, people:0} as QueueInfo,
        ginfos: [] as number[],
        qinfos1: [] as number[],
        qinfos2: [] as number[],
        qinfoppl1: [] as number[],
        qinfoppl2: [] as number[],
        times: [] as string[]
    }
  },
  actions: {
    async syncData() {
      let dateTime = new Date();
      const time = dateTime.getHours().toString() + ':' + dateTime.getMinutes().toString();
      const result: [GenesysInfo, QueueInfo, QueueInfo] = await syncData();
      console.log('result',time, result);
      
      [this.$state.ginfo, this.$state.qinfo1, this.$state.qinfo2]=result;
      this.$state.ginfo.name = 'RBC Online Support';
      this.$state.qinfo1.name = 'RBC University Ave 1';
      this.$state.qinfo2.name = 'RBC University Ave 2';
      this.$state.ginfos.push(this.$state.ginfo.wait_time);
      this.$state.qinfos1.push(this.$state.qinfo1.wait_time);
      this.$state.qinfos2.push(this.$state.qinfo2.wait_time);
      this.$state.qinfoppl1.push(this.$state.qinfo1.people);
      this.$state.qinfoppl2.push(this.$state.qinfo2.people);
      this.$state.times.push(time);
      console.log(this.$state.qinfos1);
      
    },
  },
  getters: {
    genesysInfo: (state):GenesysInfo => state.ginfo,
    quereInfo1: (state):QueueInfo => state.qinfo1,
    quereInfo2: (state):QueueInfo => state.qinfo2,
    genesysInfoHistory: (state):number[] =>state.ginfos,
    queueInfoHistory1: (state):number[] =>state.qinfos1,
    queueInfoHistory2: (state):number[] =>state.qinfos2,
    queueInfoHistoryPpl1: (state):number[] =>state.qinfoppl1,
    queueInfoHistoryPpl2: (state):number[] =>state.qinfoppl2,
    syncTimeHistory: (state):string[] => state.times,
  },
})

export default useDataStore