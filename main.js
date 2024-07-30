/*
  1-fetch that is get qoutes from json file
  2- make the bullet dainamic with the quotes 
  3- random quotes
  4- function to create quotes
*/



const geneOneTime = document.querySelector(".generateonetime");
const autogene = document.querySelector(".autogenerate");
const stopgene = document.querySelector(".stopgenerate");
const quotediv = document.querySelector(".quote-container p");
const authordiv = document.querySelector(".author");
const bulletdiv = document.querySelector(".bullet")



let quotes = [];
let autogen;
let automsg;

function geneQuote(){
  fetch('quotes.json')
  .then(response => {
    if (!response.ok){
      console.error('Error:', response.statusText);
    }
    return response.json();
  })
  .then(data => {
    quotes = data; 
    RandomQuote();
  })
  .catch(error => {
    console.error('Error:', error.message || error);
  });
}

function RandomQuote() {
  if (quotes.length > 0) {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)].quote;
    const author =  quotes[Math.floor(Math.random() * quotes.length)].author;
    authordiv.innerHTML = `[${author}]`
    const bullet = quotes[Math.floor(Math.random() * quotes.length)].id;
    bulletdiv.innerHTML = bullet
    quotediv.innerText = randomQuote;
  } else {
    quotediv.innerText = "No quotes available.";
  }
}

geneQuote();



geneOneTime.addEventListener("click", (e) => {
  e.preventDefault();
  RandomQuote();
});

autogene.addEventListener("click", (e) => {
  e.preventDefault();
  autogen = setInterval(() => {
    RandomQuote();
  }, 1500);
  if (!automsg) {
    automsg = document.createElement("div");
    automsg.className = "automsg";
    automsg.appendChild(document.createTextNode("Auto: On"));
    document.body.appendChild(automsg);
  }
});

stopgene.addEventListener("click", (e) => {
  e.preventDefault();
  clearInterval(autogen);
  if (automsg) {
    document.body.removeChild(automsg);
    automsg = null;
  }
});


window.onload = function() {
  geneQuote();  
};