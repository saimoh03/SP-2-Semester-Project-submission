import { deleteListing } from "../../api/profile/deleteMyList.js";
import { getToken } from "../../utils/storage.js";

export async function deleteListBtnListener(id) {
  await deleteListing(id, getToken());
  window.location.href = "/myListing";
}
