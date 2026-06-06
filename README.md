# dnd-character-sheet

Статический лист персонажа D&D 5e / UA Mystic.

## Структура

- `index.html`, `styles.css`, `app.js` — клиент
- `data/character.json` — основной источник данных персонажа
- `data/character-data.js` — сгенерированный глобальный fallback-файл для открытия сайта напрямую через `file://`
- `scripts/generate-character-module.js` — генератор `character-data.js` из `character.json`

## Обновление данных

После изменений в `data/character.json` обнови fallback-модуль:

```bash
node scripts/generate-character-module.js
```

## Локальный просмотр

Можно открыть `index.html` напрямую с диска.

Для обычного локального хостинга:

```bash
python3 -m http.server 8000
```
