import test from 'node:test'
import assert from 'node:assert/strict'
import { getTelegramWebApp, getTelegramInitData, initializeTelegram, shareTelegramUrl } from '../dist/index.js'

test('returns safe values outside the browser', () => {
  assert.equal(getTelegramWebApp(), undefined)
  assert.equal(getTelegramInitData(), null)
  assert.equal(initializeTelegram(), undefined)
  assert.doesNotThrow(() => shareTelegramUrl('https://example.com'))
})
