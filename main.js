const CARDS = 10;

//Peticiones de pokemones al API

for (let i = 1; i <= CARDS; i++) {
  let id = getRandomId(150);
  searchPokemonById(id);
}

function getRandomId(max) {
  return Math.floor(Math.random() * max) + 1;
}

let draggableElements = document.querySelector(".draggable-elements");

let droppableElements = document.querySelector(".droppable-elements");

let pokemonSearched = [];
let pokemonNames = [];

async function searchPokemonById(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const data = await res.json();

  //Arreglos de los pokemones

  pokemonSearched.push(data); //push para agregar elementos en un array

  //Arreglo de los nombres
  pokemonNames.push(data.name);

  pokemonNames = pokemonNames.sort(() => Math.random() - 0.5);

  //Dibujando pokemones

  draggableElements.innerHTML = "";
  pokemonSearched.forEach((pokemon) => {
    draggableElements.innerHTML += `
    <div class="pokemon">
        <img id="${pokemon.name}" draggable = "true" class="image" src="${pokemon.sprites.front_default}" alt="" />
    </div>`;
  });

  //Insertando nombres

  droppableElements.innerHTML = "";
  pokemonNames.forEach((name) => {
    droppableElements.innerHTML += `
    <div class="names">
        <p>${name}</p>
    </div>
    `;
  });

  //construyendo el drag
  let pokemons = document.querySelectorAll(".image");
  pokemons = [...pokemons]; // para convertir un nodeList a array
  pokemons.forEach((pokemon) => {
    pokemon.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text", e.target.id);
    });
  });

  let names = document.querySelectorAll(".names");
  let wrongMsg = document.querySelector(".wrong");
  let points = 0

  names = [...names];
  names.forEach((name) => {
    name.addEventListener("dragover", (e) => {
      e.preventDefault(); // lo usamos para detener el drag
    });
    name.addEventListener("drop", (e) => {
      const draggableElementData = e.dataTransfer.getData("text");
      let pokemonElement = document.querySelector(`#${draggableElementData}`);
      if (e.target.innerText == draggableElementData) {
        points++
        e.target.innerHTML= ''
        e.target.appendChild(pokemonElement)
        wrongMsg.innerText = "";

        if (points == CARDS) {
            draggableElements.innerHTML= `<h2 class= "win">Congratulations!</h2>`
        }

      } else {
        wrongMsg.innerText = "Ups!";
      }
    });
  });
}
