/**
 * Wish.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    doneAt : {
      type: 'datetime'
    },

    MainWish: {
      model: 'CommunityWish',
      required: true
    },

    accepted : {
      type: 'boolean',
      defaultsTo: true
    },

    acceptedAt : {
      type: 'datetime'
    },

    private : {
      type: 'boolean',
      defaultsTo: false
    },

    suggestedBy : {
      model:'Person'
    },

    owner : {
      model: 'Person',
      required: true
    }
  },

  beforeCreate: function(wish, cb) {
    // SET UP DATE (acceptedAt IF NEEDED)

    cb();
  },

  afterCreate: function (createdWish, cb) {
    History.create({action: 'CREATED', date: createdWish.createdAt, owner: createdWish.owner, wish: createdWish.id })
      .then(function() {
        cb();
      })
      .catch(function() {
        var now = new Date();

        sails.log("### CREATED WISH NOT ADDED TO HISTORY TABLE - " + now + " ###");
        sails.log("ID is NULL or Undefined");
        sails.log("#########################");
        cb();
      });
  }
};

