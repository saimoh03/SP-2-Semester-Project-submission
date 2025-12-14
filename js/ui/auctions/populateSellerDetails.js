export function populateSellerDetails(auctionItem) {
  const seller = auctionItem.seller;

  document.querySelector("#seller-avatar").src = seller.avatar.url;
  document.querySelector("#seller-avatar").alt = seller.name;
  document.querySelector("#seller-name").textContent = seller.name;
  document.querySelector("#seller-email").textContent = seller.email;

  document.querySelector("#seller-bio").textContent =
    auctionItem.description?.slice(0, 60) + "..." || "No bio available";

  // document.querySelector("#seller-wins").textContent = `${seller.wins.length} wins`;
}
