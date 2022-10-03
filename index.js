
let html
let likedMoviesHtml
let movieObject
let myWatchList = JSON.parse(localStorage.getItem('movies')) || []
const inputText= document.getElementById('get-film')
const submitBtn = document.getElementById('sb-btn')
const movieContainer = document.getElementById('movies')



function renderMovies(){
    for(movie of myWatchList){
        likedMoviesHtml = `
            <div id="film-container" data-id="${movie.title}">
                <img class="film-image"src="${movie.poster}" alt="">
                <div class="film-info">
                    <h3 class="film-title">${movie.title} <span class="icon-star">⭐️</span><span>${movie.rating}</span></h3>
                    <div class="film-info-2">
                        <p>${movie.runtime}</p>
                        <p>${movie.genre}</p>
                        <p id="remove-from-watchlist"><i class="uil uil-times-circle"></i> Remove</p>
                    </div>
                    <p class="film-desc">${movie.plot}.</p>
                </div>
            </div>
        `
        document.getElementById('liked-movies').innerHTML += likedMoviesHtml
    }
}
if(document.URL.includes("watchlist.html") ) {
    if(document.getElementById.innerHTML){
        document.getElementById('placeholder').style.display = "none"
    }
    renderMovies()
    document.addEventListener('click', function(e){
        if(e.target.id === 'remove-from-watchlist'){
            let currentMovie = e.target.parentElement.parentElement.parentElement.dataset
            e.target.parentElement.parentElement.parentElement.remove()
            for(let i = 0; i < myWatchList.length; i++){
                if(myWatchList[i].title === currentMovie.id){
                    let indexOfCurrentMovie = myWatchList.indexOf(myWatchList[i])
                    myWatchList.splice(indexOfCurrentMovie, 1)
                    localStorage.setItem('movies', JSON.stringify(myWatchList))
                }
            }
        }
    })
}
submitBtn.addEventListener('click', function(){
    if(inputText.value){
        fetch(`http://www.omdbapi.com/?t=${inputText.value}&apikey=968921e9`)
            .then(res => res.json())
            .then(data => {
                movieObject = {
                    title: data.Title,
                    plot: data.Plot,
                    poster: data.Poster,
                    runtime: data.Runtime,
                    genre: data.Genre,
                    rating: data.imdbRating,
                }
                movieResults(data)
                document.getElementById('placeholder').style.display = "none"
                inputText.value = ""
            })
    } else {
        inputText.placeholder = 'Enter a movie title'
    }
})

function movieResults(movie){
    html = `
    <div id="film-container">
        <img class="film-image"src="${movie.Poster}" alt="">
        <div class="film-info">
            <h3 class="film-title">${movie.Title} <span class="icon-star">⭐️</span><span>${movie.imdbRating}</span></h3>
            <div class="film-info-2">
                <p>${movie.Runtime}</p>
                <p>${movie.Genre}</p>
                <p id="add-to-watchlist"><i class="uil uil-plus-circle"></i> Watchlist</p>
            </div>
            <p class="film-desc">${movie.Plot}</p>
        </div>
    </div>`
    document.getElementById('movies').innerHTML = html
}

document.addEventListener('click', function(e){
    if(e.target && e.target.id === "add-to-watchlist"){
        myWatchList.unshift(movieObject)
        localStorage.setItem('movies', JSON.stringify(myWatchList))
    }
})