import { Message } from "discord.js";

module.exports = {
  data: {
    name: "play",
    description: "Reproduce música",
  },
  async execute(message: Message, args: string[]) {
    const query = args.join(" ");
    
    if (!query) {
      return message.reply("Por favor, proporciona una canción para reproducir.");
    }
    
    const voiceChannel = message.member?.voice.channel;
    
    if (!voiceChannel) {
      return message.reply("Necesitas estar en un canal de voz para usar este comando.");
    }
    
    try {
      await message.client.distube.play(voiceChannel, query, {
        member: message.member,
        textChannel: message.channel as any,
      });
    } catch (error) {
      console.error(error);
      message.reply("Ocurrió un error al reproducir la música.");
    }
  },
};
