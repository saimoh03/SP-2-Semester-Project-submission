import { deleteListBtnListener } from "../../listeners/list/deleteListBtnListener.js";

export function ownerActions(leftContent, id) {
  const ownerActions = document.createElement("div");
  ownerActions.className = "flex gap-4 mt-4 mb-3";

  const editBtn = document.createElement("button");
  editBtn.className = "px-4 py-1 bg-yellow-500 text-white rounded";
  editBtn.textContent = "Edit";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "px-4 py-1 bg-red-600 text-white rounded";
  deleteBtn.textContent = "Delete";

  editBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = `/updateList/?id=${id}`;
  });

  deleteBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this listing?")) {
      await deleteListBtnListener(id);
    }
  });

  ownerActions.appendChild(editBtn);
  ownerActions.appendChild(deleteBtn);
  leftContent.appendChild(ownerActions);
}
