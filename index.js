/**
 * Pineapple Pizza Counter
 */

const pineappleButton = document.getElementById("pineappleButton")
const pineappleScore = document.getElementById("pineappleScore")
const nopeButton = document.getElementById("nopeButton")
const nopeScore = document.getElementById("nopeScore")

let goodScore = 0
let badScore = 0
pineappleButton.addEventListener("click", () => {
    pineappleScore.innerHTML = ++goodScore
})

nopeButton.addEventListener("click", () => {
    nopeScore.innerHTML = ++badScore
})

const clearButton = document.getElementById("clearButton")
clearButton.addEventListener("click", () => {
    pineappleScore.innerHTML = "0"
    nopeScore.innerHTML = "0"
    goodScore = 0
    badScore = 0
})

//////////////////////////////////////////////
/**
 * Get and display data from some API
 */

const dataButton = document.getElementById("dataButton")
const dataDiv = document.getElementById("dataDiv")
dataButton.addEventListener("click",async () => {
    const info = await fetch("https://jsonplaceholder.typicode.com/posts/1")
    const data = await info.json()
    console.log(data)
    dataDiv.innerHTML = `
        <div> 
            <h1>${data.id}</h1>
            <h2>${data.title} </h2>
            <p> ${data.body}</p>
        </div>
    `
})

//////////////////////////////////////////////
/**
 * Hash routes with PokeAPI
 */

//this adds an event listener to window and will fire in the event that the hash in our URL changes
window.addEventListener("hashchange", () => {
    selectPokemon()

})

//state is where i am storing the data i get from my fetch calls
const state = {
    pokemon: [],
    singlePokemon: null
}

//whenever the hashchange event fires, this function is called
function selectPokemon(){
    
    getEventFromHash()
    renderPokemonDetails()
    
    //this scrolls our window to the top left
    window.scroll({
        top: 0,
        left:0,
        behavior: "smooth"
    })
}

//this is where i want to get informtion from my hash
function getEventFromHash(){
    //get the name from the hash
    const name = window.location.hash.slice(1)

    //find the single pokemon from our list based on the name we got from hash
    const singlePokemon = state.pokemon.find((poke) => {
        return poke.name === name
    })

    //"save" the single pokemon we got to our state
    state.singlePokemon = singlePokemon
    console.log(state)
}

//if we have a single pokemon in our state, call getSinglePoke
function renderPokemonDetails(){
    if(state.singlePokemon){
        getSinglePoke()
    }
}

const pokeDiv = document.getElementById("pokeDiv")

//get a single pokemon and display it in pokeDiv
async function getSinglePoke(){
    const pokedata = await fetch(`https://pokeapi.co/api/v2/pokemon/${state.singlePokemon.name}`)
    const singlePokeData = await pokedata.json()
    state.singlePokemon = singlePokeData
    console.log("state --> ", state)
    const abilities = state.singlePokemon.abilities.map((ability) => {
        console.log(ability)
        return `<p> ${ability.ability.name}</p>`
    })
    
    pokeDiv.innerHTML = `<h1>${state.singlePokemon.name} </h1>
    <img src=${state.singlePokemon.sprites.back_default} />
    ` + abilities.join('')
    
}







const allPokeDiv = document.getElementById("allPokeDiv")

// render my list of pokemon once i have it
function renderPokeList() {
    const allPoke = state.pokemon.map((pokemon) => {
        return `<div> <a href=#${pokemon.name}> ${pokemon.name} </a> </div>`
    })
    allPokeDiv.innerHTML = allPoke.join('')
}

//get my list of pokemon
async function getPokeList(){
    const info = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0")
    const pokeData = await info.json()
    console.log(pokeData.results)
    state.pokemon = pokeData.results
    console.log("state -->", state)
}

//this is the main render function
//when my page loads, this is the functiont that is called
async function render(){
    await getPokeList()
    renderPokeList()
    selectPokemon()
}

//calls the render function
render()