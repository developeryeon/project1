//API
// import { apiKey, accessToken } from "../src/config.js";

const apiKey = config.apiKey;
const accessToken = config.accessToken;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${accessToken}`
  }
};

let url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${apiKey}`;

let theMoviedbMovieList;

function getMovieList() {
  fetch(url, options)
    .then(res => res.json())
    .then(data => {
      theMoviedbMovieList = data.results;

      showCard(theMoviedbMovieList);
    })
    .catch(err => console.error(err));
}

// 검색 영화만 띄워질 수 있게
function searchMovie(val) {
  //includes 가 아무것도 적지않았을 때 항상 공백을 true를 반환한다. indexOf를 쓰는게 더 좋다.
  const filterMovies = theMoviedbMovieList.filter(movies => movies["title"].toLowerCase().includes(val.toLowerCase()));
  console.log(filterMovies);
  showCard(filterMovies);
}

// 영화 카드 표시
function showCard(movies) {
  let movieCard = document.getElementById("movies_card");
  const searchBox = document.querySelector("#searchBox");
  const searchBtn = document.querySelector("#searchBtn");

  document.getElementById("movies_card");

  movieCard.innerHTML = "";

  movies.forEach(e => {
    let id = e["id"];
    let title = e["title"];
    let overView = e["overview"];
    let poster_path = e["poster_path"];
    let vote_average = e["vote_average"];
    let release_date = e["release_date"];

    const wrapCards = document.createElement("div");
    wrapCards.setAttribute("class", "wrap_cards");

    // wrap_cards 안에 html 넣기
    wrapCards.innerHTML = `
				<img src="https://image.tmdb.org/t/p/w500${poster_path}" class="card-img" onclick="alert('영화 id : ' + ${id})" />
				<h2 class="card-title" id="cardTitle" >${title}</h2>
				<h4 class="card-overview tag_hide" id="text_show">${overView}</h4>
				<p class="vote-average">${vote_average}</p>
				<p class="release-date">${release_date}</p>`;

    // title 클릭하면 내용 overview 보일 수 있게
    let cardTitle = wrapCards.querySelector("#cardTitle");

    cardTitle.addEventListener("click", () => {
      let textShow = wrapCards.querySelector("#text_show");
      overViewToggle(textShow);
    });

    movieCard.appendChild(wrapCards);
  });
}

function overViewToggle(textShow) {
  textShow.classList.toggle("tag_hide");
}

window.addEventListener("load", () => {
  getMovieList();

  //input 창에 focus
  searchBox.focus();

  // 검색창에 입력하고 버튼 클릭하면 함수 searchMovie 실행
  searchBtn.addEventListener("click", e => {
    //유효성검사
    if (searchBox.value == "") {
      alert("검색어를 입력하세요");
    }
    //새로고침
    e.preventDefault();

    const val = searchBox.value;
    searchMovie(val);
  });
});
