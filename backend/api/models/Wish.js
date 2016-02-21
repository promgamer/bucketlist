/**
 * Wish.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var Promise = require('bluebird');

module.exports = {

  attributes: {
    doneAt: {
      type: 'datetime'
    },

    MainWish: {
      model: 'CommunityWish',
      required: true
    },

    accepted: {
      type: 'boolean',
      defaultsTo: true
    },

    acceptedAt: {
      type: 'datetime'
    },

    private: {
      type: 'boolean',
      defaultsTo: false
    },

    suggestedBy: {
      model: 'Person',
      unique: true
    },

    owner: {
      model: 'Person',
      required: true
    }
  },

  beforeCreate: function (wish, cb) {
    // SET UP DATE (acceptedAt IF NEEDED)

    cb();
  },

  afterCreate: function (createdWish, cb) {
    sails.log(createdWish);

    History.create({action: 'CREATED', date: createdWish.createdAt, owner: createdWish.owner, wish: createdWish.id})
      .then(function () {

        if (createdWish.accepted) {
          Promise.all([
            CommunityWish.find({id: createdWish.MainWish})
          ])
            .spread(function (records) {
              sails.log(records);

              CommunityWish.update({id: records[0].id}, {numberOfWish: records[0].numberOfWish + 1})
                .then(function () {
                  cb();
                })
                .catch(function () {

                  var now = new Date();

                  sails.log("### CommunityWish numberOfCompleted NOT UPDATED - " + now + " ###");
                  sails.log("#########################");
                  cb();
                });


            })
            .catch(function (err) {
              console.log(err);
              cb();
            })
            .done(function () {
              console.log("Done!");
              cb();
            });
        }
      })
      .catch(function () {
        var now = new Date();

        sails.log("### CREATED WISH NOT ADDED TO HISTORY TABLE - " + now + " ###");
        sails.log("#########################");
        cb();
      });
  }
};

