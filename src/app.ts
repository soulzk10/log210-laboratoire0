import express from 'express';
import ExpressSession from 'express-session';
import logger from 'morgan';
import flash from 'express-flash-plus';
import { jeuRoutes } from './routes/jeuRouter';
import { Joueur } from './core/joueur';

class App {

  public expressApp: express.Application;

  constructor() {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.expressApp.set('view engine', 'pug');
    this.expressApp.use(express.static(__dirname + '/public') as express.RequestHandler);
  }

  private middleware(): void {
    this.expressApp.use(logger('dev') as express.RequestHandler);
    this.expressApp.use(express.json() as express.RequestHandler);
    this.expressApp.use(express.urlencoded({ extended: false }) as express.RequestHandler);
    this.expressApp.use(ExpressSession(
      {
        secret: 'My Secret Key',
        resave: false,
        saveUninitialized: true
      }));
    this.expressApp.use(flash());
  }

  private routes(): void {
    const titreBase = 'Jeu de dés';
    let router = express.Router();
    let user;
    user = { nom: 'Pierre Trudeau', hasPrivileges: true, isAnonymous: false };

    router.get('/', (req, res, next) => {
      res.render('index',
        {
          title: `${titreBase}`,
          user: user,
          joueurs: JSON.parse(jeuRoutes.controleurJeu.joueurs)
        });
    });

    router.get('/stats', (req, res, next) => {
      const joueurs: Array<Joueur> = JSON.parse(jeuRoutes.controleurJeu.joueurs);
      // Calculer le ratio et créer un nouveau tableau
      const joueursAvecRatio = joueurs.map(joueur => ({
        ...joueur,
        ratio: joueur.ratio // Calculer le ratio pour chaque joueur
      }));
      // Trier le tableau par ratio décroissant
      joueursAvecRatio.sort((a, b) => (b.ratio || 0) - (a.ratio || 0));
      res.render('stats',
        {
          title: `${titreBase}`,
          user: user,
          joueurs: joueursAvecRatio
        });
    });

    router.get('/signin', async function (req, res) {
      if (user.isAnonymous) {
        res.render('signin', {
          title: `${titreBase}`
        })
      } else {
        return res.redirect('/');
      }
    });

    router.get('/signout', async function (req, res) {
      user = { isAnonymous: true };
      return res.redirect('/');
    });

    this.expressApp.use('/', router);
    this.expressApp.use('/api/v1/jeu', jeuRoutes.router);
  }

}

export default new App().expressApp;
