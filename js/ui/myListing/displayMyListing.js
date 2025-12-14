import { getMyListing } from "../../api/profile/fetchMyListing.js";
import { getProfile } from "../../api/profile/fetchProfile.js";
import { getAuctions } from "../../api/auctions/getAuctions.js";
import {
  createNewListListener,
  myProfileListener,
} from "../../listeners/profile/buttonListeners.js";
import { getToken, getUsername } from "../../utils/storage.js";
import { displayMessage } from "../common/displayMessage.js";
import { renderAuctionList } from "../auctions/renderAuctionList.js";

export async function displayMyListing() {
  if (!getUsername() || !getToken()) {
    window.location.href = "/login";
    return;
  }
  // const profileData = await getProfile({ name: getUsername(), token: getToken() });
  // const { name, email, avatar, credits, wins } = profileData;
  // document.querySelector("#user-name").textContent = name;

  const totalLists = document.querySelector("#total-lists");
  const container = document.querySelector("#listing-container");
  try {
    const { data } = await getMyListing({
      name: getUsername(),
      token: getToken(),
    });
    totalLists.textContent = `Total (${data.length})`;
    renderAuctionList(container, data, getUsername());
  } catch (error) {
    console.log(error);
    displayMessage(container, "error", error.message);
  }

  myProfileListener();
  createNewListListener();
}
