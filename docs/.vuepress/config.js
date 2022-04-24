module.exports = {
    title: 'wch的博客',
    description: 'blog',
    themeConfig: {
        sidebar: 'auto',
        nav: [{
            text: "主页",
            link: "/"
        }, {
            text: "课程",
            link: "/", 
        },{
            text: "Python",
            link: "/python/"
        }, {
            text: "C++",
            ariaLabel: 'Language Menu',
            items: [{
                    text: 'Efficient C++',
                    link: '/cpp/effective/',
                },
                {
                    text: 'C++ 11/14',
                    link: '/cpp/modern/',
                }
            ]
        }],
    }
}