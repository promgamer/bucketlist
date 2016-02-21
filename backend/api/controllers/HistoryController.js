/**
 * HistoryController
 *
 * @description :: Server-side logic for managing Histories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  PersonHistory: function(req, res){

    var owner = req.param('owner');

    History.find({owner: owner}).populate('owner').populate('wish').exec(function (err, records) {
      var i = 0;
      for(i = 0; i < records.length; i++){

        Wish.find({id: records[i].wish.id}).populate('MainWish').exec(function (err, completewishes) {
          records[i].wish = completewishes[0];
        });

      }
        return res.send(records);
    });

  }

};

