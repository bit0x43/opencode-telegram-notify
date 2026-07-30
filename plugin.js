export const TelegramNotify = async () => {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!botToken || !chatId) return {}

  const send = async (msg) => {
    try {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: Number(chatId), text: msg, parse_mode: 'Markdown' }),
      })
    } catch (e) {
      console.error('Telegram notify error:', e)
    }
  }

  return {
    event: async ({ event }) => {
      switch (event.type) {
        case 'session.idle':
          await send('*opencode*: Task completed')
          break
        case 'session.error':
          await send(`*opencode error*: ${event.error || 'Unknown error'}`)
          break
        case 'session.status':
          await send(`*opencode status*: ${event.status || event.message || ''}`)
          break
        case 'permission.asked':
          await send('*opencode*: Waiting for your permission')
          break
      }
    },
  }
}
