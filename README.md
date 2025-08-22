# 🤖 ModMail Discord – Multi-Languages

> ModMail bot for Discord with support for multiple languages (Portuguese and English), ideal for serving users globally.

---

## Commands

### /settings
Customize the bot's settings, such as: log channel, ticket category, staff role, server, and more, using v2 components very quickly.

---

#### `.env` Settings:

- `BOT_TOKEN`: Bot token. Remember to enable the necessary intents.  
- `OWNER_ID`: ID of the bot owner, who will have full permissions. You can also configure roles that will have access to commands via the /settings command.

---

> [!NOTE] 
> This project **base** can be generated using the [Constant CLI](https://github.com/rinckodev/constatic)
> See the full documentation for this base by accessing: https://constatic-docs.vercel.app/docs/discord/start

This is the most complete discord bot base you've ever seen! Developed by [@rinckodev](https://github.com/rinckodev), this project uses typescript in an incredible way to provide complete structures and facilitate the development of your discord bot.

> [!WARNING]
> [NodeJs](https://nodejs.org/en) version required: 20.12 or higher

## Scripts

- `dev`: running bot in development
- `build`: build the project
- `watch`: running in watch mode
- `start`: running the compiled bot

## Structures

- [Commands](https://constatic-docs.vercel.app/docs/discord/commands)
- [Responder](https://constatic-docs.vercel.app/docs/discord/responders)
- [Events](https://constatic-docs.vercel.app/docs/discord/events)