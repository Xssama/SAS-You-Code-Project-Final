const prompt = require("prompt-sync")();
// const { resolve } = require("dns");
// const { stdin } = require("process");
// const ReadLine = require("readline");
// const rl = ReadLine.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
// function question(text) {
//   return new Promise((resolve) => {
//     rl.question(text, resolve);
//   });
// }

const apprenants = [
  {
    id: 1,
    nomComplet: "Sara Dev",
    ville: "Nador",
    resultats: [
      {
        jour: 1,
        exercicesTermines: 18,
        totalExercices: 20,
        challengeTermine: true,
      },
      {
        jour: 2,
        exercicesTermines: 14,
        totalExercices: 20,
        challengeTermine: false,
      },
    ],
  },
  {
    id: 2,
    nomComplet: "Yassine Code",
    ville: "Oujda",
    resultats: [
      {
        jour: 1,
        exercicesTermines: 12,
        totalExercices: 20,
        challengeTermine: false,
      },
    ],
  },
];

let id = 3;

function ajouterApprenant(nomComplet, ville) {
  let _nom = nomComplet?.replace(/[^a-zA-Z0-9 ]/g, "").trim();
  let _ville = ville?.replace(/[^a-zA-Z0-9 ]/g, "").trim();
  if (_nom === "" || _ville === "") {
    return -1;
  }
  const obj = {};

  obj.id = { id: id, nomComplet: _nom, ville: _ville, resultats: [] };
  apprenants.push(obj);
  id++;
  return 1;
}

function Afficher_AjouterApprenant() {
  console.log("==============================================");
  console.log("         Entrer les infos suivante:          ");
  console.log("==============================================");

  const nomComplet = prompt("Nom Complet: ");
  const ville = prompt("Ville: ");

  const result = ajouterApprenant(nomComplet, ville);

  if (result === 1) {
    console.log("L'apprenant est ajoute avec succes");
  } else {
    console.log("Echec d'ajouter l'apprenant, nom/ville inexact!");
  }
}

function afficherListe_Apprenants() {
  console.log("\t\t\tNombre d'apprenants(", apprenants.length, ")");
  console.table(
    apprenants.map((apprenant) => ({
      ID: apprenant.id,
      "Nom Complet": apprenant.nomComplet,
      ville: apprenant.ville,
      Progression: apprenant.resultats
        .map((jour) => {
          const prog = (jour.exercicesTermines / jour.totalExercices) * 100;
          const Challenge = jour.challengeTermine ? "Yes" : "No";
          return `J[${jour.jour}]: ${prog}%, ${Challenge} `;
        })
        .join(" | "),
    })),
  );
}

afficherListe_Apprenants();
