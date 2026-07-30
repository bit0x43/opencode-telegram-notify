# opencode-telegram-notify

[OpenCode](https://opencode.ai) plugin that sends Telegram notifications for session events (task completed, errors, permission requests).

## Setup

### 1. Create a Telegram bot

Message [@BotFather](https://t.me/botfather) and run `/newbot`. Save the token.

### 2. Get your chat ID

Message your bot once, then run:

```bash
curl https://api.telegram.org/bot<TOKEN>/getUpdates
```

Your chat ID appears in the response as `"chat":{"id":<YOUR_ID>}`.

### 3. Configure environment

Copy [.env.example](./.env.example) to `.env` and fill in your values:

```bash
cp .env.example .env
```

```ini
TELEGRAM_BOT_TOKEN=8823686433:AAGl2S1e_xYAKGxC8fLO74TRvTVnE5zlpnM
TELEGRAM_CHAT_ID=123456789
```

### 4. Add to opencode

**Option A — Local plugin (recommended for personal use)**

Place `plugin.js` in your opencode plugins directory:

```bash
mkdir -p .opencode/plugins
cp plugin.js .opencode/plugins/telegram-notify.js
```

The plugin auto-loads on next opencode startup (restart required).

**Option B — Git reference (from your own clone)**

```json
{
  "plugin": ["/path/to/opencode-telegram-notify/plugin.js"]
}
```

Or reference the GitHub repo once published.

## Events notified

| Event | Trigger |
|---|---|
| `session.idle` | Task completed |
| `session.error` | Error occurred |
| `session.status` | Status update |
| `permission.asked` | Waiting for user input |

## License

MIT
