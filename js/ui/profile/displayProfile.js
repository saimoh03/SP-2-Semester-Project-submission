import { getProfile } from "../../api/profile/fetchProfile.js";
import {
  myListingsListener,
  updateBannerBtn,
} from "../../listeners/profile/buttonListeners.js";
import { getToken, getUsername } from "../../utils/storage.js";

export async function displayProfile() {
  if (!getUsername() || !getToken()) {
    window.location.href = "/login";
    return;
  }
  const { data } = await getProfile({ name: getUsername(), token: getToken() });
  const { name, email, avatar, credits, wins, bio, banner } = data;

  document.querySelector("#user-name").textContent = name;
  document.querySelector("#user-email").textContent = email;
  document.querySelector("#user-credits").innerHTML =
    `${credits?.toLocaleString()} <span class="text-[#707070]">Credits</span>`;
  document.querySelector("#user-wins").textContent = `${wins?.length} wins`;
  document.querySelector("#profile-cover").src = banner.url;
  document.querySelector("#profile-cover").alt = banner.alt || "profile cover";
  document.querySelector("#user-avatar").src = avatar.url;
  document.querySelector("#user-avatar").alt = avatar.alt || "avatar";
  document.querySelector("#user-bio").textContent =
    bio?.trim() || "No bio added.";

  myListingsListener();
  updateBannerBtn();
}
