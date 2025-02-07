module.exports = {
  // 打包生成的 index.html 文件里面引用资源的前缀
  // 也为发布到线上资源的 URL 前缀
  // 使用的是相对路径，默认为 ''
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  // 将构建好的文件输出到哪里
  outputDir: 'tourism',
  pages: {
    apply: {
      // page 的入口（单入口）
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/apply.html 的输出  包名称
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '红枫湖导游导览系统',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      // 块名，公共块名(非入口)
      chunks: ['chunk-vendors', 'chunk-common', 'apply']
    }
  },
  // 生产环境下的sourceMap,生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  lintOnSave: false,
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      // 使用externals设置排除项
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        // vant: 'vant',
        axios: 'axios',
        vuex: 'Vuex',
        echarts: 'echarts'
      })

      // config.plugin('html').tap(args => {
      //   // 添加参数isProd
      //   args[0].isProd = true
      //   return args
      // })
    } else {
      // 为开发环境修改配置...
      // config.plugin('html').tap(args => {
      //   // 添加参数isProd
      //   args[0].isProd = false
      //   return args
      // })
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: '@import \'@/assets/scss/utils.scss\';'
      }
    }
  }
}
