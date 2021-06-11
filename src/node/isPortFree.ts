import net from 'net';
/**
 * Check if a TCP port is free
 * 检查TCP端口是否空闲
 */
function isPortFree(port: number): Promise<boolean> {
    return new Promise(resolve => {
        const server = net.createServer();

        server.unref();
        server.on('error', () => resolve(false));
        const options: net.ListenOptions = {
            port
        };
        server.listen(options, () => {
            server.close(() => {
                resolve(true);
            });
        });
    });
};

export default isPortFree;