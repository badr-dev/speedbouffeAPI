var mysql   = require("mysql");

function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes = function(router,connection,md5) {
    var self = this;
    router.get("/",function(req,res){
        res.json({"Message" : "SpeedBouffe REST API"});
    });

    router.get("/commandes",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["commandes"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows) {
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Commandes" : rows});
            }
        });
    });

    router.get("/commandes/:id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["commandes","id",req.params.id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Commandes" : rows});
            }
        });
    });

    router.get("/acheteur", function(req, res){
        var query = "SELECT * FROM ??";
        var table = ["acheteur"];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
    });

    router.post("/import", function(req, res) {
        // Create user
        var q_user = "INSERT INTO ??(??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?)";
        var t_user = [
            "acheteur",
            "nom", 
            "prenom", 
            "age", 
            "email", 
            "civilite_id", 
            "statut_id",
            req.body.Acheteur.Nom,
            req.body.Acheteur.Prenom,
            req.body.Acheteur.Age,
            req.body.Acheteur.Email,
            2,
            1
        ];
        
        q_user = mysql.format(q_user, t_user);
        connection.query(q_user, function(err, rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                var id_user = 1;
                res.json({"Error" : false, "Message" : "User Added !"});
            }
        });
  
        // Create commands

        var q_order = "INSERT INTO ??(??, ??, ??, ??) VALUES (?, ?, ?, ?)";
        var t_order = [
            "commandes",
            "jour_commande", 
            "heure_livraison", 
            "type_payement_id", 
            "acheteur_id", 
            req.body.Film.Jour,
            req.body.Film.Horaire_livraison,
            1,
            id_user
        ];
        
        q_order = mysql.format(q_order, t_order);
        connection.query(q_order, function(err, rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Order Added !"});
            }
        });

        // Create commands details
        
        // TODO
    });

    router.post("/users",function(req,res){
        var query = "INSERT INTO ??(??,??) VALUES (?,?)";
        var table = ["user_login","user_email","user_password",req.body.email,md5(req.body.password)];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "User Added !"});
            }
        });
    });

    router.put("/users",function(req,res){
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table = ["user_login","user_password",md5(req.body.password),"user_email",req.body.email];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated the password for email "+req.body.email});
            }
        });
    });

    router.delete("/users/:email",function(req,res){
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["user_login","user_email",req.params.email];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Deleted the user with email "+req.params.email});
            }
        });
    });
}

module.exports = REST_ROUTER;
