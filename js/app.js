'use strict';

console.log('mic check one two, mic check 1 annnd 2');

//**************GLOBALS********** */
let productArray = [];
let votingRounds = 25;
let indexArray = [];

//************DOM WINDOWS********* */
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultsBtn = document.getElementById('show-results-btn');
// let resultsList = document.getElementById('results-container');

//*************CANVAS ELEMENT FOR CHART********* */

let ctx = document.getElementById('my-chart');

//**********CONSTRUCTOR FUNCTION*********** */

function itemDisp(name, fileExtension = 'jpg') {
  this.name = name;
  this.image = `img/${name}.${fileExtension}`;
  this.votes = 0;
  this.views = 0;
}

// let usedImages = [];

function randomIndex() {
  return Math.floor(Math.random() * productArray.length);
}
//***************Helper Function to Render Chart************* */
function renderChart() {
let prodNames = [];
let prodVotes = [];
let prodViews = [];
  
  
  for (let i = 0; i < productArray.length; i++) {
    prodNames.push(productArray[i].name);
    prodVotes.push(productArray[i].votes);
    prodViews.push(productArray[i].views);
  }
  


let chartObj = {
  type: 'bar',
  data: {
    labels: prodNames, 
    datasets: [{
      label: '# Of Votes',
      data: prodVotes, // *** VOTES - needed an array
      borderWidth: 5,
      backgroundColor: ['blue'],
      borderColor: ['blue']
    },
    {
      label: '# of Views',
      data: prodViews, // *** VIEWS - needed an array
      borderWidth: 5,
      backgroundColor: ['black'],
      borderColor: ['black']
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
};


// *** for the Chart Constructor- canvas element and config obj with product data
new Chart(ctx, chartObj); 
}
//************HELPER FUNCTIONS/UTILITIES******* */
//Round 1: A B C
//Round 2: J M O
//Round 3: A C B


function renderImg() {
  while (indexArray.length < 6) {
    let randoNum = randomIndex();
    if (!indexArray.includes(randoNum)) {//If not in array push in
      indexArray.push(randoNum); //opposite of push is .unshift
    }
  }
  console.log(indexArray);

  //The shift() method removes the first element from an array and returns that removed element. This method changes the length of the array. opposite is .pop
  let imgOneIndex = indexArray.shift(); 
  let imgTwoIndex = indexArray.shift();
  let imgThreeIndex = indexArray.shift();



  //**********COMPARE IMAGES -while- they are the same get a new randomIndex -OR- display image***************** */

  // while(imgOneIndex === imgTwoIndex || imgOneIndex === imgThreeIndex || imgTwoIndex === imgThreeIndex){
  //   imgTwoIndex = randomIndex();
  //   imgThreeIndex = randomIndex();

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
//**********EVENT HANDLER******** */
function handleImgClick(event) {

  //**** Identify image clicked */
  let imgClicked = event.target.title;
  console.dir(imgClicked);

  //****Increase the number of clicks on that image */
  for (let i = 0; i < productArray.length; i++) {
    if (imgClicked === productArray[i].name) {
      productArray[i].votes++;

      //****Decrement the voting rounds */
      votingRounds--;
      //*****Rerender of imgs */
      renderImg();
    }
  }


  //*****Once voting done - stop the click */
  if (votingRounds === 0) {
    imgContainer.removeEventListener('click', handleImgClick);


    //*****LOCAL STORAGE STARTS HERE***** */
    //! STEP 1- Convert our data to a string to store in local storage
    let stringifiedProds = JSON.stringify(productArray);
    
    console.log('Stringified products >>', stringifiedProds);
    
    localStorage.setItem('myProducts', stringifiedProds);
    
    
  }
}

function handleShowResults() {
  if (votingRounds === 0) {
    // for (let i = 0; i < productArray.length; i++) {
    //   let productListItem = document.createElement('li');
    //   productListItem.textContent = `${productArray[i].name}: Views: ${productArray[i].views} & Votes: ${productArray[i].votes}`;
    //   resultsList.appendChild(productListItem);
    // }
    renderChart();
    resultsBtn.removeEventListener('click', handleShowResults);
  }
}

//************EXECUTABLE CODE*********** */

//********LOCAL STORAGE CONTINUES...***** */
//! STEP 3 GET INFO FROM LOCAL STORAGE
let retrievedProds = localStorage.getItem('myProducts');

console.log('prods from ls>>>>',retrievedProds);
//! STEP 4 CONVERT BACK TO USEABLE CODE
let parsedProds = JSON.parse(retrievedProds);

console.log('parsed prods>>>>', parsedProds);

//*********REBUILD Products USING THE CONSTRUCTOR** */

// if(retrievedProds){
//   for(let i = 0; i < parsedProds.length; i++){
//     if(parsedProds[i].name === 'sweep'){
//       let reconstructedSweep = new itemDisp(parsedProds[i].name, 'png');
//       reconstructedSweep.views = parsedProds[i].views;
//       reconstructedSweep.votes = parsedProds[i].votes;
//       productArray.push(reconstructedSweep);
//     }else{
//       let reconstructedProd = new itemDisp(parsedProds[i].name);
//       reconstructedProd.views = parsedProds[i].views;
//       reconstructedProd.votes = parsedProds[i].votes;
//       productArray.push(reconstructedProd);
//     }
//   }

// }else{
//   let sweep = new itemDisp('sweep', 'png');
//   let bag = new itemDisp('bag');
//   let banana = new itemDisp('banana');
//   let bathroom = new itemDisp('bathroom');
//   let boots = new itemDisp('boots');
//   let breakfast = new itemDisp('breakfast');
//   let bubblegum = new itemDisp('bubblegum');
//   let chair = new itemDisp('chair');
//   let cthulhu = new itemDisp('cthulhu');
//   let dogDuck = new itemDisp('dog-duck');
//   let dragon = new itemDisp('dragon');
//   let pen = new itemDisp('pen');
//   let petSweep = new itemDisp('pet-sweep');
//   let scissors = new itemDisp('scissors');
//   let shark = new itemDisp('shark');
//   let tauntaun = new itemDisp('tauntaun');
//   let unicorn = new itemDisp('unicorn');
//   let waterCan = new itemDisp('water-can');
//   let wineGlass = new itemDisp('wine-glass');
  
//   productArray.push(sweep, bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, tauntaun, unicorn, waterCan, wineGlass);

// }
//******'EASY' path out of woods ********/
if(retrievedProds){
  productArray = parsedProds;

}else{
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

}

renderImg();

imgContainer.addEventListener('click', handleImgClick);
resultsBtn.addEventListener('click', handleShowResults);
