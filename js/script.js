// Sélectionne l'élément HTML avec la classe"cp"
const inputCP = document.querySelector(".cp")
// Sélectionne l'élément HTML avec la classe "ville"
const selectVille = document.querySelector(".ville")


var map = L.map('map')//.setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Ajoute un écouteur d'évènement "input" (pendant la saisie) au champ de code postal
inputCP.addEventListener("input", () => {
    // Récupère la valeur d'entrée dans le champ de code postal
    let value = inputCP.value
    // Vide la contenu actuel de la liste de sélection de ville
    selectVille.innerText = null 
    // Effectue une requête fetch vers l'API de géolocalisation avec le code postal saisi
    fetch(`https://geo.api.gouv.fr/communes?codePostal=${value}&fields=region,nom,code,codePostal,centre&format=json&geometry=centre`)
        // Convertit la réponse en format JSON
        .then((response) => response.json())
        
        // Une fois que les données JSON sont disponibles
        .then((data) => {
            // Affiche les données dans la console (pour debug si besoin)
            console.log(data);
            map.setView([data[0]['centre']['coordinates'][1], data[0]['centre']['coordinates'][0]], 13) 
             // Parcours chaque objet "ville" dans les données récupérées
            data.forEach((ville) => {
                // Créé un nouvel élément d'option HTML
                let option = document.createElement("option")
                // Définit la valeur de l'option comme le code de la ville
                option.value = `${ville.code}`
                // Définit le texte affiché de l'option comme le nom de la ville
                option.innerHTML = `${ville.nom}`
                // Ajoute l'option à la liste de sélection de ville
                selectVille.appendChild(option)

                let marker = new L.marker([`${ville.centre.coordinates[1]}`, `${ville.centre.coordinates[0]}`]).addTo(map);
            })
        })
    })

            
            