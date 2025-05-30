<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/ico" href="favicon.png" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>MiniPl4yz</title>
    @viteReactRefresh
    @vite('resources/js/app.jsx')
  </head>
  <body>
    <div id="root" class="container-fluid bg-grad"></div>
  </body>
</html>