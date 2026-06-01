# ЛР 6. Promise, fetch и сборка клиентской части

## Что реализовано

1. Клиентская часть переведена с `XMLHttpRequest` на `fetch`.
2. Запросы выполняются через `Promise` и `async/await`.
3. Добавлен Vite для запуска и сборки frontend.
4. Backend на Express раздает API `/stocks`.
5. После `npm run build` frontend собирается в `server/public`.
6. Express раздает `server/public` как статику, поэтому итоговый сайт открывается на `http://localhost:3000/`.

## Основные файлы

- `modules/api.js` - класс запросов через `fetch`.
- `modules/stockUrls.js` - адреса API.
- `pages/main/index.js` - загрузка списка карточек через `fetch`.
- `pages/product/index.js` - загрузка одной карточки по `id`.
- `vite.config.js` - настройка сборки в `server/public`.
- `server/src/index.js` - Express-сервер, API и раздача статики.

## Запуск в dev-режиме

```powershell
cd C:\Users\grigo\PSP\lab_6
npm install
npm run start
```

Во втором терминале:

```powershell
cd C:\Users\grigo\PSP\lab_6
npm run dev
```

Открыть `http://localhost:5173/`.

## Сборка и запуск итогового варианта

```powershell
cd C:\Users\grigo\PSP\lab_6
npm install
npm run build
npm run start
```

Открыть `http://localhost:3000/`.

## Как проверять

1. Открыть DevTools в браузере.
2. Перейти во вкладку `Network`.
3. Обновить страницу.
4. Проверить запрос `GET /stocks`.
5. Кликнуть по карточке и проверить запрос `GET /stocks/:id`.

