const commonSearch = document.querySelector('.common__search');
const searchInput = document.querySelector('.search-input');
const commonSection = document.querySelector('.common');
const searchNav = document.createElement('nav');
searchNav.classList.add('.search__nav');
const navResult = document.createElement('nav');
navResult.classList.add('result__git-profile');

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

