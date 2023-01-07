import debounce from './modules/debounce.js';
import callToGetRepos from './modules/callToGetRepos.js';

const commonSearch = document.querySelector('.common__search');
const searchInput = document.querySelector('.search-input');
const commonSection = document.querySelector('.common');
const searchNav = document.createElement('nav');
searchNav.classList.add('.search__nav');
const navResult = document.createElement('nav');
navResult.classList.add('result__git-profile');

const searchAllRepos = function () {
  if (searchInput.value !== '') {
    searchNav.textContent = '';
    searchNav.remove();

    callToGetRepos(searchInput.value).then((repos) => {
      createElementsDropDownMenu(repos.items);
    });
  }
};

searchInput.addEventListener('keyup', debounce(searchAllRepos, 1000));

searchNav.addEventListener('click', (event) => {
  let repoName = event.target.textContent;
  let repoId = event.target.id;

  callToGetRepos(repoName).then((repoInfo) => {
    commonSection.append(navResult);

    repoInfo.items.forEach((elem) => {
      if (elem.id === Number(repoId)) {
        elem = new createElementRepo(elem);
        elem.createRepoBlock();
        searchInput.value = '';
        searchNav.textContent = '';
        searchNav.remove();
      }
    });
  });
});

navResult.addEventListener('click', (event) => {
  let parentBlock = event.target.parentNode.parentNode;
  if (parentBlock.classList[0] === 'git-profile') {
    parentBlock.textContent = '';
    parentBlock.remove();
  }
  if (document.querySelectorAll('.git-profile').length === 0) {
    navResult.textContent = '';
    navResult.remove();
  }
});

//?==============createElements===============///

function createElementsDropDownMenu(reposArray) {
  let countNavBtn = searchNav.children.length;

  if (reposArray.length !== 0) {
    commonSearch.append(searchNav);

    for (let i = 0; i < 5; i++) {
      let OneRepo = reposArray[i];

      if (OneRepo !== undefined && countNavBtn < 5) {
        OneRepo = new createElementRepo(OneRepo);
        OneRepo.createDropDownMenu();
      }
    }
  }
}

class createElementRepo {
  constructor(repo) {
    this.repoName = repo.name;
    this.repoOwner = repo.owner.login;
    this.repoStars = repo.stargazers_count;
    this.repoLink = 'https://github.com/' + repo.full_name;
    this.repoId = repo.id;
  }
}

createElementRepo.prototype.createDropDownMenu = function () {
  this.navBtn = document.createElement('button');
  this.navBtn.classList = 'nav__btn';
  this.navBtn.setAttribute('id', this.repoId);
  this.navBtn.textContent = this.repoName;
  searchNav.append(this.navBtn);
};

createElementRepo.prototype.createRepoBlock = function () {
  this.repoElemBlock = document.createElement('div');
  this.repoElemBlock.classList.add('git-profile');
  navResult.append(this.repoElemBlock);

  this.repoElemLink = document.createElement('a');
  this.repoElemLink.classList.add('git-profile__link');
  this.repoElemLink.setAttribute('target', '»_blank»');
  this.repoElemLink.href = this.repoLink;
  this.repoElemBlock.append(this.repoElemLink);

  this.repoElemUl = document.createElement('ul');
  this.repoElemUl.classList.add('git-profile__list');
  this.repoElemLink.append(this.repoElemUl);

  createRepoElemLi.call(this, 'Name');
  createRepoElemLi.call(this, 'Owner');
  createRepoElemLi.call(this, 'Stars');

  this.deleteBtn = document.createElement('button');
  this.deleteBtn.classList.add('git-profile__delete-btn');
  this.repoElemBlock.append(this.deleteBtn);
  this.imageDeleteBtn = document.createElement('img');
  this.imageDeleteBtn.src = './image/deleteBtn.png';
  this.deleteBtn.append(this.imageDeleteBtn);
};

function createRepoElemLi(title) {
  this.repoElemLi = 'repoElemLi' + title;
  this.repoElemLi = document.createElement('li');
  this.repoElemLi.classList.add('git-profile__name');
  this.repoElemLi.textContent = `${title}: ${this['repo' + title]}`;
  this.repoElemUl.append(this.repoElemLi);
}