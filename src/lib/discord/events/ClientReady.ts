import { Client } from "discord.js";

export default function ClientReady(client: Client) {
  console.log(`Discord ready! Logged in as ${client!.user!.tag}`);
}
