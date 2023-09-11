import Monitor from './index'
import {isPerformance} from "../utils/is";
import {onLoaded} from "../utils/event";


export function performanceMonitor(this: Monitor) {
    if (!isPerformance()) {
        // 当前浏览器不支持
        console.log('你的浏览器不支持performance')
        return
    }

    const ob: PerformanceObserver = new PerformanceObserver((item) =>
        item.getEntries().map((entry) => {
            const {
                domainLookupStart,
                domainLookupEnd,
                connectStart,
                connectEnd,
                // secureConnectionStart,
                // requestStart,
                responseStart,
                // responseEnd,
                // domInteractive,
                // domContentLoadedEventStart,
                domContentLoadedEventEnd,
                // loadEventStart,
                fetchStart,
            } = entry as PerformanceNavigationTiming

            // 未加载完毕时不提交性能信息
            if (domContentLoadedEventEnd === 0) {
                return
            }

            if (ob) {
                ob.disconnect()
            }

            const dnsTime = (domainLookupEnd - domainLookupStart).toFixed(2);
            const tcpTime = (connectEnd - connectStart).toFixed(2);
            console.log('dnsTime~~ ', dnsTime)
            console.log('tcpTime~~ ', tcpTime)

            const firstPaintTime = (responseStart - fetchStart).toFixed(2);
            const domRenderTime = (domContentLoadedEventEnd - fetchStart).toFixed(2)
            console.log('firstPaintTime~~ ', firstPaintTime)
            console.log('domRenderTime~~ ', domRenderTime, domContentLoadedEventEnd, fetchStart, domContentLoadedEventEnd - fetchStart)

            // dom渲染
            this.push({
                type: 'performance',
                config: {
                    performance_time: domRenderTime,
                    performance_type: 'page_dom_ready_time'
                }
            })

            // 首屏时间
            this.push({
                type: 'performance',
                config: {
                    performance_type: 'page_first_paint_time',
                    performance_time: firstPaintTime
                }
            })
        })
    )

    onLoaded(() => {
        ob.observe({
            type: 'navigation',
            buffered: true
        })
    })
}
