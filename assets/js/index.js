'use strict';

function select(selector, scope = document) {
  return scope.querySelector(selector);
}

function selectAll(selector, scope = document) {
  return scope.querySelectorAll(selector);
}

function listen(event, element, callback) {
  return element.addEventListener(event, callback);
}

function create(element, scope = document) {
  return scope.createElement(element);
}

function addChild(element, child) {
  return element.appendChild(child);
}

function addFirstChild(element, child) {
  return element.prepend(child);
}

function addBefore(element, child, elementChild) {
  return element.insertBefore(child, elementChild);
}

function addClass(element, text) {
  return element.classList.add(text);
}

function removeClass(element, text) {
  return element.classList.remove(text);
}

function toggleClass(element, text) {
  return element.classList.toggle(text);
}

const userIcon = select('#user-icon');
const textInput = select('.text-box');
const fileUpload = select('#file');
const fileName = select('.file-name');
const postBtn = select('#post');
const posted = select('.posted-posts');
const modal = select('.pop-up');
const modalName = select('.name');
const modalUserName = select('.user-name');
const modalEmail = select('.email');
const modalGroups = select('.groups');
const modalPages = select('.pages');

class User {
  #id;
  #name;
  #userName;
  #email;

  constructor(id, name, userName, email){
    this.#id = id;
    this.#name = name;
    this.#userName = userName;
    this.#email = email;
  }
  
  get id() { return this.#id; }
  get name() { return this.#name; }
  get userName() { return this.#userName; }
  get email() { return this.#email; }
  
  getInfo() {
    return [
      this.name,
      this.userName,
      this.email
    ];
  }
}

class Subscriber extends User {
  #pages;
  #groups;
  #canMonetize;

  constructor(id, name, userName, email, pages, groups, canMonetize){
    super(id, name, userName, email);
    this.#pages = pages;
    this.#groups = groups;
    this.#canMonetize = canMonetize;
  }

  get pages() { return this.#pages; }
  get groups() { return this.#groups; }
  get canMonetize() {return this.#canMonetize; }

  getInfo() {
    const info = super.getInfo();
    return [
      ...info,
      this.pages.join(', '),
      this.groups.join(', ')
    ];

  }
}

let pages = ['Cats Daily', 'Big Cat Only', 'Furry Feline Friends'];
let groups = ['Cats Anon.', 'Addictions', 'Therapy for Crazy Cat People'];
const user = new Subscriber(
  Date.now(), 
  'George Smith', 
  '_gD@wg_', 
  'gdawg@gmail.com', 
  pages, 
  groups, 
  false
);

function getDate() {
  const options = { year: 'numeric', month: 'short', day: '2-digit' };
  return new Date().toLocaleDateString('en-ca', options);
}


function buildPost() {
  const post = create('div');
  const framework = 
  `<div class="head">
    <div class="user">
      <figure><img class="profile-pic" src="./assets/img/profile-pic.jpg"></figure>
      <h3 class="post-user-name">${user.name}</h3>
    </div>
    <div>
      <p class="date">${getDate()}</p>
    </div>
  </div>
  <div class="content">
  </div>`;
post.innerHTML = framework;
addClass(post, 'post');
addFirstChild(posted, post);
}

function addImage() {
  const content = select('.content');
  const image = `<img src="${getImgData()}">`;
  const figure = create('figure');
  addClass(figure, 'posted-image')
  figure.innerHTML = image;
  addChild(content, figure);
}

function addText() {
  const content = select('.content');
  const text = textInput.value;
  const para = create('p');
  addClass(para, 'text');
  para.innerText = text;
  addChild(content, para);
}

function fillInfo() {
  let info = user.getInfo();
  modalName.innerText = `${info[0]}`;
  modalUserName.innerText = `@${info[1]}`;
  modalEmail.innerText = `${info[2]}`;
  modalPages.innerText = `${info[3]}`;
  modalGroups.innerText = `${info[4]}`;
}

function getImgData() {
  const file = fileUpload.files[0];
  const url = URL.createObjectURL(file);
  return url;
}

function clearInputs() {
  if (textInput.value !== '') { textInput.value = ''};
  if (fileUpload.files.length > 0) { fileName.innerText = ''; }
}


listen('input', textInput, () => {
  (textInput.value !== '') ? postBtn.disabled = false : postBtn.disabled = true;
})


listen('change', fileUpload, () => {
  fileName.innerText = fileUpload.files[0].name;
  (fileUpload.files.length !== 0) ? postBtn.disabled = false : postBtn.disabled = true;
});

listen('click', postBtn, () => {
  buildPost();

  if (textInput.value !== '') {
    addText();
  }

  if (fileUpload.files.length > 0) {
    getImgData();
    addImage();
  }

  clearInputs();
  postBtn.disabled = true;

});


listen('click', userIcon, () => {
  fillInfo();
  modal.style.visibility = 'visible';
  modal.focus();
})

listen('blur', modal, () => {
  modal.style.visibility = 'hidden';
})



