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

Для публикации npm требует 2FA на аккаунте или granular access token с включённым **Bypass 2FA**. Для ручной публикации включите 2FA в настройках аккаунта npmjs.com, затем выполните `npm login` в терминале и `npm publish --access public`; подтвердите запрос npm. Если используется код из приложения-аутентификатора, можно указать `npm publish --access public --otp=КОД`. Не сохраняйте код или токен в репозитории.

Перед публикацией проверьте право на использование исходного кода и выберите лицензию. Сейчас в `package.json` указано `UNLICENSED`. Проверьте, что имя пакета доступно в npm; при необходимости измените `name` и заново выполните `npm install`. Для следующего релиза повысьте версию через `npm version patch`.

## GitHub и связь с npm

Публикация в npm и отправка кода на GitHub выполняются отдельно. Этот проект уже содержит локальный Git-репозиторий и коммиты. Создайте на GitHub **пустой** репозиторий `asl-telegram-webapp` без автосоздания README, `.gitignore` или лицензии. Затем из каталога этого проекта выполните:

```bash
git remote add origin https://github.com/OWNER/asl-telegram-webapp.git
git push -u origin main
```

Замените `OWNER` на свой username или организацию. Если `origin` уже существует, проверьте его командой `git remote -v` и при необходимости измените адрес через `git remote set-url origin <адрес>`.

После создания репозитория добавьте его реальный адрес в поля `repository`, `homepage` и `bugs` файла `package.json`. Тогда npm сможет показывать ссылку на исходный код и страницу ошибок. В README GitHub можно добавить ссылку на [страницу пакета в npm](https://www.npmjs.com/package/asl-telegram-webapp). Эти метаданные попадут на npm после публикации новой версии; один только `git push` не меняет уже опубликованный пакет.
