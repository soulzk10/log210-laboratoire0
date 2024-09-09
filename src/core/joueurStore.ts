
import { Joueur } from './joueur';
import { JeuDeDes } from './jeuDeDes';

const joueurs: Joueur[] = [];

export const ajouterJoueur = (nom: string) => {
    const joueur = new Joueur(nom);
    joueurs.push(joueur);
};

export function viderJoueurs() {
    // Assurez-vous que cela appelle bien la méthode de réinitialisation du contrôleur
    const jeu = new JeuDeDes();
    jeu.redemarrerJeu();
}

export const obtenirJoueurs = () => {
    return [...joueurs];
};
