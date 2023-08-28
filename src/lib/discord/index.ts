import { DISCORD } from "../../config/discord";
import {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  Partials,
} from "discord.js";
import MessageCreate from "./events/MessageCreate";
import ClientReady from "./events/ClientReady";
import MessageReactionAdd from "./events/MessageReactionAdd";
import { CommandPromptAsk } from "./commands/ask";
import { CommandPromptHelp } from "./commands/help";
import { CommandPromptTrain } from "./commands/train";
import InteractionCreate from "./events/InteractionCreate";

export default class DiscordBot extends Client {
  commands = new Collection();

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
      ],
      partials: [Partials.Message, Partials.Channel, Partials.Reaction],
    });

    /**
     * Login
     */
    this.login(DISCORD().token);

    /**
     * Events
     */
    this.once(Events.ClientReady, (client) => ClientReady(client));

    this.on(Events.MessageCreate, async (message) =>
      MessageCreate({ client: this, message })
    );

    this.on(Events.MessageReactionAdd, async (reaction, user) =>
      MessageReactionAdd({ client: this, reaction, user })
    );
    this.on(Events.MessageReactionRemove, async (reaction, user) =>
      MessageReactionAdd({ client: this, reaction, user })
    );

    /**
     * Commands
     */
    this.commands.set(CommandPromptAsk.data.name, CommandPromptAsk);
    this.commands.set(CommandPromptHelp.data.name, CommandPromptHelp);
    this.commands.set(CommandPromptTrain.data.name, CommandPromptTrain);
    // remember also need to add in `registerSlashCommand.ts`
    
    this.on(Events.InteractionCreate, async (interaction) => {
      if (!interaction.isChatInputCommand()) return;

      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`
        );
        return;
      }

      InteractionCreate({ client: this, interaction });
    });

  }
}
