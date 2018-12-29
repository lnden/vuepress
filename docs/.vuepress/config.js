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
            { text: 'FE-基础',  link: '/basics/' },
            { text: 'FE-框架',  link: '/frame/' },
            { text: 'FE-面试',  link: '/interview/' },
            { text: '年终总结', link: '/summary/' },
            { text: 'GitHub',  link: 'https://google.com' },
        ],
        sidebar:{
            '/basics/': getBasics('FE-基础'),
            '/frame/': getFrame('FE-框架'),
            '/interview/': getInterview('FE-面试'),
            '/summary/': getSummary('年终总结')
        },
        sidebarDepth:2,
        lastUpdated: 'Last Updated',
        search:true
    }
};


function getBasics(title) {
    return [
        {
            title,
            collapsable: false,
            children: [
                '',
                'demo'
            ]
        }
    ]
}

function getFrame(title) {
    return  [
        {
            title,
            collapsable: false,
            children: [
                '',
                'vue',
                'vuex',
                'react',
                'redux',
                'angular',
                'weChat'
            ]
        }
    ]
}

function getInterview(title) {
    return  [
        {
            title,
            collapsable: false,
            children: [
                ''
            ]
        }
    ]
}

function getSummary(title) {
    return [
        {
            title,
            collapsable: false,
            children: [
                ''
            ]
        }
    ]
}