/**
 * PersonController
 *
 * @description :: Server-side logic for managing People
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  wishOverview: function(req, res) {

    var id = req.param("id");
    var now = new Date();

    Wish.find({owner: id}).exec(function (err, records) {

        records.forEach(function(record){

        });


    });


  }

};

