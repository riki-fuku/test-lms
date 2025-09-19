@extends('layouts.app')

@section('title', \Illuminate\Support\Str::headline($tenant->name) . ' | Tenant')

@section('content')
    <section class="container" style="padding: 64px 0;">
        <div class="card">
            <header>
                <p style="margin: 0; color: #94a3b8;">Tenant</p>
                <h1 style="font-size: 2.25rem; font-weight: 700; margin: 8px 0 0;">{{ \Illuminate\Support\Str::headline($tenant->name) }}</h1>
                <p style="margin: 12px 0 0; color: #64748b;">テナント固有のユーザ一覧を表示しています。</p>
                <div style="margin-top: 16px;">
                    <span class="badge">ユーザ数 {{ $tenant->users->count() }}</span>
                    <a href="{{ route('tenants.index') }}" style="margin-left: 16px; color: #2563eb; font-weight: 600;">← テナント一覧に戻る</a>
                </div>
            </header>

            <table>
                <thead>
                    <tr>
                        <th style="width: 25%;">User ID</th>
                        <th style="width: 35%;">名前</th>
                        <th style="width: 40%;">メールアドレス</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($tenant->users as $user)
                        <tr>
                            <td><code>{{ $user->id }}</code></td>
                            <td>{{ $user->name }}</td>
                            <td>{{ $user->email }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </section>
@endsection
