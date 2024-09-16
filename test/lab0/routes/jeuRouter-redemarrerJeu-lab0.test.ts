import request from 'supertest';
import app from '../../../src/app';  

describe('GET /api/v1/jeu/redemarrerJeu', () => {

  // Création de deux joueurs avant l'exécution de tous les tests
  beforeAll(async () => {
    await request(app).post('/api/v1/joueurs').send({ nom: 'Joueur 1' });
    await request(app).post('/api/v1/joueurs').send({ nom: 'Joueur 2' });
  });

  // Test du scénario principal: redémarrer le jeu avec succès
  it('devrait redémarrer le jeu avec succès et retourner un code 200', async () => {
    const response = await request(app).get('/api/v1/jeu/redemarrerJeu');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
  });

  // Test de la postcondition : vérifier qu'il n'y a plus de joueurs après redémarrage
  it('devrait ne plus y avoir de joueurs après le redémarrage', async () => {
    const joueursResponse = await request(app).get('/api/v1/joueurs');
    expect(joueursResponse.status).toBe(200);  
    expect(joueursResponse.body.length).toBe(0);  
  });
  

});
