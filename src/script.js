const apiKey = '1da1496c';
const yandexkey = 'trnsl.1.1.20200516T151204Z.8b71c6d9448d5f35.a3de40a16501e96f82831f4502cc525c6b7f93de';
const div = document.querySelector('.swiper-wrapper');
const totalResult = document.querySelector('.total-results');
let page = 1;
let movie = 'hobbit';
const info = document.querySelector('.info');
const xhr = new XMLHttpRequest();
const preloader = document.querySelector('.loader');

async function getMovieDetails(imdbID) {
  const url2 = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;
  const response = await fetch(url2);
  if (!response.ok) {
    console.log(`Looks like there was a problem. Status Code: ${response.status}`);
    return false;
  }
  return await response.json();
}

async function search(searchString, page) {
  const url = `https://www.omdbapi.com/?s=${searchString}&page=${page}&apikey=${apiKey}&type=movie`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(`Looks like there was a problem. Status Code: ${response.status}`);
      return false;
    }
    const data = await response.json();
    data.Search = await Promise.all(data.Search.map((movie) => getMovieDetails(movie.imdbID)));
    //  await Promise.all(data.Search.map( ({imdbID}) => getMovieDetails(imdbID)));
    // пример
    // function loadDetails(movie) {
    //     return getMovieDetails(movie.imdbID);
    //   }
    //   data.Search.map(loadDetails);
    console.log(data);
    return data;
  } catch (e) {
    info.innerText = 'Movie not found!';
    totalResult.innerHTML = '<p>Total Results: 0</p>';
    preloader.classList.add('done');
  }
}

async function renderSlider(str, page) {
  const data = await search(str, page);
  const listHTML = `<p>Total Results: ${data.totalResults}</p>`;
  totalResult.innerHTML = listHTML;
  render(data.Search);
}

async function addMoreSliders(str, page, swiper) {
  const data2 = await search(str, page);
  const listHTML = data2.Search.map(createMovieCard);
  div.innerHTML += listHTML.join('');
  swiper.update();
}

renderSlider(movie, page);


// function search2(searchString, page) {
//     const url = `https://www.omdbapi.com/?s=${searchString}&page=${page}&apikey=${apiKey}`;
// return fetch(url)
// .then(
//     function(response) {
//         if (!response.ok) {
//             console.log(`Looks like there was a problem. Status Code: ${response.status}`);
//             throw Error('error');
//         }
//         return response.json();
//     }
// )
// .then(
//     function(data) {

//         return Promise.all(data.Search.map( movie => getMovieDetails(movie.imdbID)))
//             .then(
//                 function(promiseRes){
//                     data.Search = promiseRes;
//                     return data;
//                 }
//             )
// })
// };

function render(config) {
  const listHTML = config.map(createMovieCard);
  div.innerHTML = listHTML.join('');
  createSlider();
}

function createMovieCard({
  imdbID, Title, Poster, Year, imdbRating,
}) {
  if (Poster === 'N/A') {
    return `<div class="swiper-slide"><a class="card-header" href="https://www.imdb.com/title/${imdbID}/" 
    target="_blank">${Title}</a><img class="movie-img" src="src/assets/noPoster.png" alt="7" width="300" height="470">
    <div class="card-footer">${Year}</div><div class="imdb-rating"><span>${imdbRating}</span></div></div>`;
  }
  return `<div class="swiper-slide"><a class="card-header" href="https://www.imdb.com/title/${imdbID}/" 
    target="_blank">${Title}</a><img class="movie-img" src="${Poster}" alt="7" width="300" height="470">
    <div class="card-footer">${Year}</div><div class="imdb-rating"><span>${imdbRating}</span></div></div>`;
}

const total = function getAmountOfAllMovies() {
  const amountOfFilms = document.querySelector('.total-results').firstElementChild.innerText.split(' ');
  return amountOfFilms[2];
};

function createSlider() {
  mySwiper.update();
  // if(mySwiper.slides.length <= 10){
  preloader.classList.add('done');
  // }
  mySwiper.on('slideChange', () => {
    const moviesOnThePage = Array.from(mySwiper.slides).length;
    if (moviesOnThePage < total()) {
      if (mySwiper.activeIndex >= (moviesOnThePage - 5)) {
        addMoreSliders(movie, ++page, mySwiper);
      }
    }
  });
}

document.querySelector('.search-btn').addEventListener('click', (event) => {
  logicForSearch();
});

document.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    logicForSearch();
  }
});

document.querySelector('.clear').addEventListener('click', (event) => {
  document.querySelector('.search-input').value = '';
  info.innerText = '';
});

async function translate(string) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${yandexkey}&text=${string}&lang=ru-en`;
  const response = await fetch(url);
  const data = await response.json();
  data1 = await data.text[0];
  info.innerText = `Showing results for ${data1}`;
  return data1;
}

async function logicForSearch() {
  preloader.classList.remove('done');
  page = 1;
  info.innerText = '';
  const { value } = document.querySelector('.search-input');
  // value = translate(value);
  if (value.length === 0) {
    info.innerText = 'Please type movie title';
  } else if (value.length <= 3) {
    info.innerText = 'Movie title should be longer than 3 letters';
  } else {
    movie = await translate(value);
    mySwiper.detachEvents();
    mySwiper.slideTo(1, false);
    renderSlider(movie, page);
  }
}


document.querySelector('.keyboard').addEventListener('click', (event) => {
  document.querySelector('.full-keyboard').classList.toggle('visible-keyboard');
});
