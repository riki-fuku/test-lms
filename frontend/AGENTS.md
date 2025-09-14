# AGENTS.md — フロントエンド コーディングルール

この文書は frontend 配下で遵守する最小ルールを定義します。必要に応じて各ディレクトリ（例: `src/features/users`）にも `AGENTS.md` を作成し、補足ルールを記載してください。

## 適用範囲と優先度
- 対象: `frontend/` 配下のコード全般（Next.js/TypeScript）。
- 併用: ディレクトリ毎の `AGENTS.md` を許可します。
- 優先度: より深い階層の `AGENTS.md` が該当範囲において本書よりも優先されます（本書はデフォルト方針）。

## 最低限ルール
- 画面作成: サーバーサイドは `page.tsx`、クライアントサイドは `Client.tsx` に記述します。
  - `Client.tsx` は先頭に `"use client";` を宣言し、イベントハンドリングやブラウザ API を扱います。
  - `page.tsx` はサーバーコンポーネントとしてデータ取得・メタ情報などを担当し、必要に応じて `Client.tsx` を読み込みます。
- UI ライブラリ: 基本的に `heroui` を使用し、共通 UI は `src/component` 配下に配置して呼び出して使用します。
  - ページや機能配下に UI を直置きせず、再利用可能な形で `src/component` に集約します。
- 機能コンポーネント: API やテーブル（DB/スキーマ）に依存するコンポーネントは `src/features` を使用します。
  - ドメイン（機能）単位でディレクトリを切り、API クライアント、型、Feature 専用のコンポーネントをまとめます。

## 推奨ディレクトリ構成（例）
```
frontend/
  src/
    component/            # 共通/UI ライブラリのラッパーや再利用コンポーネント
      Button.tsx
      Card.tsx
    features/
      users/
        api/
          getUsers.ts
          types.ts
        components/
          UsersTable.tsx   # テーブルや API に依存（feature 配下）
        pages/
          list/
            page.tsx       # サーバー側（データ取得など）
            Client.tsx     # クライアント側（操作/状態管理）
```

## 実装ガイド
- `page.tsx` から `Client.tsx` を明示的に読み込むパターンを基本とします。
  ```tsx
  // page.tsx (Server Component)
  import Client from "./Client";

  export default async function Page() {
    // ここでサーバー側データ取得など
    return <Client />;
  }
  ```
  ```tsx
  // Client.tsx (Client Component)
  "use client";
  import {useState} from "react";
  import {Button} from "@/component/Button"; // heroui ラッパーの想定

  export default function Client() {
    const [count, setCount] = useState(0);
    return <Button onClick={() => setCount(c => c + 1)}>Count: {count}</Button>;
  }
  ```

- UI 利用方針:
  - `heroui` を優先し、必要に応じて薄いラッパーを `src/component` に追加します。
  - ページ・機能固有の UI でも、再利用可能性が見込める場合は `src/component` へ抽出します。

- features 方針:
  - API 呼び出し・DB テーブルに依存するコンポーネント、Hooks、型は `src/features/<domain>` に配置します。
  - プレゼンテーションに寄せた汎用 UI は `src/component`、ビジネスロジックやデータ依存は `src/features` を原則とします。

## ディレクトリ毎の AGENTS.md の作成
- 目的: そのディレクトリ固有の補足ルール（命名、依存境界、使用禁止事項など）を短く明確に定義します。
- 置き場所: 対象ディレクトリ直下に `AGENTS.md`（ファイル名固定）。
- 記述方針: 本書の原則を前提に、差分・例外・補足のみを記載します。
- 優先度: 該当ディレクトリ配下ではローカル `AGENTS.md` が本書より優先されます。

## 運用
- 本書や各 `AGENTS.md` は Pull Request で更新し、レビュアーが遵守可否を確認します。
- `npm run lint` がクリーンであること、型エラーがないことをレビューの入口基準とします。

