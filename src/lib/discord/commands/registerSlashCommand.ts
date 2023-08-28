import { DISCORD } from "../../../config/discord";
import { CommandPromptAsk } from "../commands/ask";
import { CommandPromptHelp } from "../commands/help";
import { CommandPromptTrain } from "../commands/train";

import {
  REST,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes,
} from "discord.js";

export function registerSlashCommand(guildId) {
  const rest = new REST({ version: "10" }).setToken(DISCORD().token);

  const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
  commands.push(CommandPromptAsk.data.toJSON());
  commands.push(CommandPromptHelp.data.toJSON());
  commands.push(CommandPromptTrain.data.toJSON());

  (async () => {
    try {
      console.log(
        `Started refreshing ${commands.length} application (/) commands.`
      );

      // The put method is used to fully refresh all commands in the guild with the current set
      const data = await rest.put(
        Routes.applicationGuildCommands(DISCORD().clientId, guildId),
        { body: commands }
      );

      console.log("Successfully reloaded in ", guildId);
    } catch (error) {
      console.error(error);
    }
  })();
}
