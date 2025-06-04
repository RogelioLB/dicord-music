import { Message } from "discord.js";

module.exports = {
  data: {
    name: "skip",
    description: "Salta a la siguiente canción",
  },
  async execute(message: Message) {
    const voiceChannel = message.member?.voice.channel;
    
    if (!voiceChannel) {
      return message.reply("Necesitas estar en un canal de voz para usar este comando.");
    }
    
    const queue = message.client.distube.getQueue(message.guild!.id);
    
    if (!queue) {
      return message.reply("No hay nada reproduciéndose actualmente.");
    }
    
    try {
      message.client.distube.skip(message);
      message.reply("⏭️ Canción saltada.");
    } catch (error) {
      console.error(error);
      message.reply("Ocurrió un error al saltar la canción.");
    }
  },
};
