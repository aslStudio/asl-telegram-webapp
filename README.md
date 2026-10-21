# asl-telegram-webapp

Типизированный доступ к `window.Telegram.WebApp` и React hook. Работает при SSR: вне Telegram возвращает `undefined` и безопасные значения по умолчанию.

```bash
npm install asl-telegram-webapp @twa-dev/types
```

Подключите официальный Telegram Web App SDK перед кодом приложения:

```html
<script src="https://telegram.org/js/telegram-web-app.js"></script>
```

```tsx
import { initializeTelegram, useTelegram } from 'asl-telegram-webapp'

initializeTelegram()

function Header() {
  const { user, theme, isAvailable, shareUrl } = useTelegram()
  return <button disabled={!isAvailable} onClick={() => shareUrl(location.href)}>
    {user?.first_name ?? 'Гость'} · {theme}
  </button>
}
```

Экспортируются `getTelegramWebApp`, `getTelegramInitData`, `initializeTelegram`, `shareTelegramUrl`, `useTelegram` и типы `TelegramWebApp`, `TelegramUser`, `TelegramTheme`. Hook подписывается на `themeChanged`. Для аутентификации отправляйте **сырой `initData`** на сервер и проверяйте подпись там. `initDataUnsafe` и `user` удобны для UI, но не служат доказательством личности.

