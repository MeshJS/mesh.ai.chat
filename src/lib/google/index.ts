import { GOOGLE } from "../../config/google";
import { get } from "../../lib/axios";

async function query({ q }: { q: string }) {
  return await get(
    `https://www.googleapis.com/customsearch/v1?key=${GOOGLE.key}&cx=017576662512468239146:omuauf_lfve&cx=65b4c21458d534c1a&q=${q}%2Bcardano`
  );
}

function cleanText(t) {
  t = t.replace(/(?:\\[rn])+/g, "");
  t = t.replace(/(<([^>]+)>)/gi, "");
  return t;
}

export async function googleQuery(
  queryText
): Promise<{ title: string; description: string; link: string }[]> {
  const res = await query({ q: queryText });

  let results = [];

  try {
    if (res.status == 200) {
      for (let i in res.data.items) {
        if (parseInt(i) >= GOOGLE.queryLimit) break;

        let item = res.data.items[i];

        let descriptionText = "";
        if (item?.pagemap?.metatags && item?.pagemap?.metatags[0]) {
          if (item?.pagemap?.metatags[0]["og:description"]) {
            descriptionText += `${item?.pagemap?.metatags[0]["og:description"]} `;
          }
        }
        if (item.snippet.includes("...")) {
          let snippetArray = item.snippet.split("...");
          if (snippetArray.length == 3) {
            descriptionText += `${snippetArray[1].trim()} `;
          } else if (snippetArray.length == 2 && snippetArray[0].length == 13) {
            descriptionText += `${snippetArray[1].trim()} `;
          } else {
            descriptionText += `${item.snippet} `;
          }
        } else {
          descriptionText += `${item.snippet} `;
        }

        let result = {
          title: `${item.title}`,
          description: cleanText(descriptionText),
          link: item.link,
        };
        //@ts-ignore
        results.push(result);
      }
    }
  } catch (error) {
    console.error("Error in googleQuery: ", error);
  }

  return results;
}
