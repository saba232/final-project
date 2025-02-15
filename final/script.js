fetch("https://btu-ex-2025-0bf797fecbae.herokuapp.com/news")
  .then((response) => response.json())
  .then((newsData) => {
    const tableBody = document.getElementById("news-table-body");

    if (Array.isArray(newsData) && newsData.length > 0) {
      newsData.forEach((item, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${item.id}</td>
          <td>${item.title}</td>
          <td>${item.category}</td>
          <td>${item.editorFirstName}</td>
          <td>${item.editorLastName}</td>
          <td>${item.description}</td>
          <td class="buttonWrapper">
            <button class="delete-btn" onclick="deleteNewsItem('${item.id}', this)">Delete</button>
            <button class="update-btn" onclick="window.location.href='create.html?id=${item.id}';">Update</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    } else {
      tableBody.innerHTML = `<tr><td colspan="7" style="text-align: center;">No news available</td></tr>`;
    }
  })
  .catch((error) => {
    console.error("Error fetching the data:", error);
  });

function deleteNewsItem(id, btn) {
  fetch(`https://btu-ex-2025-0bf797fecbae.herokuapp.com/news/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        btn.closest("tr").remove();
        alert("News item deleted successfully.");
      } else {
        throw new Error("Failed to delete the news item.");
      }
    })
    .catch((error) => {
      console.error("Error deleting news item:", error);
      alert("Error deleting the news item. Please try again later.");
    });
}
