const prompt = require("prompt-sync")();
function attendreTouche() {
  prompt("\nAppuyez sur Entrée pour revenir au menu...");
}
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
      {
        jour: 5,
        exercicesTermines: 17,
        totalExercices: 20,
        challengeTermine: true,
      },
    ],
  },
  {
    id: 2,
    nomComplet: "Ismail Nadori",
    ville: "Nador",
    resultats: [
      {
        jour: 1,
        exercicesTermines: 2,
        totalExercices: 20,
        challengeTermine: false,
      },
      {
        jour: 4,
        exercicesTermines: 8,
        totalExercices: 20,
        challengeTermine: true,
      },
      {
        jour: 7,
        exercicesTermines: 1,
        totalExercices: 20,
        challengeTermine: false,
      },
    ],
  },
  {
    id: 3,
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

let id = 4;

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
    const obj = {
      apprenantID: apprenantID,
      exercicesTerminesCount: exercicesTerminesCount,
      totalExercicesCount: totalExercicesCount,
      challengeTermineCount: challengeTermineCount,
      Journees_renseignees: Journees_renseignees,
      progression: progression,
    };
    return obj;
  } else {
    console.log("L'apprenant n'existe pas!");
    return -1;
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
  console.log(
    "------------------------------------------------------------------",
  );
  console.log("\t\t\tEnregistrer les résultats d'un apprenant.");
  console.log(
    "------------------------------------------------------------------",
  );
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
function trierParProgression() {
  let arr = [];
  for (let index = 0; index < apprenants.length; index++) {
    let apprenant = apprenants[index];
    const obj = {
      ID: apprenant.id,
      nomComplet: apprenant.nomComplet,
      ville: apprenant.ville,
      progression: calculerProgression(apprenant.id).progression,
    };
    arr.push(obj);
  }
  return arr.length == 0
    ? null
    : arr.sort((a, b) => b.progression - a.progression);
}
function Afficher_trierParProgression() {
  console.log("==============================================");
  console.log("     APPRENANTS — PROGRESSION DÉCROISSANTE");
  console.log("==============================================");
  let arr = trierParProgression();
  for (let index = 0; index < arr.length; index++) {
    console.log(index + 1, ". ID :", arr[index].ID);
    console.log("    Nom Complet :", arr[index].nomComplet);
    console.log("    Progression :", arr[index].progression);
    console.log("\n");
  }
}
function filtrerParNiveau(niveau) {
  let arr = [];

  for (let index = 0; index < apprenants.length; index++) {
    if (niveau === 1) {
      let progression = calculerProgression(apprenants[index].id).progression;
      if (progression >= 80) {
        arr.push({
          ID: apprenants[index].id,
          nom: apprenants[index].nomComplet,
          ville: apprenants[index].ville,
          progression: progression,
        });
      }
    } else if (niveau === 2) {
      let progression = calculerProgression(apprenants[index].id).progression;
      if (progression >= 50 && progression < 80) {
        arr.push({
          ID: apprenants[index].id,
          nom: apprenants[index].nomComplet,
          ville: apprenants[index].ville,
          progression: progression,
        });
      }
    } else if (niveau === 3) {
      let progression = calculerProgression(apprenants[index].id).progression;
      if (progression < 50) {
        arr.push({
          ID: apprenants[index].id,
          nom: apprenants[index].nomComplet,
          ville: apprenants[index].ville,
          progression: progression,
        });
      }
    }
  }
  return arr.length === 0 ? null : arr;
}
function afficher_filtrerParNiveau() {
  console.log(
    "------------------------------------------------------------------",
  );
  console.log("\t\t\tFiltrer Par Niveau:");
  console.log(
    "------------------------------------------------------------------",
  );
  const LesNiveaux = { 1: "solide", 2: "En progression", 3: "À renforcer" };
  let choix = ValiderNombre_Entre(
    "Choisissez un niveau : Solide [1] | En progression [2] | À renforcer [3] ? Votre choix : ",
    1,
    3,
  );
  let arr = filtrerParNiveau(choix);
  console.log("Niveau:", LesNiveaux[choix]);
  console.log("Nombre d'apprenants:", arr.length);
  console.log(
    "------------------------------------------------------------------",
  );
  for (let index = 0; index < arr.length; index++) {
    console.log("\t\tL'apprenant Avec Identifiant: {", arr[index].ID, "}");
    console.log("Nom complet: ", arr[index].nom);
    console.log("Ville: ", arr[index].ville);
    console.log("Progression: ", arr[index].progression);
    console.log(
      "------------------------------------------------------------------",
    );
  }
}
function DonneesManquants_Apprenants(apprenantID) {
  let apprenant = apprenants[rechercherApprenant_ParID(apprenantID)];
  const DonnesManqauntsTab = {
    challengsemanquantsCount: [],
    JoursmanquantsCount: [],
  };

  for (let Jour = 1; Jour <= 7; Jour++) {
    let JourIndex = TrouverJour_apprenant(apprenant.resultats, Jour);
    if (JourIndex == -1) {
      DonnesManqauntsTab.challengsemanquantsCount.push(Jour);
      DonnesManqauntsTab.JoursmanquantsCount.push(Jour);
    } else {
      if (!apprenant.resultats[JourIndex].challengeTermine) {
        DonnesManqauntsTab.challengsemanquantsCount.push(Jour);
      }
    }
  }
  return DonnesManqauntsTab;
}
function afficherTableauDeBord() {
  let arr = trierParProgression();
  console.log("================================");
  console.log("        Tableau De Bord");
  console.log("================================");
  let nb_apprenants = apprenants.length;
  let progression = 0;
  arr.forEach((element) => {
    progression += element.progression;
  });
  progression = progression / nb_apprenants;
  console.log("\n\nApprenants: ", nb_apprenants);
  console.log("Progression moyenne: ", progression, "%");
  console.log("\nNiveaux: ");
  console.log("Solide: ", filtrerParNiveau(1)?.length);
  console.log("En progression: ", filtrerParNiveau(2)?.length);
  console.log("A renforcer: ", filtrerParNiveau(3)?.length);

  console.log("\n\n-------------- Progression -------------");
  for (let index = 0; index < arr.length; index++) {
    console.log(
      index + 1,
      ".",
      arr[index].nomComplet,
      ": ",
      arr[index].progression,
      "%",
    );
  }
  console.log("\n\n----------- Donnees manquants ------------");
  arr.forEach((element) => {
    const DonneesManqaunts = DonneesManquants_Apprenants(element.ID);
    console.log(element.nomComplet, ": ");
    console.log(
      "\tJours Manquants     : ",
      DonneesManqaunts.JoursmanquantsCount.join(", "),
    );
    console.log(
      "\tChallenges Manquants: ",
      DonneesManqaunts.challengsemanquantsCount.join(", "),
    );
    console.log("\n");
  });
}
function HandleUserchoice(choice) {
  switch (choice) {
    case 1:
      console.clear();
      afficherTableauDeBord();
      attendreTouche();
      break;
    case 2:
      console.clear();
      afficherListe_Apprenants();
      attendreTouche();
      break;
    case 3:
      console.clear();
      Afficher_AjouterApprenant();
      attendreTouche();
      break;
    case 4:
      console.clear();
      rechercherApprenant();
      attendreTouche();
      break;
    case 5:
      console.clear();
      Afficher_enregistrerResultat();
      attendreTouche();
      break;
    case 6:
      console.clear();

      attendreTouche();
      break;
    case 7:
      console.clear();
      afficher_filtrerParNiveau();
      attendreTouche();
      break;
    case 8:
      console.clear();
      Afficher_trierParProgression();
      attendreTouche();
      break;
    case 9:
      console.clear();
      //Tri par ordre alphabétique
      attendreTouche();
      break;
    default:
      break;
  }
}
function Start() {
  let choix = 0;
  do {
    console.clear();
    console.log("SAS PROGRESS CONSOLE");
    console.log("1.	Afficher le tableau de bord");
    console.log("2.	Afficher la liste des apprenants");
    console.log("3.	Ajouter un apprenant");
    console.log("4.	Consulter un apprenant par identifiant");
    console.log("5.	Ajouter ou modifier le résultat d'une journée");
    console.log("6.	Rechercher un apprenant par nom");
    console.log("7.	Filtrer les apprenants par niveau");
    console.log("8.	Trier les apprenants par progression décroissante");
    console.log("9.	Trier les apprenants par ordre alphabétique");
    console.log("0.	Quitter");
    choix = ValiderNombre_Entre("Votre Choix: ", 0, 9);
    HandleUserchoice(choix);
  } while (choix != 0);
}
//afficherListe_Apprenants();
//console.log(rechercherApprenant(2));
// console.log(Afficher_enregistrerResultat());
// afficherListe_Apprenants();
//calculerProgression(2);
//Afficher_enregistrerResultat();
// Afficher_AjouterApprenant();
// Afficher_enregistrerResultat();
//afficherListe_Apprenants();
//console.log(apprenants);
//console.log(rechercherApprenant_ParNom("oussama"));
//rechercherApprenant();
//rechercherApprenant();
//rechercherApprenant_ParNom("sara");
//console.table(trierParProgression());
//afficherListe_Apprenants();
Start();
//trierParProgression();
//afficherTableauDeBord();
