import * as dotenv from 'dotenv';
dotenv.config();

interface BotConfig {
  token: string;
  prefix: string;
}

const config: BotConfig = {
  token: process.env.DISCORD_TOKEN || "",
  prefix: process.env.PREFIX || "!",
};

export default config;
