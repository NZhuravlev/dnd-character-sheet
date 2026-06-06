# dnd-character-sheet

Статический лист персонажа D&D 5e / UA Mystic.

## Структура

- `index.html`, `styles.css`, `app.js` — клиент
- `data/character.json` — основной источник данных персонажа
- `run-local.command` — локальный запуск через простой HTTP-сервер

## Локальный просмотр

Открой `run-local.command`.
Скрипт сам поднимет локальный HTTP-сервер и выберет свободный порт автоматически.

Если хочешь запустить вручную:

```bash
python3 -m http.server 8000
```

При необходимости можно явно задать порт:

```bash
PORT=8010 ./run-local.command
```
