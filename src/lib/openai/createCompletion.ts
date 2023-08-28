import { openai } from "./";

const samples = [
  // {
  //   prompt:
  //     "Create a transaction to send 1 ADA to addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr",
  //   completion: [
  //     {
  //       type: "new",
  //       var: "tx",
  //       mod: "Transaction",
  //       fn: [
  //         {
  //           fn: "sendLovelace",
  //           val: [
  //             "addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr",
  //             "1000000",
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   prompt:
  //     "Send 9 ADA to addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4npl7h83d83hd and 99 ADA to addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4n2dj02j9d0e9jd9edjs09j9",
  //   completion: [
  //     {
  //       type: "new",
  //       var: "tx",
  //       mod: "Transaction",
  //       fn: [
  //         {
  //           fn: "sendLovelace",
  //           val: [
  //             "addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4npl7h83d83hd",
  //             "9000000",
  //           ],
  //         },
  //         {
  //           fn: "sendLovelace",
  //           val: [
  //             "addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4n2dj02j9d0e9jd9edjs09j9",
  //             "99000000",
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   prompt:
  //     "Create a transaction to send 31, 52, and 93 ADA to addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr, addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4n2dj02j9d0e9jd9edjs09j9 and addr_test1vshds8dhs8db638he3e3h83he38hdsidsd8duusdh64kv0c7e4cxr respectively",
  //   completion: [
  //     {
  //       type: "new",
  //       var: "tx",
  //       mod: "Transaction",
  //       fn: [
  //         {
  //           fn: "sendLovelace",
  //           val: [
  //             "addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr",
  //             "31000000",
  //           ],
  //         },
  //         {
  //           fn: "sendLovelace",
  //           val: [
  //             "addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4n2dj02j9d0e9jd9edjs09j9",
  //             "52000000",
  //           ],
  //         },
  //         {
  //           fn: "sendLovelace",
  //           val: [
  //             "addr_test1vshds8dhs8db638he3e3h83he38hdsidsd8duusdh64kv0c7e4cxr",
  //             "93000000",
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   prompt: "Create a transaction to send 54 ADA to $jingles",
  //   completion: [
  //     { type: "new", var: "koios", mod: "KoiosProvider", val: ["api"] },
  //     {
  //       type: "new",
  //       var: "tx",
  //       mod: "Transaction",
  //       fn: [
  //         {
  //           fn: "sendLovelace",
  //           val: [
  //             {
  //               type: "fn",
  //               var: "koios",
  //               fn: "fetchHandleAddress",
  //               val: ["jingles"],
  //             },
  //             "54000000",
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   prompt:
  //     "Create a transaction to send 17 ADA to addr_test1vpvx0sacujd8d54j3oddgk7q40zc5c4npl337uusdh64kv0c7e4cxr and 23 ADA to $alice",
  //   completion: [
  //     { type: "new", var: "koios", mod: "KoiosProvider", val: ["api"] },
  //     {
  //       type: "new",
  //       var: "tx",
  //       mod: "Transaction",
  //       fn: [
  //         {
  //           fn: "sendLovelace",
  //           val: [
  //             "addr_test1vpvx0sacujd8d54j3oddgk7q40zc5c4npl337uusdh64kv0c7e4cxr",
  //             "17000000",
  //           ],
  //         },
  //         {
  //           fn: "sendLovelace",
  //           val: [
  //             {
  //               type: "fn",
  //               var: "koios",
  //               fn: "fetchHandleAddress",
  //               val: ["alice"],
  //             },
  //             "23000000",
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   prompt:
  //     "Create a transaction to send 1 64af286e2ad0df4de2e7de15f8ff5b3d27faecf4ab2757056d860a424d657368546f6b656e to addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4npl337uushd378h387hd",
  //   completion: [
  //     {
  //       type: "new",
  //       var: "tx",
  //       mod: "Transaction",
  //       fn: [
  //         {
  //           fn: "sendAssets",
  //           val: [
  //             "addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4npl337uushd378h387hd",
  //             [
  //               {
  //                 unit: "64af286e2ad0df4de2e7de15f8ff5b3d27faecf4ab2757056d860a424d657368546f6b656e",
  //                 quantity: "1",
  //               },
  //             ],
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   prompt:
  //     "Create a transaction to send 8 64af286e2ad0df4de29d7dhd7sh5b3d27faecf4ab2757056d860a424d657368546f6b656e, 99 applejuice7c8h38d3gc763vc83, and 23 ADA to addr_0dks0dskh3fuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr",
  //   completion: [
  //     {
  //       type: "new",
  //       var: "tx",
  //       mod: "Transaction",
  //       fn: [
  //         {
  //           fn: "sendLovelace",
  //           val: [
  //             "addr_0dks0dskh3fuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr",
  //             "1000000",
  //           ],
  //         },
  //         {
  //           fn: "sendAssets",
  //           val: [
  //             "addr_0dks0dskh3fuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr",
  //             [
  //               {
  //                 unit: "64af286e2ad0df4de29d7dhd7sh5b3d27faecf4ab2757056d860a424d657368546f6b656e",
  //                 quantity: "8",
  //               },
  //               {
  //                 unit: "applejuice7c8h38d3gc763vc83",
  //                 quantity: "99",
  //               },
  //             ],
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   prompt:
  //     "Create a transaction to send 11 j93jc393j9c3j9j39j938jd3 to addr_0dks0dskh3fuypa2k4sngdh38h83h37 and 33 89jx01jd7h9823c298jc3 to addr_j829jd2hg85h93h",
  //   completion: [
  //     {
  //       type: "new",
  //       var: "tx",
  //       mod: "Transaction",
  //       fn: [
  //         {
  //           fn: "sendAssets",
  //           val: [
  //             "addr_0dks0dskh3fuypa2k4sngdh38h83h37",
  //             [
  //               {
  //                 unit: "j93jc393j9c3j9j39j938jd3",
  //                 quantity: "11",
  //               },
  //             ],
  //           ],
  //         },
  //         {
  //           fn: "sendAssets",
  //           val: [
  //             "addr_j829jd2hg85h93h",
  //             [
  //               {
  //                 unit: "89jx01jd7h9823c298jc3",
  //                 quantity: "33",
  //               },
  //             ],
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   prompt:
  //     "Create a transaction to send 1 ADA to addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr",
  //   completion:
  //     "```import { Transaction } from '@meshsdk/core';\n\nconst tx = new Transaction({ initiator: wallet })\n  .sendLovelace(\n    'addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr',\n    '1000000'\n  )\n;\n\nconst unsignedTx = await tx.build();\nconst signedTx = await wallet.signTx(unsignedTx);\nconst txHash = await wallet.submitTx(signedTx);```",
  // },
  // {
  //   prompt:
  //     "Create a transaction to send 10 ADA to addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr and 9 ADA to addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4n2dj02j9d0e9jd9edjs09j9",
  //   completion:
  //     "```import { Transaction } from '@meshsdk/core';\n\nconst tx = new Transaction({ initiator: wallet })\n  .sendLovelace(\n    'addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr',\n    '10000000'\n  )\n  .sendLovelace(\n    'addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4n2dj02j9d0e9jd9edjs09j9',\n    '9000000'\n  )\n;\n\nconst unsignedTx = await tx.build();\nconst signedTx = await wallet.signTx(unsignedTx);\nconst txHash = await wallet.submitTx(signedTx);```",
  // },
  // {
  //   prompt:
  //     "Create a transaction to send 30, 50, and 90 ADA to addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr, addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4n2dj02j9d0e9jd9edjs09j9 and addr_test1vshds8dhs8db638he3e3h83he38hdsidsd8duusdh64kv0c7e4cxr respectively",
  //   completion:
  //     "```import { Transaction } from '@meshsdk/core';\n\nconst tx = new Transaction({ initiator: wallet })\n  .sendLovelace(\n    'addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr',\n    '30000000'\n  )\n  .sendLovelace(\n    'addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4n2dj02j9d0e9jd9edjs09j9',\n    '50000000'\n  )\n  .sendLovelace(\n    'addr_test1vshds8dhs8db638he3e3h83he38hdsidsd8duusdh64kv0c7e4cxr',\n    '90000000'\n  )\n;\n\nconst unsignedTx = await tx.build();\nconst signedTx = await wallet.signTx(unsignedTx);\nconst txHash = await wallet.submitTx(signedTx);```",
  // },
  // {
  //   prompt: "Create a transaction to send 50 ADA to $jingles",
  //   completion:
  //     "```import { KoiosProvider, Transaction } from '@meshsdk/core';\n\nconst koios = new KoiosProvider('api');\n\nconst tx = new Transaction({ initiator: wallet })\n  .sendLovelace(\n    await koios.fetchHandleAddress('jingles'),\n    '50000000'\n  );\n\nconst unsignedTx = await tx.build();\nconst signedTx = await wallet.signTx(unsignedTx);\nconst txHash = await wallet.submitTx(signedTx);```",
  // },
  // {
  //   prompt:
  //     "Create a transaction to send 17 ADA to addr_test1vpvx0sacujd8d54j3oddgk7q40zc5c4npl337uusdh64kv0c7e4cxr and 23 ADA to $alice",
  //   completion:
  //     "```import { KoiosProvider, Transaction } from '@meshsdk/core';\n\nconst koios = new KoiosProvider('api');\n\nconst tx = new Transaction({ initiator: wallet })\n  .sendLovelace(\n    'addr_test1vpvx0sacujd8d54j3oddgk7q40zc5c4npl337uusdh64kv0c7e4cxr',\n    '17000000'\n  )\n  .sendLovelace(\n    await koios.fetchHandleAddress('alice'),\n    '23000000'\n  );\n\nconst unsignedTx = await tx.build();\nconst signedTx = await wallet.signTx(unsignedTx);\nconst txHash = await wallet.submitTx(signedTx);```",
  // },
  // {
  //   prompt:
  //     "Connect wallet user interface to allow the user to select a wallet to connect to your dApp",
  //   completion:
  //     "```import { CardanoWallet } from '@meshsdk/react';\n\nexport default function Page() {\n  return (\n    <>\n      <CardanoWallet />\n    </>\n  );\n}```",
  // },
  // {
  //   prompt:
  //     "Create a transaction to send 1 64af286e2ad0df4de2e7de15f8ff5b3d27faecf4ab2757056d860a424d657368546f6b656e to addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr",
  //   completion:
  //     "```import { Transaction } from '@meshsdk/core';\n\nconst tx = new Transaction({ initiator: wallet })\n  .sendAssets(\n    'addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr',\n    [\n      {\n        unit: '64af286e2ad0df4de2e7de15f8ff5b3d27faecf4ab2757056d860a424d657368546f6b656e',\n        quantity: '1',\n      },\n    ]\n  );\n\nconst unsignedTx = await tx.build();\nconst signedTx = await wallet.signTx(unsignedTx);\nconst txHash = await wallet.submitTx(signedTx);```",
  // },
  // {
  //   prompt:
  //     "Create a transaction to send 8 64af286e2ad0df4de29d7dhd7sh5b3d27faecf4ab2757056d860a424d657368546f6b656e and 23 ADA to addr_0dks0dskh3fuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr",
  //   completion:
  //     "```import { Transaction } from '@meshsdk/core';\n\nconst tx = new Transaction({ initiator: wallet })\n  .sendLovelace(\n    'addr_0dks0dskh3fuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr',\n    '23000000'\n  )\n  .sendAssets(\n    'addr_0dks0dskh3fuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr',\n    [\n      {\n        unit: '64af286e2ad0df4de29d7dhd7sh5b3d27faecf4ab2757056d860a424d657368546f6b656e',\n        quantity: '8',\n      },\n    ]\n  );\n\nconst unsignedTx = await tx.build();\nconst signedTx = await wallet.signTx(unsignedTx);\nconst txHash = await wallet.submitTx(signedTx);```",
  // },
  // {
  //   prompt: "What is Cardano?",
  //   completion:
  //     "Cardano blockchain, a first-of-its-kind decentralised network based completely on scientific and mathematical principles and designed by experts in cryptography and engineering.",
  // },
  // {
  //   prompt: "Who created Mesh? When was it started?",
  //   completion:
  //     "Jingles and Abdelkrim started Mesh development in July 2022. First version was released on 22 Sept 2022.",
  // },
  // {
  //   prompt: "What is Mesh?",
  //   completion:
  //     "Mesh is an open-source library providing numerous tools to easily build dApps on the Cardano blockchain.",
  // },
  // {
  //   prompt: "Developer tool for Cardano?",
  //   completion:
  //     "Get started building blockchain applications with enterprise-ready, well engineered, and professionally designed SDK, Mesh.",
  // },
];

export async function createCompletion(prompt, sources = []) {
  let startPrompt = `Q: `;
  let endPrompt = `##\n`;
  let startCompletion = `A: `;
  let endCompletion = `###\n\n`;

  let thisPrompt = `I am a highly intelligent question answering bot for any questions about Cardano. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with "Not sure".`;
  thisPrompt += "\n\n";

  for (let i in sources) {
    let sample = sources[i];
    //@ts-ignore
    thisPrompt += `${startPrompt}${sample.q}${endPrompt}`;
    //@ts-ignore
    thisPrompt += `${startCompletion}${sample.a}${endCompletion}`;
  }

  thisPrompt += `${startPrompt}${prompt}${endPrompt}`;
  thisPrompt += `${startCompletion}`;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: thisPrompt,
    temperature: 0.3,
    max_tokens: 512,
    stop: endCompletion,
  });

  if (response.data.choices.length > 0) {
    let responseMessage = response.data.choices[0].text;

    if (responseMessage) {
      responseMessage = responseMessage.trim();
      if (responseMessage === "Not sure.") {
        return {
          success: false,
        };
      } else {
        return {
          success: true,
          data: responseMessage,
        };
      }
    }
  } else {
    return {
      success: false,
    };
  }
}
