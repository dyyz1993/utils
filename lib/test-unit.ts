#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import cp from 'child_process'
// console.log(process.argv)
const argv: any = yargs(hideBin(process.argv))
    .command('test module', 'test module', () => { }, (argv) => {
        console.info(argv)
    })
    .options({
        module: {
            alias: 'm',
            description: "<module> name",
            requiresArg: false,
            required: false
        },
        file: {
            alias: 'f',
            description: "<file> name",
            requiresArg: false,
            required: false
        }
    })
    .argv
let exc = `npm run gen-test && npm run mocha test/${argv.m}/*.ts`
if (argv.m) {
    exc = `npm run gen-test && npm run mocha test/${argv.m}/*.ts `
}
if (argv.f) {
    exc = `npm run gen-test && npm run mocha test/**/${argv.f}.*.ts `
}

let child = cp.spawn(exc, ['--color'], { 'stdio': 'pipe' });





child.stdout.pipe(process.stdout);
