module.exports = {
  root: true,
  env: {
    node: true,
    // 在Vue3的setup中运行
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    // 'plugin:prettier/recommended', 已卸载，权限在eslint之上
  ],
  plugins: ['vue', 'html'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    // 打包时禁止console
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 打包时禁止debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 检测html标签自闭和
    'vue/html-self-closing': 'off',
    // html中每行最多属性数目n
    'vue/max-attributes-per-line': 'off',
    // 未使用的变量
    'no-unused-vars': 'warn',
    // let -> const
    'prefer-const': 'warn',
    // 建议使用单引号
    quotes: ['warn', 'single'],
    // 多余的空行
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
    // new完之后必须赋值
    'no-new': 'error',
    // 不允许new Object
    'no-new-object': 'error',
    // 组件必须多名称 Todo -> TodoItem
    'vue/multi-word-component-names': 'off',
    // props是否必需默认值
    'vue/require-default-prop': 'off',
    // 缩进
    indent: ['warn', 2],
    // 函数前空格
    'space-before-function-paren': 0,
    // 末尾逗号
    'comma-dangle': [
      'warn',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    // 元素内容需否要换行
    'vue/singleline-html-element-content-newline': ['off'],
    // 模板字符串插值首位不能有空格
    'template-curly-spacing': ['error', 'never'],
    // 不允许行尾出现空格
    'no-trailing-spaces': 'error',
  },
}
