// Si vous modifiez ce fichier, exécutez "npm run build" pour que votre server utilise la nouvelle version. Sinon le navigateur conserve l'ancienne version en cache.
window.addEventListener("load", function()
{
    // Gestion des clics pour les boutons "Lancer"
    document.querySelectorAll("button.lancer").forEach(function(element)
    {
        element.addEventListener("click", function()
        {
            fetch("/api/v1/jeu/jouer/" + this.id)
            .then(function(response)
            {
                if (response.ok) {
                    location.reload();
                } else {
                    console.error('Erreur lors du lancer de dés');
                }
            });
        });
    });

    // Gestion des clics pour les boutons "Terminer"
    document.querySelectorAll("button.terminer").forEach(function(element)
    {
        element.addEventListener("click", function()
        {
            fetch("/api/v1/jeu/terminerJeu/" + this.id)
            .then(function(response)
            {
                if (response.ok) {
                    location.reload();
                } else {
                    console.error('Erreur lors de la fin du jeu');
                }
            });
        });
    });

    // Gestion du bouton "Démarrer"
    const demarrer = document.getElementById("demarrer");
    const formNouveauJoueur = document.getElementById("formNouveauJoueur");

    demarrer.addEventListener("click", function()
    {
        const nomDuFormulaire = formNouveauJoueur.elements["nom"].value.trim();

        if (nomDuFormulaire.length > 0)
        {
            fetch("/api/v1/jeu/demarrerJeu", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({nom: nomDuFormulaire})
            }).then(function(response)
            {
                if (response.ok) {
                    location.reload();
                } else {
                    console.error('Erreur lors du démarrage du jeu');
                }
            });
        }
        else
        {
            alert("Spécifier un nom, SVP.");
        }
    });

    // Gestion du bouton "Redémarrer"
    document.getElementById("redemarrer").addEventListener("click", function()
    {
        fetch("/api/v1/jeu/redemarrerJeu")
        .then(function(response)
        {
            if (response.ok) {
                location.reload();
            } else {
                console.error('Erreur lors du redémarrage du jeu');
            }
        });
    });
});
