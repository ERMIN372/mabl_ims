# Шрифты МАБЛ — TT Rationalist

Фирменный шрифт бренда — **TT Rationalist** (начертания Light, Regular, DemiBold).

## TODO: добавить файлы шрифта

Положите сюда лицензионные файлы шрифта в формате `.woff2` (приоритет) и `.woff`:

```
public/fonts/
  TTRationalist-Light.woff2
  TTRationalist-Regular.woff2
  TTRationalist-DemiBold.woff2
```

Подключение уже описано в `src/app/globals.css` через `@font-face`
(см. блок «TT Rationalist»). Как только файлы будут добавлены, шрифт
автоматически применится глобально через CSS-переменную `--font-rationalist`.

Пока файлов нет — используется системный fallback
(`ui-sans-serif, system-ui, sans-serif`), визуально близкий гротеск.

Шрифт можно приобрести/лицензировать у TypeType: https://typetype.org/
