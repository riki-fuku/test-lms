# リポジトリガイドライン

## プロジェクト概要

tenancy for Laravel を使用した横展開の動作確認ようのプロジェクト

### プロジェクト構造

- `docker/`: Compose スタック、Nginx、PHP-FPM イメージ
- `backend/`: Laravel アプリ（初回実行時に作成）。テストは`backend/tests`に配置
- `frontend/`: Next.js アプリ（`pages/`、設定、リント）。環境変数は`.env.local`に配置
- ルートツール: 共通タスク用の`Makefile`、シークレット/アーティファクト用の`.gitignore`

### 技術スタック

- **バックエンド**: Laravel (PHP)
- **フロントエンド**: Next.js (React/TypeScript)
- **データベース**: MySQL
- **インフラ**: Docker & Docker Compose
- **その他**: Nginx、phpMyAdmin

## ビルド・テストコマンド

### 初期セットアップ

```bash
make init  # イメージをビルドし、コンテナを起動し、Laravelをブートストラップし、キーを生成
```

### 開発環境の管理

```bash
make up|stop|restart|ps|logs  # スタックのライフサイクルとログ
make app|web|db  # それぞれのコンテナでシェルを開く
```

### データベース操作

```bash
make migrate|seed|fresh|cache-clear  # Laravel DB操作
```

### テスト実行

```bash
make test  # 全テスト実行
make single-test FILENAME=UserServiceTest  # 単一テスト実行
```

### フロントエンド開発

```bash
cd frontend && npm install && npm run dev  # 開発サーバー起動 (http://localhost:3000)
npm run build  # プロダクションビルド
npm run lint   # リント実行
npm run fix    # リント自動修正
```

## コーディングスタイルガイドライン

### PHP (Laravel)

- **標準**: PSR-12 準拠
- **インデント**: 4 スペース
- **命名規則**:
  - クラス: PascalCase
  - メソッド/変数: camelCase
  - 定数: UPPER_CASE

### JavaScript/React

- **インデント**: 2 スペース
- **命名規則**:
  - コンポーネント: PascalCase
  - `components/`内のファイル: kebab-case またはコンポーネント名に一致
- **品質管理**: `npm run lint`でリント、`npm run fix`で自動修正

### 一般的な原則

- 関数は小さく集中したものにする
- 可能な限り明示的な型と戻り値を優先
- 可読性を重視したコード記述

## テスト手順

### バックエンドテスト

1. **テスト実行**:

   ```bash
   make test  # または php artisan test
   ```

2. **テストファイル配置**:

   - 場所: `backend/tests`
   - 命名: `Test`で終わる（例：`UserServiceTest.php`）

3. **単一テスト実行**:
   ```bash
   make single-test FILENAME=UserServiceTest
   ```

### フロントエンドテスト

- **現状**: テストランナーは未設定
- **推奨設定**: Jest + React Testing Library
- **テスト配置**: `frontend/__tests__/`

### テスト品質基準

- 全テストが通ること
- リントがクリーンであること
- カバレッジを適切に維持すること

## セキュリティに関する注意事項

### 環境変数管理

- **重要**: `.env`ファイルは絶対にコミットしない
- **設定方法**: `backend/.env.example`と`frontend/.env.local.example`からコピー
- **キー管理**: 環境を共有する際はキーをローテーション

### デフォルトサービス・ポート

- API: 80
- フロントエンド: 3000
- MySQL: 3306
- phpMyAdmin: 51081

### セキュリティベストプラクティス

- サードパーティトークンはローカル設定でのみ検証
- 本番環境では適切な認証・認可を実装
- 定期的な依存関係の更新と脆弱性チェック
- 機密情報の適切な管理とアクセス制御

### コミット・プルリクエスト時の注意

- シークレットがコミットされていないことを確認
- テストが通ることを確認
- リントがクリーンであることを確認
- ドキュメントが更新されていることを確認
