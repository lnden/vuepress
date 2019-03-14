module.exports = {
    title: '始于前端，但不止于前端',
    description: 'blog 日常记录 前端学习',
    head:[
        ['link',{rel:'icon',href:`/logo.png`}]
    ],
    themeConfig: {
        navbar:true,
        nav: [
            { text: 'Basics',  link: '/basics/' },
            { text: 'Frame',  link: '/frame/' },
            { text: 'Interview',  link: '/interview/' },
            { text: 'Planning', link: '/planning/' },
            { text: 'GitHub',  link: 'https://github.com/lnden' },
        ],
        sidebar:{
            '/basics/': getBasics('Basics'),
            '/frame/': getFrame('Frame'),
            '/interview/': getInterview('Interview'),
            '/planning/': getSummary('Planning')
        },
        sidebarDepth:2,
        // lastUpdated: '上次更新',
        search:true
    },
    base:'/vuepress/'
};


function getBasics(title) {
    return [
        {
            title,
            collapsable: false,
            children: [
                '',
                'ECMAScript',
                'HTML5',
                'CSS3',
                'demo',
                'video'
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
                'weChat',
                'nuxt'
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
                '',
                'Html',
                'Css',
                'Javascript',
                'Vue',
                'React',
                'weChat'
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
                '',
                'vuepress'
            ]
        }
    ]
}