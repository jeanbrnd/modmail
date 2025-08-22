import { bootstrap } from "#base";

await bootstrap({ meta: import.meta, intents: ["Guilds", "GuildMessages", "MessageContent", "DirectMessages"],  });
