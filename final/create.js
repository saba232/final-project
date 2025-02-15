const urlParams = new URLSearchParams(window.location.search);
const newsId = urlParams.get("id");

if (newsId) {
  fetch(`https://btu-ex-2025-0bf797fecbae.herokuapp.com/news/${newsId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch news item");
      }
      return response.json();
    })
    .then((newsItem) => {
      document.getElementById("title").value = newsItem.title;
      document.getElementById("description").value = newsItem.description;
      document.getElementById("category").value = newsItem.category;
      document.getElementById("editorFirstName").value =
        newsItem.editorFirstName;
      document.getElementById("editorLastName").value = newsItem.editorLastName;
    })
    .catch((error) => {
      console.error("Error fetching news item:", error);
      alert("Failed to fetch news item. Please try again later.");
    });
}

document
  .getElementById("create-news-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const editorFirstName = document.getElementById("editorFirstName").value;
    const editorLastName = document.getElementById("editorLastName").value;

    const newsData = {
      title,
      description,
      category,
      editorFirstName,
      editorLastName,
    };

    const url = newsId
      ? `https://btu-ex-2025-0bf797fecbae.herokuapp.com/news/${newsId}`
      : "https://btu-ex-2025-0bf797fecbae.herokuapp.com/news";

    const method = newsId ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newsData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save news item");
        }
        return response.json();
      })
      .then((data) => {
        alert(`News item ${newsId ? "updated" : "created"} successfully!`);
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.error(
          `Error ${newsId ? "updating" : "creating"} news item:`,
          error
        );
        alert(
          `Failed to ${
            newsId ? "update" : "create"
          } news item. Please try again later.`
        );
      });
  });
