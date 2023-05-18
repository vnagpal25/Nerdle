let quotesDiv = document.getElementById('quotes')

//html GET request, res => res.json() converts response text to json
//quote is a JSON object, \\
fetch('https://api.kanye.rest')
  .then(res => res.json())
  .then(quote => {
    //appends quote to be in the correct spot in the webpage, quote is the key also hence quote.quote
    quotesDiv.innerHTML += `<p> ${quote.quote} </p>`
  })


let catButton = document.getElementById('give-cat')
catButton.addEventListener("click", evt => {
  let catDiv = document.getElementById('cat-pic')

  fetch('https://pokeapi.co/api/v2/pokemon/ditto')
  .then(res => res.json)
  .then(pokemons => {
    cats.forEach(pokemon => {
      catDiv.innerHTML = `<h3>Here is this cat wishing you the bestest day </h3>
      <img src = "${pokemon.url}" alt = "kitty" />`
    })
  })
})
