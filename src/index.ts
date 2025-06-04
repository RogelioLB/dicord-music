import { Client, Intents, Collection, Message } from "discord.js";
import { DisTube } from "distube";
import { YtDlpPlugin } from "@distube/yt-dlp";
import { createAgent } from "@distube/ytdl-core";
import config from "./config";
import * as fs from "fs";
import * as path from "path";

// Crear el cliente de Discord
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
});

// Extender la interfaz del cliente para incluir comandos
declare module "discord.js" {
  interface Client {
    commands: Collection<string, any>;
    distube: DisTube;
  }
}

// Inicializar la colección de comandos
client.commands = new Collection();

const cookies = [
  {
    domain: ".youtube.com",
    expirationDate: 1764279788.225323,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-3PSID",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value:
      "g.a000xghrB-LqkTSOBJBWcItjg4cBWX8Mjmk5_ff9cJN5uU4R7YLlTTuWogPYZZl9YrO-w8IrkQACgYKATASARYSFQHGX2MiaTCDmH7nPP3TR6bwLUAa0hoVAUF8yKoBWqyzVWBZxZalsCFbhhqr0076",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1764567402.977961,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-1PSIDTS",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value:
      "sidts-CjIB5H03P9WSOAFedp4N104_L_GVFWeCdZEW51eMMDXV8brzPLkJfdWCrHEzorNQhHLjRhAA",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1764279788.225079,
    hostOnly: false,
    httpOnly: false,
    name: "SAPISID",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value: "XIkUf3L4VCqbKLxg/A3rbkcyVpoW4AhKsf",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1764567961.687042,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-1PSIDCC",
    path: "/",
    sameSite: undefined,
    secure: true,
    session: false,
    storeId: null,
    value:
      "AKEyXzXu758a4fOJzHvSywoyFqn-v1DTYYZL2Y2xIRzzPjQJTA7VxyIWbHZqfa5tTrxek_rrTw",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1764279788.225055,
    hostOnly: false,
    httpOnly: true,
    name: "SSID",
    path: "/",
    sameSite: undefined,
    secure: true,
    session: false,
    storeId: null,
    value: "AOqBEHkweDe4puLNy",
  },
  {
    domain: ".youtube.com",
    hostOnly: false,
    httpOnly: false,
    name: "wide",
    path: "/",
    sameSite: "lax",
    secure: true,
    session: true,
    storeId: null,
    value: "1",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1764279788.225103,
    hostOnly: false,
    httpOnly: false,
    name: "__Secure-1PAPISID",
    path: "/",
    sameSite: undefined,
    secure: true,
    session: false,
    storeId: null,
    value: "XIkUf3L4VCqbKLxg/A3rbkcyVpoW4AhKsf",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1764279788.225282,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-1PSID",
    path: "/",
    sameSite: undefined,
    secure: true,
    session: false,
    storeId: null,
    value:
      "g.a000xghrB-LqkTSOBJBWcItjg4cBWX8Mjmk5_ff9cJN5uU4R7YLlGf7DnKAt3VFwPRTIaLQL_gACgYKARMSARYSFQHGX2MiHp4v1ICfeSco6xTOJVh53RoVAUF8yKoWkxHwSdjGsY5OzGM3zQ2I0076",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1764279788.225147,
    hostOnly: false,
    httpOnly: false,
    name: "__Secure-3PAPISID",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value: "XIkUf3L4VCqbKLxg/A3rbkcyVpoW4AhKsf",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1764567961.687144,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-3PSIDCC",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value:
      "AKEyXzVjrENn_eNnLgELnHW8MlgoixUIrBpgklRnFYHk07aaG4fdIXR0UCunhAUwKUulp9P_d1U",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1764567402.978103,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-3PSIDTS",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value:
      "sidts-CjIB5H03P9WSOAFedp4N104_L_GVFWeCdZEW51eMMDXV8brzPLkJfdWCrHEzorNQhHLjRhAA",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1763908318.89408,
    hostOnly: false,
    httpOnly: true,
    name: "LOGIN_INFO",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value:
      "AFmmF2swRgIhALPVdNUZMzSzVpIol3vZeo6P31niTDelS4_pvjARBsWnAiEAm0f4rVinJvQ9DX6UwI8GjkE8D64Cfl4xPpokUNs5pOc:QUQ3MjNmeWxrb1k5a2pOV0dsMkt4bHFvbFAyam4tQWY3Z3ZPcms1ZE1ueUY3dTVraHdjOTVacDNPT3NFTDNHbkFyWTBINGhRZWhpRzFCZ252MC1ROXNmS0RtSS1vdjJXRVlnZzVPdm53V19iZXUwY0Z2UVcxYV9Oc1BSTkk4bDQxZmhlVXNSb0tBTllxdGViazJGb3pqSnAyNWhMcTQyenZB",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1749617893.168823,
    hostOnly: false,
    httpOnly: false,
    name: "PREF",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value: "f6=40000080&f7=d00&tz=America.Mazatlan&repeat=NONE&f4=4000000",
  },
];

// (Optional) http-cookie-agent / undici agent options
// Below are examples, NOT the recommended options
const agentOptions = {
  pipelining: 5,
  maxRedirections: 0,
};

// Configurar DisTube con mejor estabilidad
client.distube = new DisTube(client, {
  leaveOnStop: false,
  leaveOnFinish: false,
  leaveOnEmpty: false,
  emitNewSongOnly: true,
  savePreviousSongs: false,
  youtubeCookie: process.env.YOUTUBE_COOKIE,
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 27, // ~128MB para prevenir cortes
    filter: "audioonly",
  },
  youtubeIdentityToken: process.env.YOUTUBE_COOKIE,
  plugins: [new YtDlpPlugin()],
});

// Cargar comandos
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js") || file.endsWith(".ts"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.warn(
      `El comando en ${filePath} no tiene las propiedades requeridas.`
    );
  }
}

// Manejar eventos de Discord
client.once("ready", () => {
  console.log(`Bot iniciado como ${client.user?.tag}`);
});

// Manejar comandos de mensaje
client.on("messageCreate", async (message: Message) => {
  // Ignorar mensajes de bots y mensajes que no comienzan con el prefijo
  if (message.author.bot || !message.content.startsWith(config.prefix)) return;

  // Extraer el comando y los argumentos
  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift()?.toLowerCase();

  if (!commandName) return;

  // Buscar el comando
  const command = client.commands.get(commandName);

  if (!command) return;

  // Ejecutar el comando
  try {
    await command.execute(message, args);
  } catch (error) {
    console.error(error);
    await message.reply("Hubo un error al ejecutar el comando.");
  }
});

// Manejar eventos de DisTube
client.distube
  .on("playSong", (queue, song) => {
    const textChannel = queue.textChannel as any;
    textChannel?.send(
      `🎵 Reproduciendo: \`${song.name}\` - \`${song.formattedDuration}\``
    );
  })
  .on("addSong", (queue, song) => {
    const textChannel = queue.textChannel as any;
    textChannel?.send(
      `✅ Añadido \`${song.name}\` - \`${song.formattedDuration}\` a la cola.`
    );
  })
  .on("error", (channel, e) => {
    channel?.send(`Error: ${e}`);
    console.error(e);
  });

// Iniciar sesión con el token de Discord
client.login(config.token);
