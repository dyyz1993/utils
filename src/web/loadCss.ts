/**
 * 动态加载css样式
 * @param url link的地址
 * @param config link属性配置
 * @returns Promise<Event>
 */
export default function loadCss(url: string, config?: Partial<Omit<HTMLLinkElement, 'href'>>): Promise<Event> {
    return new Promise((resolve, reject) => {
        try {
            const link = document.createElement('link');

            link.href = url;
            Object.assign(link, config)
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.onload = resolve
            link.onerror = reject

            document.head.appendChild(link);
        } catch (e) {
            reject(e)
        }
    })
}
