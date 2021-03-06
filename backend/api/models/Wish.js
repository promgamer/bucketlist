/**
 * Wish.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var Promise = require('bluebird');

function insertInHistoryAndUpdateCommunityWish(createdWish, cb, action) {
  Promise.all([
    CommunityWish.findOne({id: createdWish.MainWish}),
    History.create({action: action, date: createdWish.createdAt, owner: createdWish.owner, wish: createdWish.id})
  ])
    .then(function (cw) {
      if (createdWish.accepted) {

        Wish.find({MainWish: createdWish.MainWish, active: true, accepted: true})
          .then(function (res) {
            cw[0].numberOfWish = res.length;
            cw[0].save(function (err, user) {
            });
            cb();
          })
          .catch(function (err) {
            sails.log(err);
            cb();
          });
      }
      else {
        cb();
      }
    })
    .catch(function (err) {
      sails.log(err);
      sails.log("### ERRO BRUTAL ###");
      sails.log("#########################");
      cb();
    });
}
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
      model: 'Person'
    },

    owner: {
      model: 'Person',
      required: true
    },

    active: {
      type: 'boolean',
      defaultsTo: true
    }
  },

  beforeCreate: function (wish, cb) {
    // SET UP DATE (acceptedAt IF NEEDED)
    /*
     if(wish.suggestedBy != null)
     {
     wish.acceptedAt = new Date();
     }
     */
    cb();
  },

  afterCreate: function (createdWish, cb) {
    if (createdWish.accepted) {
      insertInHistoryAndUpdateCommunityWish(createdWish, cb, 'CREATED');
    }
    else {
      insertInHistoryAndUpdateCommunityWish(createdWish, cb, 'SUGGESTED');
    }
  }
};

