import { Client, Intents, Collection, Message } from "discord.js";
import { DisTube } from "distube";
import { YtDlpPlugin } from "@distube/yt-dlp";
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

// Configurar DisTube con mejor estabilidad
client.distube = new DisTube(client, {
  leaveOnStop: false,
  leaveOnFinish: false,
  leaveOnEmpty: false,
  emitNewSongOnly: true,
  savePreviousSongs: false,
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
