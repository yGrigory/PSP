# Лабораторная работа 6

## Смысл работы

В этой лабораторной фронтенд подключен к backend API через `Fetch API`, а проект собирается через `Vite`.

Главное отличие от 5-й лабораторной:

- в 5-й лабораторной используется `XMLHttpRequest` и демонстрируется проблема CORS при запуске frontend и backend на разных портах;
- в 6-й лабораторной используется `fetch`, а CORS обходится через `Vite proxy`, поэтому браузер отправляет запросы на тот же origin, где запущен Vite.

## Как работает обход CORS

Frontend делает запросы не напрямую на `http://localhost:3000`, а на относительный путь:

```js
fetch("/stocks")
```

В файле `vite.config.js` настроен proxy:

```js
server: {
  proxy: {
    "/stocks": {
      target: "http://localhost:3000",
      changeOrigin: true
    }
  }
}
```

Для браузера запрос выглядит как запрос к frontend-серверу Vite, поэтому CORS не блокирует его. Vite сам пересылает запрос на Express backend.

## Основные файлы

- `modules/api.js` - универсальная обертка над `fetch`.
- `modules/stockUrls.js` - относительные URL API.
- `pages/main/index.js` - загрузка списка сервисов через `fetch`.
- `pages/product/index.js` - загрузка одной карточки через `fetch`.
- `vite.config.js` - настройка сборки и proxy.
- `server/src/index.js` - Express backend и раздача собранного frontend.

## Как запускать

Установить зависимости:

```powershell
npm install
```

Запустить backend:

```powershell
npm run server
```

В другом терминале запустить frontend через Vite:

```powershell
npm run dev
```

После этого открыть адрес, который покажет Vite, обычно:

```text
http://localhost:5173
```

## Как проверить

1. Открыть DevTools.
2. Перейти во вкладку `Network`.
3. Обновить страницу.
4. Найти запрос `stocks`.
5. Убедиться, что запрос уходит на frontend-origin Vite, но данные приходят с Express backend через proxy.

Если открыть frontend не через Vite proxy, а напрямую с другого порта и обращаться к `http://localhost:3000`, CORS снова станет актуальной проблемой. В этой лабораторной обход реализован именно через Vite.
