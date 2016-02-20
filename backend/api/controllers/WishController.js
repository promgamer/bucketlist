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
/**
 * WishController
 *
 * @description :: Server-side logic for managing Wishes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  finishWish: function(req, res) {

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
        .then(function (wish){

          History.create({action: 'COMPLETED', date: wish.createdAt, owner: wish.owner, wish: wish.id })
            .then(function() {

            })
            .catch(function() {
              var now = new Date();

              sails.log("### CREATED WISH NOT ADDED TO HISTORY TABLE IN FINISH WISH - " + now + " ###");
              sails.log("ID is NULL or Undefined");
              sails.log("#########################");
            });


          res.status(200);
          res.send(wish);
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

  acceptWish: function(req, res) {

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
        .then(function (wish){
          res.status(200);
          res.send(wish);
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

  makePublic: function(req, res) {
    changePrivacyPolicy(req, res, false);
  },

  makePrivate: function(req, res) {
    changePrivacyPolicy(req, res, true);
  }

};

