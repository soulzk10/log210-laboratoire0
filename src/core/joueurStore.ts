import { Joueur } from './joueur';
import { JeuDeDes } from './jeuDeDes';

const joueurs: Joueur[] = [];

// Ajout d'un joueur
export const ajouterJoueur = (nom: string) => {
    const joueur = new Joueur(nom);
    joueurs.push(joueur);
};

// Vider les joueurs et redémarrer le jeu
export function viderJoueurs() {
    const jeu = new JeuDeDes();
    jeu.redemarrerJeu();
}

// Obtenir les joueurs avec leurs ratios calculés
export const obtenirJoueurs = () => {
    const joueursAvecRatio = joueurs.map(joueur => ({
        ...joueur,
        ratio: joueur.lancers > 0 ? joueur.lancersGagnes / joueur.lancers : 0
    }));
    return [...joueursAvecRatio];
};
