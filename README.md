
# use-monitor
轻量级前端埋点监控上报sdk

## Features 
- [x] 自动手动监听页面访问量(PV)
- [x] 自动手动记录独立访客(UV)
- [x] 自动手动DOM事件监听获取用户操作(UV)
- [x] 自定义埋点信息
- [x] 自动监听页面js报错
- [ ]  性能指标统计


## 使用

### 浏览器引入
```html
<script src="use-monitor/dist/index.js"></script>
```
### npm

```bash
npm install use-monitor
```

```typescript

import Monitor, { DefaultConfigOptons } from 'use-monitor'

const options: DefaultConfigOptons = {
  requestUrl: '//127.0.0.1:8080/report',
  appId: 1121212,
  appName: 'appName',
  moduleName: 'moduleName1',
  historyTracker: true,
  hashTracker: true,
  beaconTracker: false,
  pushPerformance: true,
  jsErrorTracker: true,
  debug: true,
  config: {
    uuid: 'wsw'
  }
}

const monitor = new Monitor(options)

monitor.push({
  type: 'click',
  path: ['广告列表'] || '',
})

```
### 设置第二级模块，按模块统计 PV、UV 

```js
// 例如页面组件创建前后的生命周期如vue的created 配置moduleName
// 或者在vue路由的afterEach配置每个路由
monitor.setConfig({
  module: 'home',
  moduleName: '首页'
})
monitor.push({
  type: 'page'
})

// 脚本配置
monitor.setConfig({
  module: 'script',
  moduleName: '脚本配置'
})
monitor.push({
  type: 'page'
})
```

### 设置第三级路径，按路径统计 PV、UV (当第二级不变的时候)

```js
var monitor = new Monitor({
  url: '', // 请求地址
  appId: 'xxx', //唯一的项目Id
  appName: '巨量引擎', //唯一的项目名称
  module: 'createCampaign',
  moduleName: '新建计划',
  token: 'xxx'
})

monitor.setDefaults({
  startPath: ['应用推广'],
})
monitor.push({
  type: 'page'
})
```

### 自动统计点击
1、标签属性

- m_p 代表路径(pathName)
- m_btn 代表点击事件(eventName)
- m_val 代表事件的值(eventValue)

2、基础按钮

```html
<button m_p="新建广告表单" m_btn="提交">submit</button>
```

3、select 点击

```html
<select m_p="广告列表">
  <option m_btn="点击状态筛选" m_val="开启">开启</option>
  <option m_btn="点击状态筛选" m_val="暂停">暂停</option>
</select>
```
### 手动触发点击上报

```js
monitor.push({
  type: 'click',
  path: ['广告列表'] || '',
  actions: JSON.stringify([
    {
      name: '点击状态筛选',
      value: '开启'
    }
  ])
})
```

### 统计 input

```js
monitor.push({
  type: 'input',
  path: ['视频校色'] || '',
  actions: JSON.stringify([
    {
      name: '亮度',
      value: 2
    }
  ])
})
```


### options

```typescript
/**
 * @format
 * @url 请求的地址
 * @appId 应用id
 * @appName 应用名称
 * @token 请求的token
 * @historyTracker history上报   默认false
 * @hashTracker hash上报    默认false
 * @domTracker dom事件上报  默认true
 * @beaconTracker 是否使用navigator.sendBeacon(post)上报 默认使用img get请求 
 * @pushPerformance 页面性能上报  默认false
 * @jsErrorTracker js 和 promise 报错异常上报  默认true
 * @sdkVersionsdk 版本
 * @domEventList  Array<keyof WindowEventMap> ['click', 'dblclick','mousedown'] 默认['click']
 * @config 自定义配置
 */
export interface DefaultConfigOptons {
  requestUrl: string
  url?: string
  appId?: string | undefined
  appName?: string | undefined
  module?: string | undefined
  moduleName?: string | undefined
  token?: string
  historyTracker?: boolean
  hashTracker?: boolean
  domTracker?: boolean
  beaconTracker?: boolean
  debug?: boolean
  pushPerformance?: boolean
  jsErrorTracker?: boolean
  sdkVersion?: string | number
  domEventList?: Array<keyof WindowEventMap>
  config?: Record<string, any> | undefined
}
```

### 请求参数实例

```typescript
/**
 * @module
 * @moduleName 模块名称
 * @ua user-agent
 * @url href 当前 URL 地址
 * @domain 域名
 * @title 网页标题
 * @referrer 上一个访问页面 URL 地址
 * @actions 事件
 * @type 类型  例如 page (pv、uv) ，click（点击事件），input (输入框)，statistics (自定义统计)
 * @pathName 页面name
 * @eventName  '点击名称'
 * @eventValue '点击按钮的值｜input的值'
 * @errorMessage 报错的message
 * @config 自定义配置
 */
export interface RequestOptions
  extends Pick<DefaultConfigOptons, 'appId' | 'appName' | 'token' | 'module' | 'moduleName'> {
  ua?: string
  url?: string
  domain?: string
  title?: string
  referrer?: string
  actions?: string
  type?: string
  pathName?: string
  path?: string
  eventName?: string
  name?: string
  eventValue?: string
  value?: string
  errorMessage?: string
  config?: Record<string, any> | undefined
}
```

### 方法

| 实例方法                          |说明                     |
| ---------------------------------| -----------------------|
| push(op:object)                  | 推送数据                |
| push(op:object)                  | 推送数据                |
| setConfig()                      | 修改配置                |


## 说明
- 这个埋点sdk参考我公司的埋点业务，简单用typescript跟rollup实现了mini版本
- 添加了自动history跟hash上报，不过一般在页面组件添加moduleName即可
- 可以自定义扩展参数
