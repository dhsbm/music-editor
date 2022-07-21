# 项目介绍
此项目为本人大三期间参与学校创新创业课程“谱音网”项目的一部分，本人担任音频编辑功能的开发与实现，在答辩结束后将此页面抽离并用 ts 重构

本项目内容完全独立开发，如需使用请告知

涉及技术：Vue、Vue CLI、Typescript、Sass、Mock、ESLint

# 功能介绍
* 本页面实现了音频数据可视化，用户可直观的看到乐曲的各种信息；
* 页面页提供了很多工具与窗口辅助乐曲的创作；
* 用户可在线播放项目音频，试听自己的作品；
* 用户可下载项目文件，与其他人交流讨论

由于个人音乐知识并不丰富，只实现了一些较为初级的音乐编曲功能。且本项目采取的是 Mock 虚拟服务器，未实现数据持久化。

如果有用户打算使用本页面在线编曲，请使用本地方式来保存音频文件：在编曲后导出项目文件，在下次编曲时导入项目文件

项目在线地址：http://musiceditor.vaiwan.cn/

# 操作手册
## 顶部按钮栏
* 菜单按钮：打开主菜单  
* 指针工具：选择模式，多选音频元素同时操作
* 铅笔工具：添加模式，点击画布快速添加音频元素
* 裁剪工具：裁剪模式，画布中出现裁剪线，裁剪音频元素
* 删除工具：删除模式，点击删除音频元素
* 撤销：撤销历史记录中上一步操作(快捷键ctrl+z)
* 重做：重做历史记录中下一步操作(快捷键ctrl+y)
* 时间/节拍：展示指针位置的时间/节拍，点击切换展示形式
* bpm：每分钟节拍数，鼠标悬停滚动或点击右侧箭头修改
* sig：工作区操作量化分度，鼠标悬停滚动或点击修改
* 跳到开头：指针/画布移动至最左端
* 播放：播放音频，播放期间禁止项目操作
* 循环：循环开/关，指针播放至循环层结尾时，跳至循环开头
* 节拍器：切换节拍器播放，仅音频播放时有效
* 音谱编辑器：显示/隐藏音谱内容编辑器窗口
* 键盘：显示/隐藏钢琴键盘窗口
* 历史记录：显示/隐藏历史记录窗口
* 素材库：显示/隐藏素材库窗口
* 用户：打开用户菜单

## 侧边音轨
* 音轨：
  * 音轨标题：
    * 左键按下可纵向移动音轨
    * 右键打开音轨菜单：
  * 音轨音量滑块：滑动控制本音轨音量
  * 按钮列表
    * 静音：切换音轨静音状态
    * 独奏：切换音轨独奏状态
    * 参数编辑器：打开音轨参数编辑器窗口
    * 音源编辑器：打开音源参数编辑器窗口
* 添加音轨：添加新的空白音轨

## 工作区：音频数据可视化
* 顶部循环框：修改循环范围
* 顶部指针：修改播放位置
* 右侧长滚动条：垂直方向上滑动画布(鼠标滚动)
* 右侧短滚动条：垂直方向上缩放画布(ctrl+鼠标滚动)
* 底部长滚动条：水平方向上滑动画布(shift+鼠标滚动)
* 底部短滚动条：水平方向上缩放画布(shift+ctrl+鼠标滚动)
* 顶部刻度画布：点击修改指针位置，根据量化展示刻度
* 中央编辑画布：操作音谱/包络/节点
  * 右键：
    * 空白区：进入快速删除模式，按住鼠标删除划过的音谱/包络
    * 音谱：打开音谱菜单
    * 包络：打开包络菜单
    * 节点：打开节点菜单
  
  * 左键：
    * 空白区：
      * 选择模式：显示选择框，多选音谱/包络
      * 添加模式：添加音谱，拖动改变长度(按住shift则添加包络)
    * 音谱：
      * 选择模式：拖动/缩放选择区所有音谱与包络
      * 添加模式：拖动/缩放选择区所有音谱与包络
      * 裁剪模式：裁剪目标音谱，新旧音谱数据同源
      * 删除模式：删除目标音谱
    * 包络：
      * 选择模式：显示选择框，多选包络节点
      * 添加模式：拖动/缩放选择区所有音谱与包络
      * 裁剪模式：裁剪目标包络，新旧包络数据同源
      * 删除模式：删除目标包络
    * 节点：
      * 选择模式：拖动选择区节点
      * 添加模式：拖动选择区节点
      * 裁剪模式：无法点击
      * 删除模式：删除目标节点
    * 包络线：添加包络节点
  
  * 双击：
    * 空白区：若在选择模式下，创建音谱 (按住shift创建无主包络)
    * 音谱：打开音谱内容编辑器，绑定当前音谱
    * 包络：添加包络节点
    * 节点：删除点击节点
    
  * 键盘
    * ctrl+c：将选择区的音谱/包络加入粘贴板
    * ctrl+V：复制粘贴板的音谱/包络至编辑区，按住shift则与原音谱/包络不同源

## 主菜单
* 新建：弹出新建项目窗口，创建项目
* 打开：弹出打开项目窗口，展示用户项目目录
* 保存：保存当前项目数据，更新数据库
* 另存为：另存为当前项目，需设置新项目的名称与介绍
* 导入音频文件：未实现
* 导入项目文件：用户选择项目文件更换当前项目
* 导出音乐：未实现
* 导出项目文件：自动下载当前项目文件
* 分享项目：弹出分享窗口，将项目分享至论坛
* 设置：未实现
* 新手教程：开始基础教程
* 操作手册：跳转至项操作手册页面

## 用户菜单
* 个人中心：未实现
* 项目管理：未实现
* 意见反馈：弹出意见反馈窗口
* 退出登录：退出当前账号，关闭需要登录的窗口
* 登录：登录用户
 
## 音轨菜单
* 编辑音轨参数：打开音轨参数编辑器窗口，绑定当前音轨
* 修改音源参数：打开音源参数编辑器窗口，绑定当前音轨
* 选择所有元素：选择当前音轨的所有音谱/包络
* 添加包络：在下一条音轨添加包络并作用于此音轨
* 删除音轨：删除选择的音轨，同时删除所有作用于此音轨的包络

## 音谱菜单
* 编辑音谱内容：打开音谱内容编辑器窗口，绑定当前音谱
* 编辑音谱参数：打开音谱参数编辑器窗口，绑定当前音谱
* 选择所有同源音谱：清空选择区并选择所有使用同一份音节数据的音谱
* 独立音谱数据：使音谱独立拥有一份音节数据，与其他音谱互不相干
* 删除选定音谱：删除选择区所有音谱

## 包络菜单
* 编辑包络参数：打开包络参数编辑器窗口，绑定当前包络
* 选择所有同源包络：清空选择区并选择所有使用同一份节点数据的音谱
* 独立包络数据：使包络独立拥有一份节点数据，与其他包络互不相干
* 删除选定包络：删除选择区所有包络

## 节点菜单
* 编辑节点参数：打开包络节点参数编辑器窗口，绑定当前节点
* 删除选定节点：删除选择区所有节点

## 音节菜单
* 修改音节参数：打开音节参数编辑器，绑定当前音节
* 选择同行音节：选择同行所有音节
* 删除选定音节：删除选择区所有音节

## 窗口
* 所有窗口按住标题均可拖动
* 部分窗口可在窗口边缘处缩放

## 音谱内容编辑器窗口(可缩放)
* 量化：编辑器画布节拍的分节
* 音谱内容编辑区
  * 顶部刻度画布：修改指针位置，根据量化展示刻度
  * 顶部指针：点击拖动可更改播放位置
  * 顶部遮罩层：表示绑定音谱的有效范围
  * 左侧钢琴画布：展示钢琴键盘，点击播放键音
  * 右侧长滚动条：垂直方向上滑动画布(鼠标滚动)
  * 右侧短滚动条：垂直方向上缩放画布(ctrl+鼠标滚动)
  * 底部长滚动条：水平方向上滑动画布(shift+鼠标滚动)
  * 底部短滚动条：水平方向上缩放画布(shift+ctrl+鼠标滚动)
  * 中央编辑画布：操作音节
    * 右键：
      * 空白区：进入快速删除模式，按住鼠标删除划过的音节
      * 音节：打开音节菜单
    * 左键：
      * 空白区：
        * 选择模式：显示选择框，多选音节
        * 添加模式：添加音节，拖动改变长度
      * 音节：
        * 选择模式：拖动选择区所有音节
        * 添加模式：拖动选择区所有音节
        * 裁剪模式，裁剪目标音节
        * 删除模式：删除目标音节
    * 双击：
      * 空白区：若在选择模式下，创建音节
      * 音节：打开音节参数编辑器窗口，绑定当前音节 
    * 键盘：
      * ctrl+C：将选择区的音节加入粘贴板
      * ctrl+V：复制粘贴板的音节至编辑区

## 参数编辑器
  * 音轨参数编辑器：设置音轨标题/响度/颜色
  * 音源参数编辑器：设置音源波形/ADSR
  * 音谱参数编辑器：设置音谱标题/响度
  * 包络参数编辑器：设置包络标题/作用于音轨/线形/类别
  * 音节参数编辑器：设置音节响度
  * 包络节点参数编辑器：设置节点高度

## 钢琴键盘窗口(可缩放)
* 八度：更改键盘绑定的钢琴键位
* 画布：展示钢琴，点击或按下对应键位便播放音乐
* 长滚动条：滑动钢琴
* 短滚动条：缩放钢琴

## 历史记录窗口
* 记录所有音频元素的操作
* 点击记录可更改项目状态
* 垃圾桶可清除之后的记录

## 素材库窗口
* 搜索栏：搜索音频素材
* 点击文件夹可展开/折叠文件夹
* 拖拽音频文件至工作区，在指定位置添加音谱