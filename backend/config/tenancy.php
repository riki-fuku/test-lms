<?php

declare(strict_types=1);

use Stancl\Tenancy\Bootstrappers\CacheTenancyBootstrapper;
use Stancl\Tenancy\Bootstrappers\DatabaseTenancyBootstrapper;
use Stancl\Tenancy\Bootstrappers\FilesystemTenancyBootstrapper;
use Stancl\Tenancy\Bootstrappers\QueueTenancyBootstrapper;
use Stancl\Tenancy\Database\Models\Domain;
use Stancl\Tenancy\Database\Models\Tenant;
use Stancl\Tenancy\Middleware\InitializeTenancyByPath;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;
use Stancl\Tenancy\UUIDGenerator;

return [
    'tenant_model' => Tenant::class,

    'domain_model' => Domain::class,

    'id_generator' => UUIDGenerator::class,

    'central_domains' => array_filter([
        env('APP_DOMAIN'),
        env('CENTRAL_DOMAIN'),
    ]),

    'database' => [
        'central_connection' => env('DB_CONNECTION', 'mysql'),
        'template_tenant_connection' => null,
        'tenant_connection' => env('TENANT_DB_CONNECTION', 'tenant'),
        'tenancy_migrations_path' => database_path('migrations/tenant'),
        'tenant_migration_paths' => [database_path('migrations/tenant')],
        'tenant_migration_namespace' => null,
        'tenant_seeder' => null,
        'auto_create_and_migrate' => true,
        'auto_delete' => false,
    ],

    'storage_to_config_map' => [
        'database' => 'database.connections.tenant.database',
    ],

    'cache' => [
        'tag_base' => 'tenant',
    ],

    'filesystem' => [
        'suffix_base' => 'tenant',
        'disks' => [
            'local',
            'public',
        ],
    ],

    'redis' => [
        'prefix_base' => 'tenant',
        'prefixed_connections' => [
            'cache',
            'default',
            'session',
        ],
    ],

    'bootstrappers' => [
        DatabaseTenancyBootstrapper::class,
        CacheTenancyBootstrapper::class,
        FilesystemTenancyBootstrapper::class,
        QueueTenancyBootstrapper::class,
    ],

    'routes' => [
        'path' => base_path('routes/tenant.php'),
        'middleware' => [
            'web',
            InitializeTenancyByPath::class,
            PreventAccessFromCentralDomains::class,
        ],
    ],

    'features' => [
        Stancl\Tenancy\Features\TenantConfig::class,
        Stancl\Tenancy\Features\TenantDatabase::class,
        Stancl\Tenancy\Features\UniversalRoutes::class,
        Stancl\Tenancy\Features\GlobalId::class,
    ],
];
