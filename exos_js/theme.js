
// Fonctions de Base & Nettoyage Synchrone

//Ex. 1 - Sauvegarde du Mode Sombree : Écrivez une fonction synchrone
//activerDarkMode() qui stocke la valeur booléenne true dans le localStorage
//sous la clé "user_theme"


function activerDarkMode() {
    localStorage.setItem("user_theme", true)
}

// activerDarkMode()

//Ex. 2 - Chargement du Thème : Écrivez une fonction chargerTheme() qui récupère la valeur de "user_theme"
// Attention : le localStorage retourne une chaîne ;

function chargerTheme() {
    var theme = localStorage.getItem("user_theme")
 //Sinon, elle retourne false par défaut.
    if (!theme){
        theme = false
    }
// si la chaîne est "true", la fonction retourne le booléen true.
    else{
        theme = JSON.parse(theme)
    }

    console.log(theme)
}

// chargerTheme()


//Ex. 3 - Fonction de Réinitialisation : Écrivez une fonction
//reinitialiserPreferences() qui utilise localStorage.removeItem() pour
//effacer spécifiquement la clé "user_theme", simulant l'action de l'utilisateur qui
//réinitialise ses paramètres.


function reinitialiserPreferences(){
    localStorage.removeItem("user_theme")
}

// reinitialiserPreferences()


//Promesses pour la Simulation de Persistance Asynchrone

//Préparation : Utilisez les fonctions sauvegarderThemeAsync(isDark) et
//chargerThemeAsync() qui retournent des Promesses (simulées avec setTimeout).

function sauvegarderThemeAsync(isDark) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            localStorage.setItem("user_theme", JSON.stringify(isDark));
            resolve(); 
        }, 1000);
    });
}

function chargerThemeAsync(){
    return new Promise(function(resolve) {
        setTimeout(function() {
            var value = localStorage.getItem("user_theme");

            if (!value) {
                value = false;
            } else {
                value = JSON.parse(value);
            }
            console.log(value);
            resolve(value);
        }, 1000);
    });
}


//Ex. 1 - Opération de Commutation Sécurisée : Écrivez une fonction
//basculerThemeGlobal(isDark) qui utilise async/await pour :
async function basculerThemeGlobal(isDark) {

//1. Appeler sauvegarderThemeAsync(isDark).
    await sauvegarderThemeAsync(isDark);
//2. Si la sauvegarde réussit, afficher un message de confirmation.
    console.log("Le thème est sombre ?", isDark);
}

// Appel de la fonction qui sauvegarde le thème (asyncrone)
basculerThemeGlobal(true);
// Appel de la fonction qui affiche le thème choisi dans le console.log
chargerThemeAsync();


 
//Ex. 2 - Confirmation d'Effacement : Écrivez une fonction
//demanderReinitialisation() qui retourne une Promesse :
function demanderReinitialisation(){
//1. À l'intérieur de la promesse, vérifiez si l'utilisateur a des données (localStorage.getItem('user_theme')).
     return new Promise(function(resolve, reject) {
        var user = localStorage.getItem('user_theme')
//3. Sinon, appelez reject("Rien à réinitialiser").
        if (!user){
            reject("Rien à réinitialier")
        }
//2. Si des données existent, appelez resolve("Confirmation nécessaire") après 1 seconde.
        else {
            setTimeout(function() {
                resolve("Confirmation nécessaire");
            }, 1000);
        }
     });
}

// Appel de la fonction qui verifie si le localStorage contient quelque chose et affiche un message selon la valeur
// demanderReinitialisation()
//     .then(function(message) {
//         console.log(message);
//     })
//     .catch(function(error) {
//         console.log(error);
//     });


//Ex. 3 - Réinitialisation Asynchrone : Écrivez une fonction mainReinit() qui
//utilise async/await et try...catch pour :
async function mainReinit() {
    try {
//1. Appeler demanderReinitialisation().
        const message = await demanderReinitialisation();
//2. Si la Promesse est résolue, utiliser localStorage.removeItem('user_theme') et afficher "Thème effacé".        
        localStorage.removeItem('user_theme');
        console.log("Thème effacé");
 //3. Si la Promesse est rejetée, afficher le message de l'erreur.      
    } catch(error) {
        console.log(error);
    }
}

// Appel de la fonction qui verifie si le thème est reinitialisé et affiche un message de confirmation ou d'erreur 
mainReinit();

