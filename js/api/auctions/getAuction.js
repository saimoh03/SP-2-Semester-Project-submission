import { CONFIG } from "../../config.js";

export async function getAuction(id) {
  if (!id) {
    throw new Error("No id provided");
  }

  const url = `${CONFIG.apiUrl}listings/${id}?_seller=true&_bids=true`;

  const response = await fetch(url);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Fetching auction failed");
  }

  return json;
}
