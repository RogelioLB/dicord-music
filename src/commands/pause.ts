import { Message } from "discord.js";

module.exports = {
  data: {
    name: "pause",
    description: "Pausa la reproducción actual de música",
  },
  async execute(message: Message) {
    const queue = message.client.distube.getQueue(message.guild!.id);
    
    if (!queue) {
      return message.reply("¡No hay nada reproduciéndose en este momento!");
    }
    
    try {
      if (queue.paused) {
        return message.reply("¡La música ya está pausada! Usa `!resume` para reanudar la reproducción.");
      }
      
      queue.pause();
      message.reply("⏸️ Música pausada. Usa `!resume` para reanudar la reproducción.");
    } catch (error) {
      console.error(error);
      message.reply("Ocurrió un error al intentar pausar la música.");
    }
  },
};
