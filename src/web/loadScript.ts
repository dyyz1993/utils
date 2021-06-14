/**
 * 动态加载script标签
 * @param url script 的地址
 * @param config script配置
 * @returns Promise<Event>
 */
function loadScript(url: string, config?: Partial<Omit<HTMLScriptElement, 'src' | 'onload' | 'onerror'>>): Promise<Event> {
    return new Promise((resolve, reject) => {
        try {
            const body = document.body || document.getElementsByTagName('body')[0]
            const script = document.createElement('script')
            Object.assign(script, config)
            script.src = url
            script.onload = resolve
            script.onerror = reject
            body.appendChild(script)
        } catch (e) {
            reject(e)
        }
    })
}

export default loadScript