import { resolve } from 'node:path'
import cspellPlugin from '@cspell/eslint-plugin'
import perfectionist from 'eslint-plugin-perfectionist'

const cspellRule = [
   'warn',
   {
      configFile: resolve('/home/fabio/codes/miniclosetgattikids/.cspell.json'),
   },
]

const parserPlain = {
   meta: {
      name: 'parser-plain',
   },
   parseForESLint: (code) => {
      const textAsComment = {
         type: 'Block',
         value: code,
         range: [0, code.length],
      }

      return {
         ast: {
            body: [],
            comments: [textAsComment],
            loc: { end: code.length, start: 0 },
            range: [0, code.length],
            tokens: [],
            type: 'Program',
         },
         scopeManager: null,
         services: { isPlain: true },
         visitorKeys: {
            Program: [],
         },
      }
   },
}

export default [
   {
      files: ['**/*.vue', '**/app/models/*.ts'],
      plugins: {
         perfectionist,
      },
      rules: {
         'perfectionist/sort-imports': [
            'warn',
            {
               type: 'natural',
               order: 'asc',
            },
         ],
         'perfectionist/sort-objects': [
            'warn',
            {
               type: 'natural',
               order: 'asc',
            },
         ],
      },
   },
   {
      files: ['**/*.vue', '**/app/models/*.ts'],
      plugins: {
         '@cspell': cspellPlugin,
      },
      rules: {
         '@cspell/spellchecker': cspellRule,
      },
   },
   {
      // Nuxt ignores `**/public` by default; re-include llms markdown files.
      ignores: ['!**/public/', '!**/public/llms/', '!**/public/llms/**/*.md'],
   },
   {
      files: ['**/*.md'],
      languageOptions: {
         parser: parserPlain,
      },
      plugins: {
         '@cspell': cspellPlugin,
      },
      rules: {
         '@cspell/spellchecker': cspellRule,
      },
   },
   {
      rules: {
         '@typescript-eslint/no-explicit-any': 'off',
         'vue/no-v-html': 'off',
         'vue/multi-word-component-names': 'off',
         'vue/html-self-closing': 'off',
         'vue/first-attribute-linebreak': 'off',
         // 'no-console': ['error', { allow: ['info', 'warn', 'table', 'log'] }],
         'prefer-template': 'error',
         'vue/prefer-template': 'error',
         'arrow-body-style': ['error', 'always'],
      },
   },
]
