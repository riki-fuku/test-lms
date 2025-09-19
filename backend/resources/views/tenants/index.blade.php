@extends('layouts.app')

@section('title', 'Tenant Directory')

@section('content')
    <section class="container" style="padding: 64px 0;">
        <div class="card">
            <header>
                <h1 style="font-size: 2rem; font-weight: 700; margin-bottom: 12px;">テナント一覧</h1>
                <p style="color: #64748b;">利用可能なテナントのTOP画面に移動できます。</p>
            </header>

            <div style="margin-top: 32px; display: grid; gap: 16px;">
                @foreach ($tenants as $tenant)
                    <a href="{{ route('tenants.show', $tenant) }}" style="display: block; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; transition: transform 0.2s ease, box-shadow 0.2s ease;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <h2 style="font-size: 1.25rem; font-weight: 600; margin: 0;">{{ \Illuminate\Support\Str::headline($tenant->name) }}</h2>
                                <p style="margin: 8px 0 0; color: #94a3b8;">slug: {{ $tenant->slug }}</p>
                            </div>
                            <span class="badge">ユーザ数 {{ $tenant->users_count }}</span>
                        </div>
                    </a>
                @endforeach
            </div>
        </div>
    </section>
@endsection
