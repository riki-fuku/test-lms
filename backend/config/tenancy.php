<?php

return [
    // Central domains (non-tenant area)
    'central_domains' => [
        env('CENTRAL_DOMAIN', 'localhost'),
        '127.0.0.1',
    ],

    // The tenant model for your app
    'tenant_model' => App\Models\Tenant::class,

    // Identification: we'll primarily use path-based in routes for local dev
    // Other options like domain-based can be enabled via middleware.
];

