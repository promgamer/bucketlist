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

  findWithHistory: function(req, res){

    var ownerid = req.param('id');
    var i = 0;

    Wish.find({id: ownerid}).populate('owner').populate('suggestedBy').populate('MainWish').exec(function (err, records) {
        for(i = 0; i < records.length; i++){
          var mwID = records[i].MainWish;
          var total;
          var completed;

          Wish.find({MainWish: mwID}).exec(function (err, r1) { //total
            console.log(err);
            total = r1.length;
          });

          Wish.find({MainWish: mwID, doneAt: { '!': null }}).exec(function (err, r2) { //completed
            completed = r2.length;
          });

          records[i].total = total;
          records[i].completed = completed;
        }

      res.send(records);
    });
  },

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

          History.create({action: 'COMPLETED', date: now, owner: wish[0].owner, wish: wish[0].id })
            .then(function() {

            })
            .catch(function() {
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

