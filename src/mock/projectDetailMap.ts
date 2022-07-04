interface ProjectDetail {
  title: string
  bpm: number
  authorId: string
  trackAmount: number
  barAmount: number
  createTime: number
  updateTime: number
  introduce: string
}

const project1 = {
  title: '默认项目',
  bpm: 120,
  authorId: '001',
  trackAmount: 0,
  barAmount: 0,
  createTime: 1656381348612,
  updateTime: 1656381348612,
  introduce: '默认项目介绍',
}
const project2 = {
  title: '测试项目',
  bpm: 120,
  authorId: '001',
  trackAmount: 3,
  barAmount: 8,
  createTime: 1656381348612,
  updateTime: 1656381348612,
  introduce: '测试项目介绍',
}
const project3 = {
  title: '项目1',
  bpm: 120,
  authorId: '001',
  trackAmount: 1,
  barAmount: 8,
  createTime: 1656381348612,
  updateTime: 1656381348612,
  introduce: '项目1介绍',
}
const project4 = {
  title: '项目2',
  bpm: 120,
  authorId: '001',
  trackAmount: 1,
  barAmount: 8,
  createTime: 1656381348612,
  updateTime: 1656381348612,
  introduce: '项目2介绍',
}
const project5 = {
  title: '项目3',
  bpm: 120,
  authorId: '001',
  trackAmount: 1,
  barAmount: 8,
  createTime: 1656381348612,
  updateTime: 1656381348612,
  introduce: '项目3介绍',
}
const project6 = {
  title: '项目4',
  bpm: 120,
  authorId: '001',
  trackAmount: 1,
  barAmount: 8,
  createTime: 1656381348612,
  updateTime: 1656381348612,
  introduce: '项目4介绍',
}
const project7 = {
  title: '全部项目',
  bpm: 120,
  authorId: '001',
  trackAmount: 4,
  barAmount: 4,
  createTime: 1656381348612,
  updateTime: 1656381348612,
  introduce: '全部项目介绍',
}

const projectDetailMap: Map<number, ProjectDetail> = new Map()

projectDetailMap.set(0, project1)
projectDetailMap.set(1, project2)
projectDetailMap.set(5678, project3)
projectDetailMap.set(7823, project4)
projectDetailMap.set(7456, project5)
projectDetailMap.set(7343, project6)
projectDetailMap.set(4509, project7)

export default projectDetailMap
