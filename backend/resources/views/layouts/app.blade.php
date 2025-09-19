<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Tenancy Demo')</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            color-scheme: light;
        }
        body {
            margin: 0;
            font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background: #f9fafb;
            color: #1f2933;
        }
        .container {
            width: min(960px, calc(100% - 32px));
            margin: 0 auto;
        }
        a {
            color: inherit;
            text-decoration: none;
        }
        header {
            text-align: center;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 24px;
        }
        th, td {
            padding: 12px 16px;
            border-bottom: 1px solid #e4e7eb;
            text-align: left;
        }
        th {
            background: #f1f5f9;
            font-weight: 600;
        }
        tr:hover {
            background: #f8fafc;
        }
        .badge {
            display: inline-block;
            padding: 4px 8px;
            background: #e0f2fe;
            color: #0369a1;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 600;
        }
        .card {
            background: #fff;
            border-radius: 12px;
            padding: 32px;
            box-shadow: 0 8px 16px rgba(15, 23, 42, 0.08);
        }
    </style>
</head>
<body>
    <main>
        @yield('content')
    </main>
</body>
</html>
