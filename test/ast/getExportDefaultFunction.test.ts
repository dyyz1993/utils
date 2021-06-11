import { expect } from 'chai'
import getExportDefaultFunction from '../../src/ast/getExportDefaultFunction'
import { parse } from '@babel/parser'
describe('getExportDefaultFunction', async () => {

    it('export default {FunctionName}', async () => {
        let str = `import net from 'net';
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
        
        export default isPortFree;`
        let ast = parse(str, {
            sourceType: 'module',
            plugins: ['typescript']
        })
        let node = getExportDefaultFunction(ast)
        expect(node?.leadingComments).not.undefined
    })

    it('export default function (){}', async () => {
        let str = `import net from 'net';
        /**
         * Check if a TCP port is free
         * 检查TCP端口是否空闲
         */
        export default function isPortFree(port: number): Promise<boolean> {
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
        `
        let ast = parse(str, {
            sourceType: 'module',
            plugins: ['typescript']
        })
        let node = getExportDefaultFunction(ast)
        expect(node?.leadingComments).not.undefined
    })

    it('export default function {FunctionName} (){}', async () => {
        let str = `import net from 'net';
        /**
         * Check if a TCP port is free
         * 检查TCP端口是否空闲
         */
         export default function isPortFree(port: number): Promise<boolean> {
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
        };`
        let ast = parse(str, {
            sourceType: 'module',
            plugins: ['typescript']
        })
        let node = getExportDefaultFunction(ast)
        expect(node?.leadingComments).not.undefined
    })

    it('getExportDefaultFunction throw', async () => {

    })

    it('getExportDefaultFunction fail', async () => {
        let str = `import net from 'net';
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
        };`
        let ast = parse(str, {
            sourceType: 'module',
            plugins: ['typescript']
        })
        let node = getExportDefaultFunction(ast)
        expect(node).null
    })
})