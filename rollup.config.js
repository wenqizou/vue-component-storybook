import fs from 'fs'
import path from 'path'
import json from '@rollup/plugin-json'
import postcss from 'rollup-plugin-postcss'
import {
    terser
} from 'rollup-plugin-terser'
import {
    nodeResolve
} from '@rollup/plugin-node-resolve'
import vue from 'rollup-plugin-vue'

const isPro = process.env.NODE_ENV == 'production'
// 插件配置
const plugins = [
    vue({
        css: true,
        compileTemplate: true
    }),
    json(),
    nodeResolve(),
    postcss({
        // 把 css 放到js 同一个目录
        extract: true,
        autoModules: true // 样式模块化，不然都被打包到一起
    })
]

isPro && plugins.push(terser()) //代码压缩

// 获取组件文件夹
const packagesPath = path.resolve(__dirname, 'packages')

module.exports = fs.readdirSync(packagesPath)
    //获取每个文件夹
    .filter(e => fs.statSync(path.resolve(packagesPath, e)).isDirectory())
    //为每个文件夹创建独立的配置文件
    .map(file => {
        const pkg = require(path.resolve(packagesPath, file, 'package.json'))
        return {
            input: path.resolve(packagesPath, file, 'index.js'),
            output: [{
                exports: 'auto',
                file: path.resolve(packagesPath, file, pkg.main),
                format: 'cjs'
            }, {
                exports: 'auto',
                file: path.resolve(packagesPath, file, pkg.module),
                format: 'es'
            }],
            plugins: plugins
        }
    })