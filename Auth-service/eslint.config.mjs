import globals from 'globals';                                                                                                                                                                          
  import tsParser from '@typescript-eslint/parser';                                                                                                                                                       
  import path from 'node:path';                                                                                                                                                                           
  import { fileURLToPath } from 'node:url';                                                                                                                                                               
  import js from '@eslint/js';                                                                                                                                                                            
  import { FlatCompat } from '@eslint/eslintrc';                                                                                                                                                          
                                         
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
  });

  export default [
    // Arquivos a ignorar
    {
      ignores: ['node_modules/**', 'dist/**', 'coverage/**', '*.config.js', 'prisma.config.ts','eslint.config.mjs',],
    },
    // Configuração para arquivos TypeScript
    ...compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended'
    ),
    {
      files: ['src/**/*.ts'],
      languageOptions: {
        globals: {
          ...globals.node,
        },
        parser: tsParser,
        ecmaVersion: 2022,
        sourceType: 'module',
        parserOptions: {
          project: './tsconfig.json',
        },
      },
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'prettier/prettier': 'warn',
      },
    },
  ];