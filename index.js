const prompt = require("prompt-sync")();
function ValiderNombre(message) {
  let Num;
  Num = Number(prompt(message));
  while (Number.isNaN(Num)) {
    console.log("Votre Reponse est invalide, essayer à nouveau: ");
    Num = Number(prompt(message));
  }
  return Num;
}

function ValiderNombre_Entre(message, Min, Max) {
  let Num;
  Num = Number(prompt(message));

  while (Number.isNaN(Num) || Num > Max || Num < Min) {
    console.log("Votre Reponse est invalide, essayer à nouveau: ");
    Num = Number(prompt(message));
  }
  return Num;
}
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

function normaliserNom(nom) {
  return nom?.replace(/[^a-zA-Z0-9 ]/g, "").trim();
}

function calculerProgression(apprenantID) {
  let apprenantIndex = rechercherApprenant_ParID(apprenantID);
  if (apprenantIndex != -1) {
    let Journees_renseignees = apprenants[apprenantIndex].resultats.length;
    let exercicesTerminesCount = 0;
    let totalExercicesCount = 0;
    let challengeTermineCount = 0;
    for (let index = 0; index < Journees_renseignees; index++) {
      exercicesTerminesCount +=
        apprenants[apprenantIndex].resultats[index].exercicesTermines;
      totalExercicesCount +=
        apprenants[apprenantIndex].resultats[index].totalExercices;
      challengeTermineCount += apprenants[apprenantIndex].resultats[index]
        .challengeTermine
        ? 1
        : 0;
    }
    let progression = (exercicesTerminesCount / totalExercicesCount) * 100;
    console.log(
      apprenants[apprenantIndex].nomComplet,
      " :",
      exercicesTerminesCount,
      "/",
      totalExercicesCount,
      "exercices, progression ",
      progression,
      " %.\n",
      Journees_renseignees,
      "journées renseignées, ",
      challengeTermineCount,
      "challenges terminés.",
    );
  } else {
    console.log("L'apprenant n'existe pas!");
  }
}
function ajouterApprenant(nomComplet, ville) {
  let _nom = normaliserNom(nomComplet);
  let _ville = ville?.replace(/[^a-zA-Z0-9 ]/g, "").trim();
  if (_nom === "" || _ville === "") {
    return -1;
  }

  const obj = { id: id, nomComplet: _nom, ville: _ville, resultats: [] };
  apprenants.push(obj);
  id++;
  return 1;
}

function Afficher_AjouterApprenant() {
  console.log("==============================================");
  console.log("         Entrer les infos suivante:          ");
  console.log("==============================================");

  const nomComplet = normaliserNom(prompt("Nom Complet: "));
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
function rechercherApprenant_ParID(id) {
  for (let index = 0; index < apprenants.length; index++) {
    if (apprenants[index].id === id) {
      return index;
    }
  }
  return -1;
}
function rechercherApprenant_ParNom(nom) {
  if (nom === undefined || nom.trim() == "") {
    console.log("le Nom est invalide ou vide!.");
    return -1;
  }
  let arr = [];
  for (let index = 0; index < apprenants.length; index++) {
    let nom_complet = apprenants[index].nomComplet?.toLowerCase();
    if (nom_complet.includes(nom.toLowerCase())) {
      arr.push(index);
    }
  }
  return arr.length === 0 ? -1 : arr;
}
function ConsulterApprenant(apprenantindex) {
  if (apprenantindex != -1) {
    let apprenant = apprenants[apprenantindex];
    console.log(
      "------------------------------------------------------------------",
    );
    console.log("Nom Complet: ", apprenant.nomComplet);
    console.log("ID: ", apprenant.id);
    console.log("Ville: ", apprenant.ville);
    console.log("Resultats:");
    if (apprenants[apprenantindex].resultats.length > 0) {
      console.table(
        apprenants[apprenantindex].resultats.map((resultats) => ({
          Jour: resultats.jour,
          "Exercices Termines": resultats.exercicesTermines,
          "Exercices Proposees": resultats.totalExercices,
          Progression:
            (resultats.exercicesTermines / resultats.totalExercices) * 100 +
            "%",
          Challenge: resultats.challengeTermine ? "Oui" : "Non",
        })),
      );
    } else {
      console.log("(Aucun enregistrement trouvé pour le moment.)");
    }
  } else {
    console.log(
      "lapprenant avec l'identifiant",
      apprenantID,
      " n'existe pas!.",
    );
  }
}
function rechercherApprenant() {
  console.log(
    "------------------------------------------------------------------",
  );
  console.log("\t\t\tConsulter un apprenant");
  console.log(
    "------------------------------------------------------------------",
  );
  let choix = ValiderNombre_Entre(
    "Tu veux chercher l'apprenant par nom [1] ou par identifiant [2] ? Votre choix : ",
    1,
    2,
  );
  if (choix === 1) {
    let nom = normaliserNom(prompt("Le nom d'apprenant?: "));

    let arr = rechercherApprenant_ParNom(nom);
    if (arr != -1) {
      console.log(
        "Les résultats de la recherche : Nombre d'apprenant(s) :",
        arr.length,
      );
      for (let index = 0; index < arr.length; index++) {
        ConsulterApprenant(arr[index]);
        console.log(
          "------------------------------------------------------------------",
        );
      }
    } else {
      console.log("Aucun résultat trouvé !");
    }
  } else {
    let identifiant = ValiderNombre("L'identifiant d'apprenant?: ");
    let apprenantIndex = rechercherApprenant_ParID(identifiant);
    if (apprenantIndex != -1) {
      ConsulterApprenant(apprenantIndex);
    } else {
      console.log("Aucun résultat trouvé !");
    }
  }
}
function TrouverJour_apprenant(tab, jour) {
  for (let index = 0; index < tab.length; index++) {
    if (tab[index].jour === jour) {
      return index;
    }
  }
  return -1;
}
function enregistrerResultat(
  apprenantIndex,
  jour,
  exercicesTermines,
  totalExercices,
  challengeTermine,
) {
  if (
    jour > 7 ||
    jour < 0 ||
    totalExercices < 1 ||
    exercicesTermines > totalExercices ||
    exercicesTermines < 0 ||
    apprenantIndex < 0 ||
    apprenantIndex > apprenants.length
  ) {
    return false;
  }
  let Jourindex = TrouverJour_apprenant(
    apprenants[apprenantIndex].resultats,
    jour,
  );
  if (Jourindex != -1) {
    apprenants[apprenantIndex].resultats[Jourindex].exercicesTermines =
      exercicesTermines;
    apprenants[apprenantIndex].resultats[Jourindex].totalExercices =
      totalExercices;
    apprenants[apprenantIndex].resultats[Jourindex].challengeTermine =
      challengeTermine;
    return true;
  } else {
    let nouveauResultats = {
      jour: jour,
      exercicesTermines: exercicesTermines,
      totalExercices: totalExercices,
      challengeTermine: challengeTermine,
    };
    apprenants[apprenantIndex].resultats.push(nouveauResultats);
    return true;
  }
}

function AjouterJourResultats(index, jour) {
  console.log();
}
function Afficher_enregistrerResultat() {
  let apprenantID = ValiderNombre("Entrer l'identifiant d'apprenant: ");
  let apprenantIndex = rechercherApprenant_ParID(apprenantID);

  if (apprenantIndex != -1) {
    let apprenant = apprenants[apprenantIndex];
    console.log("Apprenant trouvé: ", apprenant.nomComplet);
    let jour = ValiderNombre_Entre("Jour (1 à 7): ", 1, 7);
    let totalExercices = ValiderNombre("Total d'exercices proposés: ");
    let exercicesTermines = ValiderNombre_Entre(
      "Exercices terminés : ",
      0,
      totalExercices,
    );
    let challengeTermine =
      prompt("Challenge terminé (oui/non): ").toLowerCase() == "oui"
        ? true
        : false;
    if (
      enregistrerResultat(
        apprenantIndex,
        jour,
        exercicesTermines,
        totalExercices,
        challengeTermine,
      )
    ) {
      console.log("Résultat du jour", jour, " enregistré.");
      calculerProgression(apprenant.id);
    } else {
      console.log(
        "Échec de l'enregistrement des résultats du jour",
        jour,
        "!.",
      );
    }
  } else {
    console.log("Il n'existe aucune personne avec cet identifiant !");
  }
}

//afficherListe_Apprenants();
//console.log(rechercherApprenant(2));
// console.log(Afficher_enregistrerResultat());
// afficherListe_Apprenants();
//calculerProgression(2);
//Afficher_enregistrerResultat();
//Afficher_AjouterApprenant();
//afficherListe_Apprenants();
//console.log(apprenants);
//console.log(rechercherApprenant_ParNom("oussama"));
rechercherApprenant();
//rechercherApprenant();
//rechercherApprenant_ParNom("sara");
