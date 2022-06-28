// 在这个模块，api统一管理
import ajax from './ajax'
import mockAjax from './mockAjax'
import ResponseInterface from './ResponseInterface'
// 用户登录API
import reqLogin from './user/reqLogin'
// 用户登出API
import reqLogout from './user/reqLogout'
// 获取用户项目列表API
import reqProjectList from './project/reqProjectList'
// 获取项目字符串化数据API
import reqProjectData from './project/reqProjectData'
// 获取项目详情API
import reqProjectDetail from './project/reqProjectDetail'
// 保存项目API
import reqSaveProject from './project/reqSaveProject'
// 另存为项目API
import reqSaveAsProject from './project/reqSaveAsProject'
// 发布项目API
import reqPublishComposition from './composition/reqPublishComposition'

export {
  ajax,
  mockAjax,
  ResponseInterface,
  reqLogin,
  reqLogout,
  reqProjectList,
  reqProjectData,
  reqProjectDetail,
  reqSaveProject,
  reqSaveAsProject,
  reqPublishComposition,
}
