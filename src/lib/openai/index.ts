import { Configuration, OpenAIApi } from "openai";
import { OPENAI } from "../../config/openai";

const configuration = new Configuration({
  apiKey: OPENAI.apiKey,
});
export const openai = new OpenAIApi(configuration);
