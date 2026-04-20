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
    // Arquivos a ignorar globalmente
    {
      ignores: [
        'node_modules/**',
        'dist/**',
        'coverage/**',
        '*.config.js',
        'prisma.config.ts',
        'eslint.config.mjs',
      ],
    },
    // Configuração para arquivos TypeScript (NÃO inclui testes)
    ...compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended'
    ),
    {
      files: ['src/**/*.ts'],
      ignores: ['**/*.test.ts', '**/__tests__/**'],
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
    {
      files: ['**/*.test.ts', '**/__tests__/**/*.ts'],
      languageOptions: {
        globals: {
          ...globals.node,
          ...globals.jest,
        },
        parser: tsParser,
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/no-explicit-any': 'warn',
        'prettier/prettier': 'warn',
      },
    },
  ];