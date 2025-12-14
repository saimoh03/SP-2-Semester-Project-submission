import { updateProfile } from "../../api/profile/updateProfile.js";
import { getToken, getUsername } from "../../utils/storage.js";

export function myProfileListener() {
  const myProfileBtn = document.querySelector("#myProfile");

  if (myProfileBtn) {
    myProfileBtn.addEventListener("click", () => {
      window.location.href = "/profile/";
    });
  }
}

export function myListingsListener() {
  const myListingBtn = document.querySelector("#myListings");

  if (myListingBtn) {
    myListingBtn.addEventListener("click", () => {
      window.location.href = "/myListing";
    });
  }
}

export function createNewListListener() {
  const myListingBtn = document.querySelector("#createNewList");

  if (myListingBtn) {
    myListingBtn.addEventListener("click", () => {
      window.location.href = "/createList";
    });
  }
}

export function updateBannerBtn() {
  const updateBannerBtn = document.querySelector("#updateBannerBtn");
  const newBanner = document.querySelector("#editBanner");

  if (updateBannerBtn) {
    updateBannerBtn.addEventListener("click", async () => {
      await updateProfile(
        { name: getUsername(), token: getToken() },
        {
          banner: {
            url: newBanner.value,
            alt: "User updated banner",
          },
        },
      );
      window.location.reload();
    });
  }
}
