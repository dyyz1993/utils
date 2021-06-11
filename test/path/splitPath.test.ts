import { expect } from 'chai'
import splitPath from '../../src/path/splitPath'
describe('path/splitPath', async () => {

    it(`f:/foo/bar.txt`, async () => {
        expect(splitPath('f:/foo/bar.txt')).include({
            dir: 'f:/foo/',
            name: 'bar.txt',
            ext: '.txt'
        })

    })

    it(`/home/foo/bar.txt`, async () => {
        expect(splitPath('/home/foo/bar.txt')).include({
            dir: '/home/foo/',
            name: 'bar.txt',
            ext: '.txt'
        })
    })

    it(`/home/foo/bar`, async () => {
        expect(splitPath('/home/foo/bar')).include({
            dir: '/home/foo/',
            name: 'bar',
            ext: ''
        })
    })

    it(`bar.txt`, async () => {
        expect(splitPath('bar.txt')).include({
            dir: '',
            name: 'bar.txt',
            ext: '.txt'
        })
    })

    it(`/bar.txt`, async () => {
        expect(splitPath('/bar.txt')).include({
            dir: '/',
            name: 'bar.txt',
            ext: '.txt'
        })
    })

    it(`//`, async () => {
        expect(splitPath('//')).include({
            dir: '',
            name: '',
            ext: ''
        })
    })
})