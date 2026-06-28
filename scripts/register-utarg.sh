#!/usr/bin/env bash
# Rejestruje komendę /utarg na konkretnym serwerze (guild) — pojawia się natychmiast.
# Użycie:
#   DISCORD_APP_ID=... DISCORD_GUILD_ID=... DISCORD_BOT_TOKEN=... ./scripts/register-utarg.sh
#
# APP_ID    = Application ID  (Developer Portal → General Information)
# GUILD_ID  = ID serwera Discord (włącz Tryb dewelopera → PPM na serwerze → Kopiuj ID serwera)
# BOT_TOKEN = token bota      (Developer Portal → Bot → Reset Token)
set -euo pipefail

: "${DISCORD_APP_ID:?ustaw DISCORD_APP_ID}"
: "${DISCORD_GUILD_ID:?ustaw DISCORD_GUILD_ID}"
: "${DISCORD_BOT_TOKEN:?ustaw DISCORD_BOT_TOKEN}"

curl -sS -X POST \
  "https://discord.com/api/v10/applications/${DISCORD_APP_ID}/guilds/${DISCORD_GUILD_ID}/commands" \
  -H "Authorization: Bot ${DISCORD_BOT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "utarg",
    "description": "Pokaż łączny utarg z opłaconych zamówień",
    "type": 1
  }'
echo
echo "✅ Jeśli powyżej widzisz JSON z \"name\": \"utarg\" — komenda zarejestrowana."
