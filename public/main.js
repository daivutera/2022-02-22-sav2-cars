const basicCarHolder = document.querySelector('#cars-holder');
const divForForm = document.querySelector('#form-div');
const carsLink = document.querySelector('#cars-link');
const addCarLink = document.querySelector('#add-car-link');
const carsHolder = document.querySelector('#cars-holder');
const form = document.querySelector('#form');

async function createCarCards() {
  const data = await fetch('http://localhost:3001/cars');
  basicCarHolder.innerHTML = '';
  //   if (data === error) {
  //     basicCarHolder.innerHTML = 'cannot connect to server';
  //   }

  const res = await data.json();

  const forPlacingCards = document.querySelector('#header-flex');
  if (res.length === 0) {
    basicCarHolder.innerHTML = 'There are no any cars to sell, try later';
    return;
  }
  res.forEach((car) => {
    const card = document.createElement('div');
    card.classList.add('card');
    forPlacingCards.insertAdjacentElement('afterend', card);
    basicCarHolder.append(card);
    const plateNumber = car.number_plates;
    const carTitle = car.title;
    const carPicture = car.image;
    const plateNumberHolder = document.createElement('div');
    plateNumberHolder.classList.add('number_plates');
    plateNumberHolder.innerText = plateNumber;
    const titleHolder = document.createElement('div');
    titleHolder.classList.add('car-title');
    titleHolder.innerText = carTitle;
    const divForImage = document.createElement('div');
    divForImage.classList.add('picture-holder');
    const imageHolder = document.createElement('img');
    imageHolder.setAttribute('src', carPicture);
    divForImage.append(imageHolder);
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', deleteFunction);
    deleteButton.setAttribute('data-id', car.id);
    deleteButton.innerText = 'DELETE';
    card.append(plateNumberHolder, titleHolder, divForImage, deleteButton);
  });
}
createCarCards();

async function deleteFunction(e) {
  e.preventDefault();
  const deleteConfirm = confirm('ar tikrai');
  if (deleteConfirm) {
    console.log('istrinam');

    const id = e.target.dataset.id;
    console.log(id);
    await fetch(`http://localhost:3001/cars/${id}`, {
      method: 'DELETE',
    });
    carsHolder.innerHTML = '';
    createCarCards();
  }
}
addCarLink.addEventListener('click', showTable);

function showTable() {
  carsHolder.innerHTML = '';
  carsHolder.classList.remove('cars-holder');
  divForForm.classList.remove('hide');
  //basicCarHolder.classList.toggle('hide'); bet toggle netinka man cia, pasilieku kaip pvz
}

carsLink.addEventListener('click', hideTable);

function hideTable() {
  carsHolder.classList.add('cars-holder');
  divForForm.classList.add('hide');
  createCarCards();
}

form.addEventListener('submit', postCarDataToDatabase);
function postCarDataToDatabase(e) {
  e.preventDefault();
  const titleFromSite = e.target.title.value;
  const number_platesFromSite = e.target.numberPlates.value;
  const priceFromSite = e.target.price.value;
  const imageFromSite = e.target.picture.value;
  const dataToSend = {
    title: titleFromSite,
    number_plates: number_platesFromSite,
    price: priceFromSite,
    image: imageFromSite,
  };
  //tada dar galima patikrint su funkcija ar visi uzpildyti duomenys

  if (checkBody(dataToSend)) {
    alert('yra neuzpildytu lauku');
    return;
  }

  fetch('http://localhost:3001/cars', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataToSend),
  });
  form.reset();
  console.log(titleFromSite);
}
function checkBody(dataToCheck) {
  const mustBeKeys = ['title', 'image', 'price', 'number_plates'];
  const values = Object.values(dataToCheck);
  const valuesBool = values.map((val) => !!val).filter((val) => val === false);
  const ourKeys = Object.keys(dataToCheck);
  const allKeys = mustBeKeys.filter((mustKey) => ourKeys.includes(mustKey));
  if (valuesBool.length > 0 || allKeys.length > 0) {
    console.log('yra neuzpildytu lauku');
    return true;
  }
  return false;
}
