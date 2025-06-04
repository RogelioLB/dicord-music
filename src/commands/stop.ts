import { Message } from "discord.js";

module.exports = {
  data: {
    name: "stop",
    description: "Detiene la reproducción de música",
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
      message.client.distube.stop(message);
      message.reply("⏹️ Reproducción detenida.");
    } catch (error) {
      console.error(error);
      message.reply("Ocurrió un error al detener la música.");
    }
  },
};
