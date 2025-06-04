import { Message, EmbedBuilder } from "discord.js";

module.exports = {
  data: {
    name: "queue",
    description: "Muestra la cola de reproducción actual",
  },
  async execute(message: Message) {
    const queue = message.client.distube.getQueue(message.guild!.id);

    if (!queue || !queue.songs || queue.songs.length === 0) {
      return message.reply("No hay canciones en la cola.");
    }

    try {
      const songs = queue.songs.slice(0, 10);

      const embed = new EmbedBuilder()
        .setTitle("Cola de reproducción")
        .setColor("#0099ff")
        .setDescription(
          songs
            .map(
              (song, i) =>
                `${i === 0 ? "🎵 **Reproduciendo:**" : `${i}:`} ${
                  song.name
                } - \`${song.formattedDuration}\``
            )
            .join("\n")
        )
        .setFooter({
          text: `Total de canciones: ${queue.songs.length}`,
        });

      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply("Ocurrió un error al mostrar la cola.");
    }
  },
};
