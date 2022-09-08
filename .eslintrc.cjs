module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    'vue/no-multiple-template-root': 0,
    'no-unused': [
      'error',
      { varIgnorePattern: '.*', args: 'none' }
    ]
  },
  globals:{
    //script setup 无需引入defineProps，defineEmits，自动可用
    defineProps:true,
    defineEmits:true,
  }
}
