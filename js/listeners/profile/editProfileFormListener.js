import { displayMessage } from "../../ui/common/displayMessage.js";
import { getToken, getUsername } from "../../utils/storage.js";
import { validateEditProfileForm } from "../../utils/validation.js";
import { mapListFormToApi } from "../../utils/structureObj.js";
import { updateListing } from "../../api/profile/updateList.js";
import { updateProfile } from "../../api/profile/updateProfile.js";

export async function editProfileFormListener(e) {
  e.preventDefault();
  const userName = getUsername();
  const userToken = getToken();
  if (!userName || !userToken) return;

  const messageContainer = document.querySelector("#message-container");
  const form = document.querySelector("#editProfileForm");
  const avatarUrlEl = document.querySelector("#avatar");
  const bannerUrlEl = document.querySelector("#banner");
  const nameEl = document.querySelector("#name");
  const emailEl = document.querySelector("#email");
  const bioEl = document.querySelector("#bio");
  const fieldset = form.querySelector("fieldset");
  const submitBtn = form.querySelector("button[type='submit']");

  const profile = {
    name: nameEl.value,
    email: emailEl.value,
    bio: bioEl.value,
    avatar: {
      url: avatarUrlEl.value,
      alt: "Updated profile avatar",
    },
    banner: {
      url: bannerUrlEl.value,
      alt: "Updated profile banner",
    },
  };

  const validation = validateEditProfileForm(
    profile.name,
    profile.bio,
    profile.email,
    profile.avatar.url,
    profile.banner.url,
  );

  if (!validation.isValid) {
    const errHTML = validation.errors
      .map((e) => `<p class="text-red-500">${e}</p>`)
      .join("");
    displayMessage(messageContainer, "error", errHTML);
    return;
  }

  fieldset.disabled = true;
  submitBtn.textContent = "Saving...";

  try {
    await updateProfile({ name: userName, token: userToken }, profile);

    window.location.href = "/profile/";
  } catch (error) {
    displayMessage(messageContainer, "error", error.message);
  } finally {
    fieldset.disabled = false;
    submitBtn.textContent = "Save List";
  }
}
