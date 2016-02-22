function changePrivacyPolicy(req, res, bool) {
  var id = req.param("id");
  var now = new Date();

  if (id == null) {
    res.send(404);

    sails.log("### CHANGE PRIVACY POLICY ERROR - " + now + " ###");
    sails.log("ID is NULL or Undefined");
    sails.log("#########################");
  }
  else {
    Wish.update({id: id}, {private: bool})
      .then(function (wish) {
        res.status(200);
        res.send(wish);
      })
      .catch(function (err) {

        res.send(err);

        var now = new Date();
        sails.log("### CHANGE PRIVACY POLICY ERROR - " + now + " ###");
        sails.log.error(err);
        sails.log("#########################");
      })
  }
}

var Promise = require('bluebird');

/**
 * WishController
 *
 * @description :: Server-side logic for managing Wishes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  finishWish: function (req, res) {

    var id = req.param("id");
    var now = new Date();

    if (id == null) {
      res.send(404);

      sails.log("### FINISH WISH ERROR - " + now + " ###");
      sails.log("ID is NULL or Undefined");
      sails.log("#########################");
    }
    else {
      Wish.update({id: id}, {doneAt: now})
        .then(function (wish) {

          History.create({action: 'COMPLETED', date: now, owner: wish[0].owner, wish: wish[0].id})
            .then(function () {


              Promise.all([
                CommunityWish.find({id: wish[0].MainWish})
              ])
                .spread(function(records){
                  sails.log(records);

                  CommunityWish.update({id: records[0].id}, {numberOfCompleted: records[0].numberOfCompleted+1})
                    .then (function () {

                  })
                    .catch(function() {

                      var now = new Date();
                      sails.log("### CommunityWish numberOfCompleted NOT UPDATED - " + now + " ###");
                    });

                })
                .catch(function(err){
                  console.log(err);
                })
                .done(function(){
                  console.log("Done!");
                });

            })
            .catch(function () {
              var now = new Date();

              sails.log("### CREATED WISH NOT ADDED TO HISTORY TABLE IN FINISH WISH - " + now + " ###");
              sails.log("ID is NULL or Undefined");
              sails.log("#########################");
            });


          res.status(200);
          res.send(wish[0]);
        })
        .catch(function (err) {

          res.send(err);

          var now = new Date();
          sails.log("### FINISH WISH ERROR - " + now + " ###");
          sails.log.error(err);
          sails.log("#########################");
        })
    }
  },

  acceptWish: function (req, res) {

    var id = req.param("id");
    var now = new Date();

    if (id == null) {
      res.send(404);

      sails.log("### ACCEPT SUGGESTION ERROR - " + now + " ###");
      sails.log("ID is NULL or Undefined");
      sails.log("#########################");

    }
    else {
      Promise.all([
        Wish.update({id: id}, {acceptedAt: now, accepted: true})
      ])
        .then(function (wish){

            CommunityWish.findOne({id: wish.MainWish})
              .then(function(res){
                res.numberOfWish += 1;
                res.save(function(err, user) {
                });
            });
        })
        .catch(function (err) {
          sails.log(err);
          sails.log("### ERRO BRUTAL ###");
          sails.log("#########################");
        });
    }
  },

  makePublic: function (req, res) {
    changePrivacyPolicy(req, res, false);
  },

  makePrivate: function (req, res) {
    changePrivacyPolicy(req, res, true);
  }

};

