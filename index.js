const apikey = "fbc52c2ca9624b2f9fd48207868684e6";

const blogContainer = document.getElementById("block-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");

async function fetchRandomNews() {
  try {
    const apiUrl = `
    
https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=fbc52c2ca9624b2f9fd48207868684e6&pageSize=10&apikey=${apikey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Something Erorr In API Calling Try Again Later", error);
    return [];
  }
}

searchButton.addEventListener("click", async () => {
  const query = searchField.value.trim();
  if (query !== "") {
    try {
      const articles = await fetchNewsQuery(query);
      displayBlogs(articles);
    } catch (error) {
      console.log("Erorr fetching news by query", error);
    }
  }
});

async function fetchNewsQuery(query) {
  try {
    const apiUrl = `
    
    https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apikey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Something Erorr In API Calling Try Again Later", Error);
    return [];
  }
}

function displayBlogs(articles) {
  blogContainer.innerHTML = "";
  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;
    const title = document.createElement("h2");
    const TrancatedTitle =
      article.title.length > 30
        ? article.title.slice(0, 30) + "....."
        : article.title;

    title.textContent = TrancatedTitle;
    const description = document.createElement("p");
    const TruncatedDes =
      article.description.length > 100
        ? article.description.slice(0, 100) + "....."
        : article.description;
    description.textContent = TruncatedDes;

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });
    blogContainer.appendChild(blogCard);
  });
}

const callMethod = async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (Erorr) {
    console.error("Something Erorr In API Calling Try Again Later", Error);
  }
};

callMethod();
