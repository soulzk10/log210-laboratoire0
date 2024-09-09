import request from 'supertest';
import app from '../../../src/app'; // Assure-toi que c'est le bon chemin vers ton application Express
import { ajouterJoueur, viderJoueurs, obtenirJoueurs } from '../../../src/core/joueurStore'; // Adapté au stockage en mémoire
import 'jest-extended';

describe('GET /api/v1/jeu/redemarrerJeu', () => {
  beforeAll(() => {
    ajouterJoueur('Joueur 1');
    ajouterJoueur('Joueur 2');
  });

  afterAll(() => {
    viderJoueurs();
  });

  it('should successfully restart the game and return status 200 with JSON response', async () => {
    const response = await request(app)
      .get('/api/v1/jeu/redemarrerJeu')
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
  });

  it('should clear all players after the game is restarted', async () => {
    await request(app).get('/api/v1/jeu/redemarrerJeu');

    const joueurs = obtenirJoueurs();
    expect(joueurs).toBeEmpty();
  });
});
