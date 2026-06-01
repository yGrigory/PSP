# PSP

Учебный репозиторий по лабораторным работам.

## Структура

1. `lab_1` - ЛР1: тематическая HTML/CSS-страница.
2. `lab_2` - ЛР2: калькулятор на JavaScript.
3. `lab_3` - ЛР3 и домашнее задание: компонентный каталог, алгоритмы и 3D-модель.
4. `lab_4` - ЛР4: backend на Express и REST API `/stocks`.
5. `lab_5` - ЛР5: AJAX-запросы к API через `XMLHttpRequest`.
6. `lab_6` - ЛР6: `fetch`, `Promise`, `async/await`, сборка Vite и раздача frontend как статики.

## Запуск

1. Для статических лабораторных откройте нужный `index.html` через Live Server.
2. Для `lab_4` запустите backend:

```powershell
cd lab_4
npm install
npm run start
```

3. Для `lab_5` сначала запустите backend из `lab_4`, затем откройте `lab_5/index.html` через Live Server.
4. Для `lab_6`:

```powershell
cd lab_6
npm install
npm run build
npm run start
```

После этого сайт будет доступен на `http://localhost:3000/`.

