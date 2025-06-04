import { Message, MessageEmbed } from "discord.js";
import config from "../config";

module.exports = {
  data: {
    name: "help",
    description: "Muestra la lista de comandos disponibles",
  },
  async execute(message: Message) {
    const commands = [...message.client.commands.values()];
    
    const embed = new MessageEmbed()
      .setTitle("Comandos del Bot de Música")
      .setColor("#0099ff")
      .setDescription(`Prefix: \`${config.prefix}\``)
      .addFields(
        commands.map(cmd => {
          return {
            name: `${config.prefix}${cmd.data.name}`,
            value: cmd.data.description || "Sin descripción",
            inline: true
          };
        })
      )
      .setFooter({ text: `Solicitado por ${message.author.tag}` })
      .setTimestamp();
    
    return message.reply({ embeds: [embed] });
  },
};
