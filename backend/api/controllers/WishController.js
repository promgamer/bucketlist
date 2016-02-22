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

  /*findWithHistory: function (req, res) {

    var ownerid = req.param('id');
    var i = 0;

    Wish.find({owner: ownerid}).populate('owner').populate('suggestedBy').populate('MainWish')
      .then(function (toreturn) {

        for (i = 0; i < toreturn.length; i++) {

          var mwID = toreturn[i].MainWish.id;

          Promise.all([
            Wish.find({MainWish: mwID}),
            Wish.find({MainWish: mwID, doneAt: {'!': null}}),
            i
          ])
            .spread(function (total, completed, index) {
              toreturn[index].completed;
              toreturn[index].total;
            })
            .catch(function (err) {
              console.log(err);
            })
            .done(function () {
              console.log("Done!");
            });

        }
        toreturn[0].fuck = 100;
        res.send(toreturn);
      })
      .catch(function (err) {
        sails.log.error(err);
      });
  },*/

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

  mostUsedWish: function(req, res) {
    var now = new Date();

    CommunityWish.find({sort: 'numberOfWish DESC', limit: 10}).exec(function (err, suggestions)
    {
      if(err) {
        res.status(400);
        return res.negotiate(err);
      }
      res.status(200);
      return res.send(suggestions);
    });
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
      Wish.update({id: id}, {acceptedAt: now, accepted: true})
        .then(function (wish) {


          Promise.all([
            CommunityWish.find({id: createdWish.MainWish})
          ])
            .spread(function (records) {
              sails.log(records);

              CommunityWish.update({id: records[0].id}, {numberOfWish: records[0].numberOfWish + 1})
                .then(function () {
                  res.status(200);
                  res.send(wish);
                })
                .catch(function () {

                  var now = new Date();

                  sails.log("### CommunityWish numberOfCompleted NOT UPDATED - " + now + " ###");
                  sails.log("#########################");
                  res.status(200);
                  res.send(wish);
                });
            })
            .catch(function (err) {
              console.log(err);
              res.status(200);
              res.send(wish);
            })
            .done(function () {
              console.log("Done!");
              res.status(200);
              res.send(wish);
            });
        })
        .catch(function (err) {

          res.send(err);

          var now = new Date();
          sails.log("### ACCEPT SUGGESTION ERROR - " + now + " ###");
          sails.log.error(err);
          sails.log("#########################");
        })
    }
  },

  makePublic: function (req, res) {
    changePrivacyPolicy(req, res, false);
  },

  makePrivate: function (req, res) {
    changePrivacyPolicy(req, res, true);
  }

};

