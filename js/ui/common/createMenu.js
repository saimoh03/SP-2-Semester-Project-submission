import { getProfile } from "../../api/profile/fetchProfile.js";
import { clearStorage, getToken, getUsername } from "../../utils/storage.js";

export async function createMenu() {
  const container = document.querySelector("#menu-container");
  if (!container) return;
  const username = getUsername();
  const userToken = getToken();
  let credits = 0;
  try {
    if (username && userToken) {
      const { data } = await getProfile({ name: username, token: userToken });
      credits = data?.credits || 0;
    }
  } catch (error) {
    console.error("Profile fetch failed:", error);
  }

  if (username) {
    container.innerHTML = `
      <nav class="flex justify-between items-center p-0 md:p-4 bg-[#F5F5F5]">
        <div class="flex items-center space-x-4">
          <a href="/" class="text-black hover:text-[#005674] py-2 px-3 font-medium transition-colors duration-200 ">
            <img src="../../../assets/auction_logo.png" width="70px" height="auto" />
          </a>
        </div>
        <div class="flex items-center space-x-4 text-sm">
          <span class="text-black mr-4">Credits: <span class="text-red-500 mr-4">${credits}</span></span>
          <span class="text-black mr-4">Hi ${username}</span>
          <a href="/profile/" class="hover:bg-gray-200 text-black ring-1 ring-black font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200">
            Profile
          </a>
          <button id="logoutButton" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200">
            Logout
          </button>
        </div>
      </nav>
    `;
  } else {
    container.innerHTML = `
      <nav class="flex justify-between items-center p-0 md:p-4 bg-[#F5F5F5]">
        <div class="flex items-center space-x-4">
          <a href="/" class="text-black hover:text-[#005674] py-2 px-3 font-medium transition-colors duration-200 ">
            <img src="../../../assets/auction_logo.png" width="70px" height="auto" />
          </a>
        </div>
        <div class="flex items-center space-x-4">
          <a href="/login" class="text-[#555555] hover:text-[#005674] py-2 px-3 font-medium transition-colors duration-200 ">Sign in</a>
          <a href="/register" class="text-white rounded bg-[#005674] py-1 px-4 font-medium transition-colors duration-200 ">Sign up</a>
        </div>
      </nav>
    `;
  }
}
