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

## Разработка и публикация

Этот каталог является отдельным Git-репозиторием и самостоятельным npm-пакетом. Команды выполняются из его корня.

```bash
npm ci
npm test
npm run pack:check
npm login
npm publish --access public
```

Перед публикацией проверьте право на использование исходного кода и выберите лицензию. Сейчас в `package.json` указано `UNLICENSED`. Проверьте, что имя пакета доступно в npm; при необходимости измените `name` и заново выполните `npm install`. Для следующего релиза повысьте версию через `npm version patch`.

Для GitHub создайте пустой репозиторий с таким же именем, затем добавьте его как `origin` и отправьте ветку: `git remote add origin <адрес>`, `git push -u origin main`.
