/**
 * @format
 * @url 请求的地址
 * @appId 应用id
 * @appName 应用名称
 * @token 请求的token
 * @historyTracker history上报
 * @hashTracker hash上报
 * @domTracker dom事件上报
 * @beaconTracker 是否使用navigator.sendBeacon(兼容性) post上报否则使用img get请求
 * @pushPerformance 页面性能上报
 * @jsErrorTracker js 和 promise 报错异常上报
 * @sdkVersionsdk 版本
 * @domEventList  Array<keyof WindowEventMap> ['click', 'dblclick','mousedown'] 默认['click']
 * @config 自定义配置
 */
export interface DefaultConfigOptions {
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
  extends Pick<DefaultConfigOptions, 'appId' | 'appName' | 'token' | 'module' | 'moduleName'> {
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

//版本
export enum MonitorConfig {
  version = '1.0.0'
}
