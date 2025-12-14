import { CONFIG } from "../../config.js";

export async function getAuctions() {
  const url = `${CONFIG.apiUrl}listings`;

  const response = await fetch(url);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Fetching auctions failed");
  }

  return json;
}
