// Fetch Data
const API_KEY="3a9412f497164bd18d0dc3950b80d396";
const url="https://newsapi.org/v2/everything?q=";
let go_search= document.getElementById("go_search");
let inputText=document.getElementById("inputData");


window.addEventListener("load",()=>fetchNews("India"));

async function fetchNews(query){
  //const res=await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const res=await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=3a9412f497164bd18d0dc3950b80d396`)
  const data=await res.json();
  console.log(data);
  bindData(data.articles);
}
function bindData(articles){
  const cardsContainer=document.getElementById("card-container");
  const newsCardTemplate=document.getElementById("template-news-card");
  cardsContainer.innerHTML="";
//if image not found Don't show news otherwise Show news
  articles.forEach(article => {
    if(!article.urlToImage) return;
    const cardClone=newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone,article);
    cardsContainer.appendChild(cardClone);
    
  });
}
function fillDataInCard(cardClone,article){
  const newsImg=cardClone.querySelector('#news_img');
  const newsTitle=cardClone.querySelector('#news-title');
  const newsDesc=cardClone.querySelector('#news-desc');
  newsImg.src=article.urlToImage;
  newsTitle.innerHTML=article.title;
  newsDesc.innerHTML=article.description;
// open news using url 
  cardClone.firstElementChild.addEventListener("click",()=>{
    window.open(article.url,"_blank");
  });
}

//Search Data

go_search.addEventListener("click", (event)=>{
  event.preventDefault();
  const query = inputText.value;
  if (!query) return;
  fetchNews(query);
 })


