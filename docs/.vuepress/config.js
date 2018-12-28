module.exports = {
    title: 'Hello VuePress',
    description: 'blog 日常记录 前端学习',
    head:[
        ['link',{rel:'icon',href:`/logo.png`}]
        // ['link', { rel: 'shortcut icon', type: "image/x-icon", href: `./favicon.ico` }]
    ],
    themeConfig: {
        navbar:true,
        nav: [
            { text: 'Home', link: '/accumulate/' },
        ],
        sidebarDepth:2,
        lastUpdated: 'Last Updated'
    }
};