# Лабораторная работа 6

## Задание

В лабораторной работе нужно:

- заменить callback-подход на `Promise`/`async`/`await`;
- выполнять запросы к API через `fetch`;
- собрать frontend через bundler `Vite`;
- развернуть собранный bundle на сервере с API из 4-й лабораторной.

Важно: ветка `lab_6` содержит только исходный код. Собранный bundle добавляется в ветку `lab_4`.

## Как работает frontend

Запросы выполняются через `fetch` в файле `modules/api.js`.

Адреса API сделаны относительными в `modules/stockUrls.js`:

```js
this.baseUrl = "";
```

Например:

```js
fetch("/stocks")
```

Когда bundle лежит на Express-сервере из 4-й лабораторной, страница и API открываются с одного origin:

```text
http://localhost:3000
```

Поэтому CORS не блокирует запросы и расширение `CORS Unblock` не нужно.

## Как собрать bundle

```powershell
npm install
npm run build
```

Команда собирает frontend в папку `dist/`. Эта папка не коммитится в ветку `lab_6`, потому что bundle должен лежать в ветке `lab_4`.

## Что показывать

1. Переключиться на ветку `lab_4`.
2. Запустить сервер 4-й лабораторной:

```powershell
npm install
npm run start
```

3. Открыть:

```text
http://localhost:3000
```

4. В DevTools показать:

- `Network`: запросы `fetch` к `/stocks` проходят без CORS-ошибки;
- `Sources`: видны только файлы bundle, а не исходные JS-модули frontend.

## Основные файлы

- `modules/api.js` - обертка над `fetch`.
- `modules/stockUrls.js` - относительные URL API.
- `pages/main/index.js` - загрузка списка сервисов через `fetch`.
- `pages/product/index.js` - загрузка одной карточки через `fetch`.
- `vite.config.js` - настройка сборки через Vite.
