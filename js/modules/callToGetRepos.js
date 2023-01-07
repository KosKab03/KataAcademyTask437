const URL = 'https://api.github.com/search/repositories?q';

function callToGetRepos(value) {
  return new Promise((resolve, reject) => {
    resolve(fetch(`${URL}=${value}`));
  }).then((repoSArray) => {
    return repoSArray.json();
  });
}

export default callToGetRepos;
