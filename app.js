// require('dotenv').load({ silent: true });

const express = require('express');
const bodyParser = require('body-parser');
const bunnymq = require('bunnymq')({
  host: 'amqp://nzgmkclf:XjPG1TRprZiDChCgreL36AFqA6MxaUMH@lark.rmq.cloudamqp.com/nzgmkclf'
}).producer;

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 3000;

app.enable('trust proxy');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '16mb' }));

app.get('/', (req, res, next) => {
    res.json({ route : '/'});
});

app.get('/commandes', (req, res, next) => {
    
    let queryCmd = `SELECT c.*,
	a.nom AS acheteur_nom, a.prenom AS acheteur_prenom, a.age AS acheteur_age, a.email AS acheteur_email,
	a.civilite_id AS acheteur_civilite, a.statut_id AS acheteur_statut
	FROM commandes AS c
    LEFT JOIN acheteur AS a ON a.id = c.acheteur_id ;`;
    
  bunnymq.produce('sql:query:run', queryCmd, { rpc: true })
  .then((result) => {
      if (!result){
	  return res.status(400);
      }
      res.json(result);
  })
	.catch((err) => {
	    console.error(err);
	    next(err);
	});
});

// Recupere une commande avec un commande ID
app.get('/commandes/:id', (req, res, next) => {

    let queryCmdById = `SELECT c.*,
	a.nom AS acheteur_nom, a.prenom AS acheteur_prenom, a.age AS acheteur_age, a.email AS acheteur_email,
	a.civilite_id AS acheteur_civilite, a.statut_id AS acheteur_statut
    FROM commandes AS c
    LEFT JOIN acheteur AS a ON a.id = c.acheteur_id WHERE c.id = `;

    bunnymq.produce('sql:query:run', queryCmdById + req.params.id, { rpc: true })
	.then((result) => {
	    if (!result){
		return res.status(400);
	    }
	    res.json(result);
	})
        .catch((err) => {
	    console.error(err);
	    next(err);
	});
});

// Recupere toutes les sous commandes avec un commande ID
app.get('/repas_commande/:id', (req, res, next) => {

    let queryRepasCmdWithIdCommande = `SELECT r.*
    FROM repas_commande AS r
    WHERE r.commande_id = `;

    bunnymq.produce('sql:query:run', queryRepasCmdWithIdCommande + req.params.id , { rpc: true })
	.then((result) => {
	    if (!result){
		return res.status(400);
	    }
	    res.json(result);
	})
        .catch((err) => {
	    console.error(err);
	    next(err);
	});
});

// Requette d'import des commandes
app.post('/import', function(req, res, next) {
    const acheteur = req.body.Acheteur;
    const commande = req.body.Film;
    const repas = req.body.Details_commande;

    console.log(JSON.stringify(req.body, null, 2));
    
    
    bunnymq.produce('sql:query:run', `INSERT INTO acheteur (nom, prenom, age, email, civilite_id, statut_id)` +
		                      ` VALUES ('${acheteur.Nom}', '${acheteur.Prenom}', '${acheteur.Age}', '${acheteur.Email}', 2, 1);`, { rpc: true })
        .then((result) => {

	    console.log('result import : ' + result);
	    
	    if (!result){
		return res.status(400);r
	    }

	    return bunnymq.produce('sql:query:run', `INSERT INTO commandes (jour_commande, heure_livraison, type_payement_id, acheteur_id)` +
				   ` VALUES ('${commande.Jour}', '${commande.Horaire_livraison}', 1, ${result.insertId});`, { rpc: true });
	})
	.then((resultCmd) => {
	    console.log('resultCmd import : ' + resultCmd);

	    if (!resultCmd){
		return res.status(400);
	    }

	    let queryRepasCmd = `INSERT INTO repas_commande (commande_id, menu_id, civilite_id, nom, prenom, age, tarif_id) VALUES `;

	    let i = 0;
	    
	    for (i in repas) {
		
		queryRepasCmd += ` ( `;
				     
				     for (y in repas[i]) {
					 console.log(JSON.parse(JSON.stringify(repas[i][y])));	 
					 queryRepasCmd += ` ${resultCmd.insertId}, 3, 2, '${repas[i][y].Nom}', '${repas[i][y].Prenom}', ${repas[i][y].Age}, 1`;
				     }
				     queryRepasCmd += ` )`;
		if (typeof repas[++i] !== 'undefined') {
		    queryRepasCmd += `, `;
		} else {
		    queryRepasCmd += `; `;
		}
	    }
	    
	    return bunnymq.produce('sql:query:run', queryRepasCmd, { rpc: true });
	})
        .then((resultRepasCmd) => {
	    console.log('resultCmd import : ' + resultRepasCmd);

	    if (!resultRepasCmd){
		return res.status(400);
	    }

	    res.status(200).send(resultRepasCmd);
	})
        .catch((err) => {
	    console.error(err);
	    next(err);
	});

});

// Error handling middlewares 404
app.use((err, req, res, next) => {
  if (!err) {
    err = new Error('Not Found');
    err.status = 404;
    err.errors = err.errors || [];
  }

  next(err);
});

// middleware error
app.use((err, req, res, next) => {
  if (!err) return next();

  return res.status(err.status || 500)
  .send({
    message: err.message,
    status: err.status,
    errors: err.errors || []
  });
});

app.listen(PORT, function () {
  console.info('[Health] Web server start listening at: http://%s:%s', 'localhost', PORT);
});

module.exports = app;
