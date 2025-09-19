<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>テナントが見つかりません</title>
    <style>
        body {
            margin: 0;
            padding: 2rem;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #111827;
            color: #f9fafb;
            display: flex;
            flex-direction: column;
            justify-content: center;
            min-height: 100vh;
        }
        main {
            max-width: 480px;
        }
        h1 {
            font-size: 2rem;
            margin-bottom: 1rem;
        }
        p {
            margin-bottom: 1.5rem;
            line-height: 1.6;
        }
        a {
            color: #60a5fa;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
<main>
    <h1>テナントが見つかりません</h1>
    <p>指定されたテナント <strong>{{ $tenant }}</strong> は登録されていないか、利用できません。</p>
    <a href="/">トップへ戻る</a>
</main>
</body>
</html>
