/**
 * HistoryController
 *
 * @description :: Server-side logic for managing Histories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var populate = function(record, idWish){

    return new Promise(function(resolve, reject){

      Wish.find({id: idWish}).populate('MainWish')
        .then(function(completewishes){
          resolve(completewishes[0]);
        })
        .catch(function(err){
          sails.log.error(err);
          reject();
        });
    });
}



module.exports = {

  PersonHistory: function(req, res){

    var owner = req.param('owner');

    History.find({owner: owner}).sort('date DESC').populate('owner').then(function(records) {
      var objs = [];

      for(i = 0; i < records.length; i++){
        objs.push(
                  populate(records[i], records[i].wish)
        );
      }

      Promise.all(objs)
        .then(function (dataarray){
          console.log(dataarray);
          var i = 0;

          for(i = 0; i < dataarray.length; i++){
            records[i].wish = dataarray[i];
          }

          return res.send(records);
        });
    });
  }
};

