## 環境構築

```bash
npm install
npm run dev
```

## 動作確認

1. caochtech-lms-apiプロジェクトの環境構築を済ませる
2. `/login`ページでログインを行う
3. 動作確認をしたいページに移動

## つなぎこみ例

APIとの繋ぎ込みは以下のファイルを参考にしてください

APIの呼び出し例
`src/features/curriculum/api/fetchCurriculum.ts`

APIを呼び出す関数の呼び出し例
`src/app/curriculums/[curriculumId]/page.tsx`

この例の動作確認

1. 動作確認の手順2まで実施
2. `curriculums/1/`にアクセス

上記手順でページが正常に表示されたら正常に動作しています

## コーディングルール

修正予定(実施日は未定)
[Next.js 開発ルール](https://www.notion.so/estra-inc/Next-js-d93d9baade4d491fbe81aaf03cbecc41?pvs=4)

## 留意事項

- app/components配下, base・uiディレクトリは廃止予定のため今後はElements, Templatesディレクトリを利用

## VSCode 推奨拡張機能

- [Code Spell Checker](https://marketplace.cursorapi.com/items?itemName=streetsidesoftware.code-spell-checker)
- [ESLint](https://marketplace.cursorapi.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.cursorapi.com/items?itemName=esbenp.prettier-vscode)
- [Tailwind CSS IntelliSense](https://marketplace.cursorapi.com/items?itemName=bradlc.vscode-tailwindcss)
