const app = document.querySelector('#grid-Container');

let favMovies = [
  // {
  //   id: 1,
  //   title: 'THE UNCHARTED',
  //   release_year: '18th feb 2022',
  //   starring: 'Tom Holland',
  //   duration: '1hr 56m',
  //   image: './assests/theuncharted.jpg',
  // },
  // {
  //   id: 2,
  //   title: 'SPIDERMAN HOMECOMING',
  //   release_year: '17th dec 2021',
  //   starring: 'Tom Holland, Tobey Maguire, Andrew Garfield',
  //   duration: '2hr 28m',
  //   image: './assests/spidermannowahome.jpg',
  // },
  // {
  //   id: 3,
  //   title: 'AYALAAN',
  //   release_year: '12th jan 2024',
  //   starring: 'Sivakarthikeyan, Sharad kelkar',
  //   duration: '2hr 35m',
  //   image: './assests/ayalaan.jpg',
  // },
  // {
  //   id: 4,
  //   title: 'DOCTOR',
  //   release_year: '9th oct 2021',
  //   starring: 'Sivakarthikeyan, Vinay Rai',
  //   duration: '2hr 30m',
  //   image: './assests/doctor-main.jpg',
  //   alternative: 'DOCTOR poster',
  // },
  // {
  //   id: 5,
  //   title: 'HarryPotter',
  //   release_year: '18th nov 2005',
  //   starring: 'Daniel Radcliffe, Emma Waston, Rupert Grint',
  //   duration: '2hr 30m',
  //   image: './assests/HarryPotter.jpg',
  //   isEdit: false,
  // },
];

function clearApp() {
  app.innerHTML = '';
}

//To create a single movie card
const displayUI = () => {
  clearApp();
  for (let i = 0; i < favMovies.length; i++) {
    const movieDiv = movieCard(favMovies[i]);
    appendToApp(movieDiv);
  }
};

const appendToApp = (card) => {
  app.appendChild(card);
};

//To create a HTML card
function movieCard(m) {
  const movie_card = document.createElement('div');
  movie_card.setAttribute('id', `moive-${m['id']}`);
  movie_card.setAttribute('class', 'grid-box');

  const div1 = document.createElement('div');
  div1.setAttribute('class', 'img-tag');
  const div2 = document.createElement('div');
  div2.setAttribute('class', 'info-tag');
  const div3 = document.createElement('div');
  div3.setAttribute('class', 'info-tag');

  const btnDiv = document.createElement('div');
  btnDiv.setAttribute('class', 'btn-tag');

  const img = document.createElement('img');
  img.setAttribute('class', 'img-tag');
  img.setAttribute('alt', `${m['title']} poster`);
  img.setAttribute('src', `${m['image']}`);
  console.log(m['image']);

  const title = document.createElement('p');
  title.setAttribute('class', 'title');
  title.innerText = m['title'];

  const date = document.createElement('p');
  date.innerText = `date: ${m['release_year']}`;

  const starring = document.createElement('p');
  starring.innerText = `starring: ${m['starring']} `;

  const duration = document.createElement('p');
  duration.innerText = `duration: ${m['duration']} `;

  const deletebtn = document.createElement('button');
  deletebtn.textContent = 'delete';

  deletebtn.addEventListener('click', function () {
    removeMoive(m['id']);
  });

  const editbtn = document.createElement('button');
  editbtn.textContent = 'edit';

  editbtn.addEventListener('click', function () {
    editMovie(m['id']);
  });

  if (m['isEdit']) {
    div2.style.display = 'none';
    div3.style.display = 'block';

    const updateBtn = document.createElement('button');
    updateBtn.textContent = 'Update';

    const titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('class', 'bor-m');
    titleInput.setAttribute('placeholder', 'Enter movie name');
    titleInput.setAttribute('id', `edit-${m.id}-title`);
    titleInput.setAttribute('value', m.title);

    const starInput = document.createElement('input');
    starInput.setAttribute('type', 'text');
    starInput.setAttribute('class', 'bor-m');
    starInput.setAttribute('placeholder', 'Enter movie name');
    starInput.setAttribute('id', `edit-${m.id}-star`);
    starInput.setAttribute('value', m.starring);

    div3.append(titleInput, starInput, updateBtn);

    updateBtn.addEventListener('click', function () {
      UpdateMovie(m['id']);
      div2.style.display = 'block';
      div3.style.display = 'none';
    });
  }

  movie_card.append(div1, div2, div3);
  div1.appendChild(img);
  div2.append(title, date, starring, duration, btnDiv);
  btnDiv.append(deletebtn, editbtn);
  return movie_card;
}

function getFromData() {
  const form = document.querySelector('#movie-form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.querySelector('#titlename').value;
    const date = document.querySelector('#release-date').value;
    var dateEntered = new Date(date);
    console.log(dateEntered);
    const starring = document.querySelector('#starring').value;
    const duration = document.querySelector('#duration').value;
    const poster = document.querySelector('#image-file').value;
    console.log(poster);

    const movie = {
      id: new Date().getTime(),
      title: title,
      release_year: date,
      starring: starring,
      duration: duration,
      image: poster,
      isEdit: false,
    };

    addMovie(movie);
  });
}

//CREATE
function addMovie(movie) {
  favMovies.push(movie);
  savetoLocal();
}

//DELETE
function removeMoive(mId) {
  let filterArrray = favMovies.filter((movie) => movie.id != mId);
  favMovies = filterArrray;
  savetoLocal();
}

//EDIT
function editMovie(mId) {
  let index = favMovies.findIndex((movie) => movie.id == mId);
  if (index != -1) {
    favMovies[index]['isEdit'] = true;
    displayUI();
    // savetoLocal();
  }
}

function UpdateMovie(mId) {
  const newTitle = document.querySelector(`#edit-${mId}-title`).value;
  const newStar = document.querySelector(`#edit-${mId}-star`).value;

  let index = favMovies.findIndex((movies) => movies.id == mId);
  if (index != -1) {
    favMovies[index]['title'] = newTitle;
    favMovies[index]['starring'] = newStar;
    favMovies[index]['isEdit'] = false;

    if (!newTitle || !newStar) {
      alert('Enter value');
    } else {
      savetoLocal();
    }
  }
}

// To get and set from Local storage.
function savetoLocal() {
  let str = JSON.stringify(favMovies);
  localStorage.setItem('movies', str);
  displayUI();
}

function getFromLocal() {
  let str = localStorage.getItem('movies');
  if (!str) {
    favMovies = [];
  } else {
    favMovies = JSON.parse(str);
  }
  displayUI();
}

getFromData(); //CREATE
getFromLocal(); //READ
