module.exports = plop => {
    plop.setGenerator('component', {
        description: 'create a custom component',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'compoent name',
            default: 'MyCompoent'
        }],
        actions: [{
                type: 'add',
                path: 'packages/{{name}}/src/{{name}}.vue',
                templateFile: 'plop-template/components/src/component.hbs'
            }, {
                type: 'add',
                path: 'packages/{{name}}/__tests__/{{name}}.test.js',
                templateFile: 'plop-template/components/__test__/component.test.hbs'
            },
            {
                type: 'add',
                path: 'packages/{{name}}/stories/{{name}}.stories.js',
                templateFile: 'plop-template/components/stories/component.stories.hbs'
            },
            {
                type: 'add',
                path: 'packages/{{name}}/index.js',
                templateFile: 'plop-template/components/index.hbs'
            },
            {
                type: 'add',
                path: 'packages/{{name}}/LICENSE.js',
                templateFile: 'plop-template/components/LICENSE'
            },
            {
                type: 'add',
                path: 'packages/{{name}}/package.json',
                templateFile: 'plop-template/components/package.hbs'
            },
            {
                type: 'add',
                path: 'packages/{{name}}/READ.ME',
                templateFile: 'plop-template/components/README.hbs'
            }
        ]
    })
}