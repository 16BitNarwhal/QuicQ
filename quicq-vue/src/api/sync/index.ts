import request from '@/utils/request'
import type { GenesysInfo, QueueInfo } from './type'
enum API {
  SYNC_URL = '/api/all-lines',
}
export const syncData = () =>
  request.get<any, [GenesysInfo, QueueInfo, QueueInfo]>(API.SYNC_URL)