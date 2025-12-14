import { CONFIG } from "../../config.js";

export async function getMyListing(user) {
  const url = `${CONFIG.apiUrl}profiles/${user.name}/listings`;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
      "X-Noroff-API-Key": CONFIG.apiKey,
    },
  };

  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Login failed");
  }

  return json;
}
