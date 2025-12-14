import { CONFIG } from "../../config.js";

export async function register(user) {
  const url = `${CONFIG.authUrl}register`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error("Sorry, sign up failed.");
  }

  return json;
}
