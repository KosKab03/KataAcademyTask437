const URL = 'https://api.github.com/search/repositories?q';

async function callToGetRepos(value) {
  const responce = await fetch(`${URL}=${value}`);
  
  const movies = await responce.json();

  return movies;
}

export default callToGetRepos;
