require("dotenv").config();

import express, { Express, Request, Response } from "express";
import { EXPRESS } from "./config/express";
import DiscordBot from "./lib/discord";

/* 
discord
*/

const discord_bot = new DiscordBot();

/* 
express
*/

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(EXPRESS.port, () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${EXPRESS.port}`
  );
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
});

// import Fuse from "fuse.js";

// async function test() {
//   const google = [
//     {
//       question: "Mesh Mesh",
//       answer: "Build anything",
//     },
//     {
//       question: "Mesh web3",
//       answer: "Get started with web3",
//     },
//   ];

//   var newgoogle = [];
//   for (var i in google) {
//     newgoogle.push({ q: google[i].question, a: google[i].answer });
//   }

//   console.log("newgoogle", newgoogle);

//   const database = [
//     {
//       q: "what is Mesh SDK's website?",
//       a: "The website for Mesh SDK is https://meshjs.dev/",
//     },
//     {
//       q: "What is Mesh AI?",
//       a: "Mesh AI is a discord-integrated AI to learn about your community and answer questions in real time. Anyone can fine-tune the knowledge base by replying and voting to the messages.",
//     },
//     {
//       q: "How to apply for Deep Funding?",
//       a: "DeepFunding is SingularityNETs innovation fund to support the further growth of the SingularityNET Ecosystem and is currently operated by the SingularityNET Foundations DeepFunding Team, including Jan Horlings, Peter Elfrink and Raphael Presa. DeepFunding ",
//     },
//   ];

//   const allData = [...newgoogle, ...database];

//   //

//   const options = {
//     includeScore: true,
//     keys: [
//       {
//         name: "q",
//         weight: 0.7,
//       },
//       {
//         name: "a",
//         weight: 0.3,
//       },
//     ],
//   };

//   const fuse = new Fuse(allData, options);

//   const result = fuse.search("mesh");

//   result.sort(function (a, b) {
//     return b.score - a.score;
//   });

//   console.log("result", result);
// }
// test();
