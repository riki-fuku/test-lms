# Backend コーディングルール（AGENTS）

本ドキュメントは backend（Laravel）の実装ルールをまとめたものです。必要に応じて各ディレクトリにも AGENTS.md を配置し、補足ルールを記載してください。

## 対象範囲
- Laravel アプリケーション配下（`backend/`）の API 実装・構成に関する最低限のルール

## API 実装ルール
- **CRUD は `apiResource` を使用**: 基本的な CRUD のルーティングは `apiResource` を用いて定義する。
  - 例: `Route::apiResource('users', UserController::class);`
- **レスポンスは Resource クラスに集約**: レスポンスで返却する整形ロジックは Resource に切り出す。
  - 例: `app/Renewal/Http/Resources/User/UserIndexResource.php`
- **リクエストボディ定義は FormRequest に集約**: バリデーション・認可を含むリクエスト仕様は FormRequest に記述する。
  - 例: `backend/app/Renewal/Http/Requests/User/IndexRequest.php`
- **Controller ではビジネスロジックを直接書かない**: Controller 内の各メソッドは UseCase(Action) に委譲し、薄く保つ。
  - 例: `backend/app/UseCases/User/IndexAction.php`

## 補足指針
- **命名**: エンティティ単位（例: `User`）＋ユースケース（例: `Index`）で統一。`IndexAction`, `StoreRequest`, `UserIndexResource` など。
- **責務分離**:
  - Controller: 入出力の受け渡し・UseCase 呼び出し
  - UseCase(Action): ビジネスロジックの調停（複数サービス/リポジトリの編成）
  - FormRequest: 入力のバリデーション/認可
  - Resource: 出力の整形
- **ディレクトリ毎の AGENTS.md**: モジュール固有の制約や例外（例: 認可方針、属性名マッピング）は、該当ディレクトリ（例: `app/Renewal/Http/Resources/User/`）に `AGENTS.md` を置いて明記する。

以上。ルールは最小限で開始し、必要に応じて拡張してください。

