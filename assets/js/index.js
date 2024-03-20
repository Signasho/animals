import { Leon, Lobo, Oso, Serpiente, Aguila } from "./animals.js";
import animalsData from "./iifeFetch.js";


let allAnimals = [];

//Card de animales
const reloadTable = () => {
    const animalCard = document.getElementById("Animales");
    animalCard.innerHTML = "";
    allAnimals.forEach((data, i) => {
        animalCard.innerHTML += `
          <div class="px-3 pb-2">
            <div class="bg-dark text-white">
              <img
                height="200"
                src="${data.getImg()}"
                data-toggle="modal" data-target="#exampleModal"
                onclick="modalDetails('${i}')"
              />
              <div>
                <button onclick="playSound('${data.getNombre()}')" class="btn btn-secondary w-100"> <img height="30" src="assets/imgs/audio.svg" /> </button>
              </div>
            </div>
          </div>
    `;
    });
    document
        .querySelectorAll(".card-body button")
        .forEach((e) => e.addEventListener("click", skills));
};


//Reproducción de sonidos
window.playSound = (nombre) => {
    const animal = allAnimals.find((element) => element.getNombre() == nombre);
    nombre == "Leon"
        ? animal.Rugir()
        : nombre == "Lobo"
            ? animal.Aullar()
            : nombre == "Oso"
                ? animal.Gruñir()
                : nombre == "Serpiente"
                    ? animal.Sisear()
                    : nombre == "Aguila"
                        ? animal.Chillar()
                        : undefined;
};

//Modal
window.modalDetails = (i) => {
    const modalBody = document.getElementsByClassName("modal-body")[0];
    const animalData = allAnimals[i];
    modalBody.innerHTML = `
    <div class="px-3 pb-2">
    <div class="card w-50 m-auto bg-dark text-white border-0">
      <img
        src="${animalData.getImg()}"
        class="d-block m-auto w-100"
      />
      <div class="card-body text-center">
        <h6 class="card-text ">${animalData.getEdad()}</h6>
        <h6 class="card-text m-0">Comentarios</h6>
        <hr/>
        <p>${animalData.getComentarios()}</p>
      </div>
    </div>
    </div>
    `;
};

//Selección de animales

let imgSrc;
let sound;
document.getElementById("animal").addEventListener("change", async (e) => {
    const animalSelected = e.target.value;
    const animals = await animalsData.getData();
    console.log(animals)
    const animalObject = animals.find((a) => a.name == animalSelected);
    imgSrc = `./assets/imgs/${animalObject.imagen}`;
    sound = animalObject.sonido;
    const preview = document.getElementById("preview");
    preview.parentElement.classList.remove("p-5");
    preview.style.backgroundImage = `url(${imgSrc})`;
});


// Generando la card del animal
document.getElementById("btnRegistrar").addEventListener("click", async (e) => {
    const nombreElement = document.getElementById("animal");
    const edadElement = document.getElementById("edad");
    const comentariosElement = document.getElementById("comentarios");
    const nombre = nombreElement.value;
    const edad = edadElement.value;
    const comentarios = comentariosElement.value;
    if (nombre && edad && comentarios) {
        let animal =
            nombre == "Leon"
                ? new Leon(nombre, edad, imgSrc, comentarios, sound)
                : nombre == "Lobo"
                    ? new Lobo(nombre, edad, imgSrc, comentarios, sound)
                    : nombre == "Oso"
                        ? new Oso(nombre, edad, imgSrc, comentarios, sound)
                        : nombre == "Serpiente"
                            ? new Serpiente(nombre, edad, imgSrc, comentarios, sound)
                            : nombre == "Aguila"
                                ? new Aguila(nombre, edad, imgSrc, comentarios, sound)
                                : undefined;

        nombreElement.selectedIndex = 0;
        edadElement.selectedIndex = 0;
        comentariosElement.value = "";
        document.getElementById("preview").style.backgroundImage =
            "url(assets/imgs/lion.svg)";
        allAnimals.push(animal);
        reloadTable();
    } else {
        alert("Debe llenar todos los datos del formulario");
    }
});

