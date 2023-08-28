import { EmbedBuilder } from "discord.js";

export function newEmbedMessage() {
  return new EmbedBuilder().setColor(0x0099ff).setTimestamp().setFooter({
    text: "Mesh AI",
    iconURL: "https://meshjs.dev/logo-mesh/white/logo-mesh-white-64x64.png",
  });
}
