'use strict';

console.log('mic check one two, mic check 1 annnd 2');

//**************GLOBALS********** */
let productArray = [];
let votingRounds = 25;

//************DOM WINDOWS********* */
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultsBtn = document.getElementById('show-results-btn');
let resultsList = document.getElementById('results-container');

//**********CONSTRUCTOR FUNCTION*********** */
function itemDisp(name, fileExtension = 'jpg') {
  this.name = name;
  this.image = `img/${name}.${fileExtension}`;
  this.votes = 0;
  this.views = 0;
}

// let usedImages = [];
//************HELPER FUNCTIONS/UTILITIES******* */

function renderImg() {
  let imgOneIndex = randomIndex();
  let imgTwoIndex = randomIndex();
  let imgThreeIndex = randomIndex();



  //**********COMPARE IMAGES -while- they are the same get a new randomIndex -if false?- display image***************** */

  while(imgOneIndex === imgTwoIndex || imgOneIndex === imgThreeIndex || imgTwoIndex === imgThreeIndex){
    imgTwoIndex = randomIndex();
    imgThreeIndex = randomIndex();

  }
  // if (!usedImages[num]) {
  //   document.src = productArray[num];
  //   usedImages[num] = true;
  //   usedImagesCount++;
  //   if (usedImagesCount === productArray.length) {
  //     usedImagesCount = 0;
  //     usedImages = [];
  //   }
  // } else {
  //   renderImg();
  // }
  
  imgOne.src = productArray[imgOneIndex].image;
  imgOne.title = productArray[imgOneIndex].name;
  imgOne.alt = `this is an image of ${productArray[imgOneIndex].name} product.`;
  imgTwo.src = productArray[imgTwoIndex].image;
  imgTwo.title = productArray[imgTwoIndex].name;
  imgTwo.alt = `this is an image of ${productArray[imgTwoIndex].name} product.`;
  imgThree.src = productArray[imgThreeIndex].image;
  imgThree.title = productArray[imgThreeIndex].name;
  imgThree.alt = `this is an image of ${productArray[imgThreeIndex].name} product.`;

  //****Increase the views on imgs */
  productArray[imgOneIndex].views++;
  productArray[imgTwoIndex].views++;
  productArray[imgThreeIndex].views++;
}

function randomIndex() {
  return Math.floor(Math.random() * productArray.length);
}

function handleImgClick(event) {
  
  //**** Identify image clicked */
  let imgClicked = event.target.title;
  console.dir(imgClicked);

  //****Increase the number of clicks on that image */
  for (let i = 0; i < productArray.length; i++) {
    if (imgClicked === productArray[i].name) {
      productArray[i].votes++;
    }
  }

  //****Decrement the voting rounds */
  votingRounds--;

  //*****Rerender of imgs */
  renderImg();

  //*****Once voting done - stop the click */
  if (votingRounds === 0) {
    imgContainer.removeEventListener('click', handleImgClick);
  }


}

function handleShowResults() {
  if (votingRounds === 0) {
    for (let i = 0; i < productArray.length; i++) {
      let productListItem = document.createElement('li');
      productListItem.textContent = `${productArray[i].name}: Views: ${productArray[i].views} & Votes: ${productArray[i].votes}`;
      resultsList.appendChild(productListItem);
    }
    resultsBtn.removeEventListener('click', handleShowResults);
  }
}

//************EXECUTABLE CODE*********** */
let sweep = new itemDisp('sweep', 'png');
let bag = new itemDisp('bag');
let banana = new itemDisp('banana');
let bathroom = new itemDisp('bathroom');
let boots = new itemDisp('boots');
let breakfast = new itemDisp('breakfast');
let bubblegum = new itemDisp('bubblegum');
let chair = new itemDisp('chair');
let cthulhu = new itemDisp('cthulhu');
let dogDuck = new itemDisp('dog-duck');
let dragon = new itemDisp('dragon');
let pen = new itemDisp('pen');
let petSweep = new itemDisp('pet-sweep');
let scissors = new itemDisp('scissors');
let shark = new itemDisp('shark');
let tauntaun = new itemDisp('tauntaun');
let unicorn = new itemDisp('unicorn');
let waterCan = new itemDisp('water-can');
let wineGlass = new itemDisp('wine-glass');

productArray.push(sweep, bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, tauntaun, unicorn, waterCan, wineGlass);

renderImg();

imgContainer.addEventListener('click', handleImgClick);
resultsBtn.addEventListener('click', handleShowResults);
