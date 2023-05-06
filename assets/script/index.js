'use strict';


const movieList = document.querySelector('.movieList');

fetch('./assets/script/movies.json')
  .then(response => response.json())
  .then(data => {
    // Create a variable to store the HTML for the movie list
    let movieListHTML = '';

    // Loop through the movies and add their information to the HTML
    data.movies.forEach(movie => {
      movieListHTML += `
        <div class="movie">
        <img src="${movie.poster}" alt="${movie.title}">
        <h3>${movie.title}</h3>        
        </div>
      `;
    });

    // Add the HTML to the movie list section
    movieList.innerHTML = movieListHTML;
});


fetch('./assets/script/cities.json')
  .then(response => response.json())
  .then(data => {
    const cityNames = data.cities.map(city => city.name);
    autocomplete(cityInput, cityNames);
});


const movieInput = document.querySelector('#movieInput');
const cityInput = document.querySelector('#cityInput');
const moviesdropdown = document.querySelector('.movies-results');
const citiesdropdown = document.querySelector('.cities-results');
const url = './assets/script/movies.json';
const urlcities = './assets/script/cities.json';
const options = {
    method: 'GET',
    headers: {'Content-Type': 'application/json; charset=UTF-8'},
    mode: 'cors'
}


movieInput.addEventListener('input', async () => {
  if (movieInput.value.length > 1) {
      const inputValue = movieInput.value.toLowerCase();

      moviesdropdown.innerHTML = '';

      const response = await fetch(url, options);
      if (!response.ok) {
          throw new Error(`${response.statusText} (${response.status})`)
      }
      const data = await response.json();
      const movieTitles = [];
      for (let i = 0; i < data.movies.length; i++) {
          let movieName = data.movies[i].title;
          movieTitles.push(movieName);
      }
      
      const filteredMovies = movieTitles.filter(movie => {
          return movie.toLowerCase().includes(inputValue);
      })

      if (filteredMovies.length > 0) {
          filteredMovies.forEach(movie => {
              const newElement = document.createElement('a');
              newElement.href = '#';
              newElement.textContent = movie;
              newElement.addEventListener('click', () => {
                  movieInput.value = newElement.textContent;
                  moviesdropdown.innerHTML = '';
              })
              moviesdropdown.appendChild(newElement);
          })
      } else {
          const defaultResult = document.createElement('a');
          defaultResult.href = '#';
          defaultResult.textContent = 'Movie not found';
          moviesdropdown.appendChild(defaultResult);
      }
  } else {
      moviesdropdown.innerHTML = '';
  }
});



cityInput.addEventListener('input', async () => {
  if (cityInput.value.length > 1) {
      const inputValue = cityInput.value.toLowerCase();

      citiesdropdown.innerHTML = '';

      const response = await fetch(urlcities, options);
      if (!response.ok) {
          throw new Error(`${response.statusText} (${response.status})`)
      }
      const data = await response.json();
      const cityNames = [];
      for (let i = 0; i < data.cities.length; i++) {
          let cityName = data.cities[i].name;
          cityNames.push(cityName);
      }

      const filteredCities = cityNames.filter(city => {
          return city.toLowerCase().includes(inputValue);
      })

      if (filteredCities.length > 0) {
          filteredCities.forEach(city => {
              const newElement = document.createElement('a');
              newElement.href = '#';
              newElement.textContent = city;
              newElement.addEventListener('click', () => {
                  cityInput.value = newElement.textContent;
                  citiesdropdown.innerHTML = '';
              })
              citiesdropdown.appendChild(newElement);
          })
      } else {
          const defaultResult = document.createElement('a');
          defaultResult.href = '#';
          defaultResult.textContent = 'City not found';
          citiesdropdown.appendChild(defaultResult);
      }
  } else {
      citiesdropdown.innerHTML = '';
  }
});


