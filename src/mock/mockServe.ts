import Mock from 'mockjs'
import projectList from './projectList'
import projectDataMap from './projectDataMap'
import projectDetailMap from './projectDetailMap'
import gerProjectIdFromUrl from './gerProjectIdFromUrl'

interface Option {
  url: string
  type: string
  body: string
}

// 登录请求
Mock.mock('/mock/login', 'post', (option: Option) => {
  //请求相关的参数
  const { userName, password } = JSON.parse(option.body)
  const volid = userName.length > 1 && password.length > 1
  if (!volid) {
    return {
      code: 400,
      message: '登录失败',
      ok: false,
      data: null,
    }
  } else {
    return {
      code: 200,
      message: '登录成功',
      ok: true,
      data: {
        userName: '测试用户',
        userId: '001',
        token: Date.now().toString(),
      },
    }
  }
})
// 登出请求
Mock.mock('/mock/logout', 'post', {
  code: 200,
  message: '已退出登录',
  ok: true,
  data: null,
})

// 项目数据请求 返回项目字符串与bpm
Mock.mock(/\/mock\/projectData\/\d+/, 'get', (option: Option) => {
  const projectId = gerProjectIdFromUrl(option.url)
  return {
    code: 200,
    message: '请求成功',
    ok: true,
    data: {
      bpm: projectDetailMap.get(projectId)?.bpm,
      projectData: projectDataMap.get(projectId),
    },
  }
})

// 项目列表请求 返回列表数据
Mock.mock('/mock/projectList', 'get', {
  code: 200,
  message: '请求成功',
  ok: true,
  data: projectList,
})

// 项目列表请求返回数据

Mock.mock(/\/mock\/projectDetail\/\d+/, 'get', (option: Option) => {
  const projectId = gerProjectIdFromUrl(option.url)
  return {
    code: 200,
    message: '请求成功',
    ok: true,
    data: projectDetailMap.get(projectId),
  }
})

// 保存项目
Mock.mock(/\/mock\/saveProject\/\d+/, 'put', (option: Option) => {
  const projectId = gerProjectIdFromUrl(option.url)
  const newProjectDetail = JSON.parse(option.body)
  const oldProjectDetail = projectDetailMap.get(projectId)
  // 更新项目字符串数据
  projectDataMap.set(projectId, newProjectDetail.projectData)
  // 更新详情数据
  if (oldProjectDetail) {
    oldProjectDetail.title = newProjectDetail.title
    oldProjectDetail.bpm = newProjectDetail.bpm
    oldProjectDetail.trackAmount = newProjectDetail.trackAmount
    oldProjectDetail.barAmount = newProjectDetail.barAmount
    oldProjectDetail.updateTime = Date.now()
  }

  return {
    code: 200,
    ok: true,
    massage: '保存成功',
    data: null,
  }
})

// 另存为项目
Mock.mock('/mock/saveAsProject', 'post', (option: Option) => {
  const id = (Math.random() * 10000) | 0
  const projectDetail = JSON.parse(option.body)

  // 创建项目字符串数据
  projectDataMap.set(id, projectDetail.projectData)
  // 创建详情数据
  const time = Date.now()
  projectDetailMap.set(id, {
    title: projectDetail.title,
    bpm: projectDetail.bpm,
    authorId: '001', // 这里要根据token获取userId的
    trackAmount: projectDetail.trackAmount,
    barAmount: projectDetail.barAmount,
    createTime: time,
    updateTime: time,
    introduce: projectDetail.introduce,
  })

  return {
    code: 200,
    ok: true,
    massage: '另存为成功',
    data: {
      projectId: id,
    },
  }
})
// 发布项目 待实现
Mock.mock('/mock/composition', 'put', (option: Option) => {
  console.log(option)
  return {
    code: 200,
    massage: '发布成功',
    id: 0,
    date: null,
  }
})
