<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $tenant->data['name'] ?? \Illuminate\Support\Str::headline($tenant->id) }} | Tenant Dashboard</title>
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet">
    <style>
        :root {
            color-scheme: light dark;
        }
        body {
            margin: 0;
            font-family: 'Figtree', sans-serif;
            padding: 2rem;
            background: #f3f4f6;
            color: #111827;
        }
        header {
            margin-bottom: 2rem;
        }
        h1 {
            margin: 0 0 0.5rem 0;
            font-size: 2.25rem;
        }
        .summary {
            color: #6b7280;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            background: #fff;
            border-radius: 0.75rem;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
        }
        th, td {
            padding: 1rem;
            border-bottom: 1px solid #e5e7eb;
            text-align: left;
        }
        th {
            background: #f9fafb;
            font-weight: 600;
            color: #374151;
        }
        tbody tr:last-child td {
            border-bottom: none;
        }
        .muted {
            color: #6b7280;
        }
        footer {
            margin-top: 2rem;
            color: #6b7280;
        }
        a {
            color: #2563eb;
        }
    </style>
</head>
<body>
    <header>
        <h1>{{ $tenant->data['name'] ?? \Illuminate\Support\Str::headline($tenant->id) }} のトップページ</h1>
        <p class="summary">登録ユーザ一覧 ({{ $users->count() }} 件)</p>
    </header>

    @if($users->isEmpty())
        <p class="muted">ユーザが登録されていません。</p>
    @else
        <table>
            <thead>
            <tr>
                <th>#</th>
                <th>氏名</th>
                <th>メールアドレス</th>
                <th>登録日時</th>
            </tr>
            </thead>
            <tbody>
            @foreach($users as $index => $user)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $user->name }}</td>
                    <td>{{ $user->email }}</td>
                    <td class="muted">{{ $user->created_at?->format('Y-m-d H:i') }}</td>
                </tr>
            @endforeach
            </tbody>
        </table>
    @endif

    <footer>
        <a href="/">中央アプリに戻る</a>
    </footer>
</body>
</html>
