import { InvalidParameterError } from './errors/invalidParameterError';

export class Joueur {
    // Classe inspirée de la classe conceptuelle (du MDD)
    private _nom: string;
    private _nbLancers: number;
    private _nbLancersGagnes: number;

    constructor(nom: string) {
        this._nom = this.assainirNom(nom);
        this._nbLancers = 0;
        this._nbLancersGagnes = 0;
    }

    get nom() {
        return this._nom;
    }

    /**
     * Assainir (sanitize) le nom.
     * Il serait préférable d'avoir un mutateur privé, mais TypeScript n'aime pas ça
     * @param nom Le nom à assainir
     * @return Le nom, sans espaces blancs au début ou à la fin
     */
    private assainirNom(nom: string) {
        nom = nom.trim();

        if (nom.length == 0) {
            throw new InvalidParameterError('Le nom ne peut pas être vide');
        }

        return nom;
    }

    get lancers() {
        return this._nbLancers;
    }

    get lancersGagnes() {
        return this._nbLancersGagnes;
    }

    /**
     * Retourne le ratio de succès.
     * @return Le ratio, ou 0 si aucun lancer n'a été effectué
     */
    get ratio(): number {
        if (this._nbLancers === 0) {
            return 0; 
        }
        return this._nbLancersGagnes / this._nbLancers;
    }

    public lancer() {
        this._nbLancers++;
    }

    public gagner() {
        this._nbLancersGagnes++;
    }

    public toJSON() {
        // Exclure le ratio du JSON retourné pour correspondre aux attentes des tests
        return {
            nom: this.nom,
            lancers: this.lancers,
            lancersGagnes: this.lancersGagnes
        };
    }
}
