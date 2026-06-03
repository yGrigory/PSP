# Лабораторная работа 6

## Смысл работы

В этой лабораторной frontend обращается к backend через `Fetch API`.

Frontend запускается через Vite, например на:

```text
http://localhost:5173
```

Backend Express запускается отдельно на:

```text
http://localhost:3000
```

Из-за разных портов браузер считает их разными origin. Поэтому без обхода CORS запросы frontend к backend должны блокироваться браузером.

## Как сделана демонстрация CORS

В `modules/stockUrls.js` frontend обращается напрямую к backend:

```js
this.baseUrl = "http://localhost:3000";
```

В `server/src/index.js` CORS-заголовки специально не добавлены.

Поэтому без плагина в браузере запрос:

```js
fetch("http://localhost:3000/stocks")
```

должен вызвать CORS-ошибку в консоли DevTools.

## Как проверить

Установить зависимости:

```powershell
npm install
```

Запустить backend:

```powershell
npm run server
```

В другом терминале запустить frontend:

```powershell
npm run dev
```

Открыть страницу Vite, обычно:

```text
http://localhost:5173
```

Открыть DevTools:

- вкладка `Console` покажет CORS-ошибку;
- вкладка `Network` покажет запрос к `http://localhost:3000/stocks`.

После включения CORS-плагина в браузере запросы должны начать проходить, и карточки сервисов загрузятся.

## Основные файлы

- `modules/api.js` - обертка над `fetch`.
- `modules/stockUrls.js` - прямые URL на backend `http://localhost:3000`.
- `pages/main/index.js` - загрузка списка сервисов через `fetch`.
- `pages/product/index.js` - загрузка одной карточки через `fetch`.
- `server/src/index.js` - Express backend без CORS middleware.
- `vite.config.js` - сборка Vite без proxy.
