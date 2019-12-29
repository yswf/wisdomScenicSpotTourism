# wisdomScenicSpotTourism
毕业设计之移动端（游客端）导游导览系统——wisdomScenicSpotTourism

姓名：黄佳佳
学号：1619200029
班级：电子161班
时间：20191230
# 毕业设计进展
1、完成移动端（游客端）导游导览系统原型以及视觉稿的设计；
2、移动端（游客端）导游导览系统中，除了“电子地图”、“室内导航”模块，其他模块的静态页面均已完成。
注：其他模块：景区介绍、活动资讯、数据感知、预约停车、购票入口、个人中心。
# 碰到的问题
1、移动端（游客端）导游导览系统中，已完成的静态页面样式不够精致；
2、代码不够精简高效；
3、“数据感知”模块中景区车流数据可视化的展示形式未确定；
# 下段时间工作计划
1、对静态页面的样式作出规整；
2、对代码进行优化，提高代码质量；
3、探索“数据感知”模块中景区车流数据可视化的展示形式并完成；
# 目录结构
```
|-- build            项目打包文件夹
|-- node_modules     项目依赖包（不上传到GitHub）
|-- public           公共文件
     * favicon.ico 项目ico图标
     * index.html  项目打包时会以该文件为母板
|-- src              资料文件夹
     * assets     资源文件夹，存放静态图片资源的目录
     * common     路由文件夹（包含每个模块的路由文件）
     * components 组件文件夹
     * utils      库文件夹
     * views      页面文件夹
     * App.vue    应用主组件
     * main.js    webpack入口文件
     * router.js  路由入口文件，决定了页面的跳转规则
     * store.js   vuex状态管理文件
|-- static            项目静态文件（用于存放需要使用的一些外部的js、css文件）
|-- .eslintrc.js      自定义elint代码检查
|-- .gitignore        忽略的文件
|-- package.json      项目描述文件
|-- README.md         文字介绍项目详情
|-- vue.config.js     项目配置文件

