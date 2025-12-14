import { displayMessage } from "../../ui/common/displayMessage.js";
import { getListById } from "../../api/profile/fetchListById.js";
import { updateListFormListener } from "../../listeners/list/updateListFormListener.js";
import { getProfile } from "../../api/profile/fetchProfile.js";
import { getToken, getUsername } from "../../utils/storage.js";
import { editProfileFormListener } from "../../listeners/profile/editProfileFormListener.js";

export async function handleEditProfile() {
  const userName = getUsername();
  const userToken = getToken();
  if (!userName || !userToken) window.location.href = "/login.html";

  const messageContainer = document.querySelector("#message-container");
  const form = document.querySelector("#editProfileForm");

  const avatarUrlEl = document.querySelector("#avatar");
  const bannerUrlEl = document.querySelector("#banner");
  const nameEl = document.querySelector("#name");
  const emailEl = document.querySelector("#email");
  const bioEl = document.querySelector("#bio");

  try {
    const { data } = await getProfile({ name: userName, token: userToken });

    nameEl.value = data.name;
    emailEl.value = data.email;
    avatarUrlEl.value = data?.avatar?.url || "";
    bannerUrlEl.value = data?.banner?.url || "";
    bioEl.value = data.bio || "";
  } catch (error) {
    displayMessage(messageContainer, "error", "Failed to load listing.");
    return;
  }

  form.addEventListener("submit", editProfileFormListener);
}
