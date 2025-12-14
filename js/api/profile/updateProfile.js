import { CONFIG } from "../../config.js";

export async function updateProfile(user, profile) {
  const url = `${CONFIG.apiUrl}profiles/${user.name}`;

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
      "X-Noroff-API-Key": CONFIG.apiKey,
    },
    body: JSON.stringify(profile),
  };

  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Update failed");
  }

  return json;
}
