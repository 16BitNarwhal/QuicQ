export interface GenesysInfo{
id: string,
type: string,
name: string,
wait_time: number
}

export interface QueueInfo{
[x: string]: any
id: string,
type: string,
name: string,
wait_time: number,
people: number
}