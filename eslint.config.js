import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginNode from 'eslint-plugin-node';
import eslintPluginTypescript from '@typescript-eslint/eslint-plugin';
import eslintRecommended from '@eslint/js'; // 推奨ルールの読み込み
import { parse } from '@typescript-eslint/parser';

export default [
  {
    languageOptions: {
      parser: {
        parse,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      react: eslintPluginReact,
      node: eslintPluginNode,
      '@typescript-eslint': eslintPluginTypescript,
    },
    rules: {
      ...eslintRecommended.configs.recommended.rules, // 推奨ルールを追加
      ...eslintPluginTypescript.configs.recommended.rules, // TypeScript推奨ルール
      ...eslintPluginReact.configs.recommended.rules, // React推奨ルール
      'react/react-in-jsx-scope': 'off', // Reactインポート不要の設定
    },
    settings: {
      react: {
        version: 'detect', // Reactバージョンを自動検出
      },
    },
  },
];
