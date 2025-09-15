<?php

declare(strict_types=1);

use Stancl\Tenancy\Database\Models\Domain;
use App\Models\Tenant;

return [
    'tenant_model' => Tenant::class,
    'id_generator' => Stancl\Tenancy\UUIDGenerator::class,

    'domain_model' => Domain::class,

    /**
     * セントラルアプリをホストするドメインのリスト
     *
     * ドメインまたはサブドメイン識別ミドルウェアを使用している場合のみ関連します。
     */
    'central_domains' => [
        '127.0.0.1',
        'localhost',
    ],

    /**
     * テナンシーが初期化されたときに実行されるテナンシーブートストラッパー
     * これらの責任は、Laravelの機能をテナント対応にすることです。
     *
     * 動作を設定するには、以下の設定キーを参照してください。
     */
    'bootstrappers' => [
        Stancl\Tenancy\Bootstrappers\DatabaseTenancyBootstrapper::class,
        Stancl\Tenancy\Bootstrappers\CacheTenancyBootstrapper::class,
        Stancl\Tenancy\Bootstrappers\FilesystemTenancyBootstrapper::class,
        Stancl\Tenancy\Bootstrappers\QueueTenancyBootstrapper::class,
        // Stancl\Tenancy\Bootstrappers\RedisTenancyBootstrapper::class, // 注意: phpredisが必要です
    ],

    /**
     * データベーステナンシー設定。DatabaseTenancyBootstrapperで使用されます。
     */
    'database' => [
        'central_connection' => env('DB_CONNECTION', 'laravel'),

        /**
         * 動的に作成されるテナントデータベース接続の「テンプレート」として使用される接続
         * 注意: テンプレート接続をtenantという名前にしないでください。その名前はパッケージによって予約されています。
         */
        'template_tenant_connection' => 'tenant_template',

        /**
         * テナントデータベース名は以下のように作成されます:
         * prefix + tenant_id + suffix
         */
        'prefix' => 'tenant_',
        'suffix' => '',

        /**
         * TenantDatabaseManagersは、テナントデータベースの作成と削除を処理するクラスです。
         */
        'managers' => [
            'sqlite' => Stancl\Tenancy\TenantDatabaseManagers\SQLiteDatabaseManager::class,
            'mysql' => Stancl\Tenancy\TenantDatabaseManagers\MySQLDatabaseManager::class,
            'pgsql' => Stancl\Tenancy\TenantDatabaseManagers\PostgreSQLDatabaseManager::class,

            /**
         * 各テナントデータベース用のDBユーザーを作成するには、MySQL用にこのデータベースマネージャーを使用してください。
         * $grantsプロパティを変更することで、これらのユーザーに与えられる権限をカスタマイズできます。
         */
            // 'mysql' => Stancl\Tenancy\TenantDatabaseManagers\PermissionControlledMySQLDatabaseManager::class,

            /**
         * データベースではなくスキーマでテナントDBを分離したい場合は、
         * 上記のpgsqlマネージャーを無効にし、下記のものを有効にしてください。
         */
            // 'pgsql' => Stancl\Tenancy\TenantDatabaseManagers\PostgreSQLSchemaManager::class, // データベースではなくスキーマで分離
        ],
    ],

    /**
     * キャッシュテナンシー設定。CacheTenancyBootstrapperで使用されます。
     *
     * これはすべてのCacheファサード呼び出し、cache()ヘルパー
     * 呼び出し、注入されたキャッシュストアへの直接呼び出しで動作します。
     *
     * キャッシュ内の各キーにはタグが適用されます。このタグは
     * キャッシュへの書き込み時と読み取り時の両方でキャッシュをスコープするために使用されます。
     *
     * タグを指定することで、キャッシュを選択的にクリアできます。
     */
    'cache' => [
        'tag_base' => 'tenant', // このtag_baseにtenant_idが続いて、各キャッシュ呼び出しに適用されるタグが形成されます。
    ],

    /**
     * ファイルシステムテナンシー設定。FilesystemTenancyBootstrapperで使用されます。
     * https://tenancyforlaravel.com/docs/v3/tenancy-bootstrappers/#filesystem-tenancy-boostrapper
     */
    'filesystem' => [
        /**
         * 'disks'配列にリストされた各ディスクは、suffix_baseに続いてtenant_idが付加されます。
         */
        'suffix_base' => 'tenant',
        'disks' => [
            'local',
            'public',
            // 's3',
        ],

        /**
         * ローカルディスク用にこれを使用してください。
         *
         * https://tenancyforlaravel.com/docs/v3/tenancy-bootstrappers/#filesystem-tenancy-boostrapper を参照
         */
        'root_override' => [
            // storage_path()が付加された後にルートをオーバーライドするディスク
            'local' => '%storage_path%/app/',
            'public' => '%storage_path%/app/public/',
        ],

        /**
         * storage_path()にサフィックスを付けるかどうか
         *
         * 注意: これを無効にすると、ローカルディスクテナンシーが破損する可能性があります。S3のような外部ファイルストレージサービスを使用している場合のみ無効にしてください。
         *
         * アプリケーションの大部分では、この機能を有効にする必要があります。しかし、一部の
         * エッジケースでは問題を引き起こす可能性があります（VaporでPassportを使用する場合など - #196を参照）。
         * そのため、これらのエッジケースの問題が発生している場合は、これを無効にしたい場合があります。
         */
        'suffix_storage_path' => true,

        /**
         * デフォルトでは、asset()呼び出しもマルチテナントになります。グローバルでテナント固有でない
         * アセットには、global_asset()とmix()を使用できます。しかし、テナントアプリ内でasset()呼び出しを
         * 使用するパッケージを使用する際に問題が発生する可能性があります。このような問題を避けるために、
         * asset()ヘルパーテナンシーを無効にし、テナント固有のアセット（商品画像、アバターなど）を
         * 使用したい場所で明示的にtenant_asset()呼び出しを使用できます。
         */
        'asset_helper_tenancy' => true,
    ],

    /**
     * Redisテナンシー設定。RedisTenancyBootstrapperで使用されます。
     *
     * 注意: Redisテナンシーを使用するにはphpredisが必要です。
     *
     * 注意: キャッシュのみにRedisを使用している場合は、これを使用する必要はありません。
     * Redisテナンシーは、Redisファサードを使用するか、依存関係として注入して
     * 直接Redis呼び出しを行う場合にのみ関連します。
     */
    'redis' => [
        'prefix_base' => 'tenant', // Redis内の各キーには、このprefix_baseに続いてtenant_idが前置されます。
        'prefixed_connections' => [ // キーにプレフィックスが付いたRedis接続で、テナントのキーを分離します。
            // 'default',
        ],
    ],

    /**
     * フィーチャーは、テナンシーがブートストラップされるために必要でない
     * 追加機能を提供するクラスです。これらはテナンシーが初期化されているかどうかに関係なく実行されます。
     *
     * 有効にしたいものを理解するために、各クラスのドキュメントページを参照してください。
     */
    'features' => [
        // Stancl\Tenancy\Features\UserImpersonation::class,
        // Stancl\Tenancy\Features\TelescopeTags::class,
        // Stancl\Tenancy\Features\UniversalRoutes::class,
        // Stancl\Tenancy\Features\TenantConfig::class, // https://tenancyforlaravel.com/docs/v3/features/tenant-config
        // Stancl\Tenancy\Features\CrossDomainRedirect::class, // https://tenancyforlaravel.com/docs/v3/features/cross-domain-redirect
        // Stancl\Tenancy\Features\ViteBundler::class,
    ],

    /**
     * テナンシールートを登録するかどうか
     *
     * テナンシールートにはテナントアセットルートが含まれます。デフォルトでは、このルートは
     * 有効になっています。しかし、外部ストレージ（例：S3 / Dropbox）を使用している場合や
     * カスタムアセットコントローラーがある場合は、無効にすると便利な場合があります。
     */
    'routes' => true,

    /**
     * tenants:migrateコマンドで使用されるパラメータ
     */
    'migration_parameters' => [
        '--force' => true, // 本番環境でマイグレーションを実行するには、これをtrueにする必要があります。
        '--path' => [database_path('migrations/tenant')],
        '--realpath' => true,
    ],

    /**
     * tenants:seedコマンドで使用されるパラメータ
     */
    'seeder_parameters' => [
        '--class' => 'DatabaseSeeder', // ルートシーダークラス
        // '--force' => true, // 本番環境でテナントデータベースをシードするには、これをtrueにする必要があります
    ],
];
