import { useSyncExternalStore } from 'react'
import type { WebApp } from '@twa-dev/types'

export type TelegramWebApp = WebApp
export type TelegramUser = NonNullable<WebApp['initDataUnsafe']['user']>
export type TelegramTheme = WebApp['colorScheme']

export function getTelegramWebApp(): TelegramWebApp | undefined {
  if (typeof window === 'undefined') return undefined
  return (window as Window & { Telegram?: { WebApp?: WebApp } }).Telegram?.WebApp
}

export function getTelegramInitData(): string | null {
  return getTelegramWebApp()?.initData || null
}

export function initializeTelegram({ expand = true }: { expand?: boolean } = {}): TelegramWebApp | undefined {
  const app = getTelegramWebApp()
  app?.ready()
  if (expand) app?.expand()
  return app
}

export function shareTelegramUrl(url: string, text = ''): void {
  const app = getTelegramWebApp()
  app?.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`)
}

const noop = () => () => {}
const subscribe = (notify: () => void) => {
  const app = getTelegramWebApp()
  if (!app) return noop()
  app.onEvent('themeChanged', notify)
  return () => app.offEvent('themeChanged', notify)
}
const getTheme = (): TelegramTheme => getTelegramWebApp()?.colorScheme ?? 'light'
const getServerTheme = (): TelegramTheme => 'light'

export function useTelegram() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme)
  const app = getTelegramWebApp()
  return {
    app,
    isAvailable: Boolean(app),
    initData: app?.initData ?? '',
    user: app?.initDataUnsafe?.user,
    theme,
    themeParams: app?.themeParams,
    isMobileDevice: app?.platform === 'ios' || app?.platform === 'android',
    MainButton: app?.MainButton,
    SecondaryButton: app?.SecondaryButton,
    BackButton: app?.BackButton,
    HapticFeedback: app?.HapticFeedback,
    ready: () => app?.ready(),
    expand: () => app?.expand(),
    close: () => app?.close(),
    openLink: (url: string) => app?.openLink(url),
    openTelegramLink: (url: string) => app?.openTelegramLink(url),
    shareUrl: shareTelegramUrl
  }
}
