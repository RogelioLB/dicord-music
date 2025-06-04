import { Message } from "discord.js";

module.exports = {
  data: {
    name: "resume",
    description: "Reanuda la reproducción pausada",
  },
  async execute(message: Message) {
    const queue = message.client.distube.getQueue(message.guild!.id);
    
    if (!queue) {
      return message.reply("¡No hay nada en la cola para reanudar!");
    }
    
    try {
      if (!queue.paused) {
        return message.reply("¡La música ya está sonando! No hay nada que reanudar.");
      }
      
      queue.resume();
      message.reply("▶️ Reproducción reanudada.");
    } catch (error) {
      console.error(error);
      message.reply("Ocurrió un error al intentar reanudar la reproducción.");
    }
  },
};
