module.exports = {
    title: 'Hello VuePress',
    description: 'Just playing around',
    // 主题配置
    themeConfig: {
        // 导航栏 Logo
        logo: '/assets/img/logo.png',
        // 导航栏链接
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Guide', link: '/guide/'},
            {text: 'PHP', link: '/php/'},
            {text: 'External', link: 'https://google.com'},
        ],
        // 侧边栏
        sidebar: {
            '/guide/': [
                '',
                'front-matter',
                'palette'
            ],
            '/php/': [
                '',
                'ab压测',
            ],
        },
        // 页面滚动
        smoothScroll: true,
        // 搜索框
        search: false,
        searchMaxSuggestions: 10
    },
    plugins: [
        [
            'vuepress-plugin-copy-code',
            {
                selector: 'div[class*="language-"] pre', // 针对代码块的选择器
                align: 'top',                           // 按钮位置 (可选: "top" 或 "bottom")
                color: '#ffffff',                       // 按钮文字颜色
                backgroundTransition: true,             // 是否启用背景渐变效果
                backgroundColor: '#0075ff',             // 按钮背景颜色
                successText: '已复制!',                 // 复制成功后的提示文字
            },
        ],
    ],
}