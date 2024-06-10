const app = document.querySelector('#grid-Container');

const favMovies = [
  {
    id: 1,
    title: 'THE UNCHARTED',
    release_year: '18th feb 2022',
    starring: 'Tom Holland',
    duration: '1hr 56m',
    image: './assests/theuncharted.jpg',
  },
  {
    id: 2,
    title: 'SPIDERMAN HOMECOMING',
    release_year: '17th dec 2021',
    starring: 'Tom Holland, Tobey Maguire, Andrew Garfield',
    duration: '2hr 28m',
    image: './assests/spidermannowahome.jpg',
  },
];

//To create a single movie card
const appendToApp = (movie) => {
  for (let i = 0; i < movie.length; i++) {
    console.log(movie[i]);
    movieCard(movie[i]);
  }
};
appendToApp(favMovies);
//To create a HTML card
function movieCard(m) {
  const movie_card = document.createElement('div');
  movie_card.setAttribute('class', 'grid-box');

  const div1 = document.createElement('div');
  const div2 = document.createElement('div');
  div2.setAttribute('class', 'info-tag');

  const img = document.createElement('img');
  img.setAttribute('class', 'img-tag');
  img.setAttribute('alt', 'Uncharted');
  img.setAttribute('src', `${m['image']}`);

  const title = document.createElement('p');
  title.setAttribute('class', 'title');
  title.innerText = `${m['title']}`;

  const date = document.createElement('p');
  date.innerText = `date: ${m['release_year']}`;
  const starring = document.createElement('p');
  starring.innerText = `starring: ${m['starring']} `;

  const duration = document.createElement('p');
  duration.innerText = `duration: ${m['duration']} `;

  app.appendChild(movie_card);
  movie_card.append(div1, div2);
  div1.appendChild(img);
  div2.append(title, date, starring, duration);
}
