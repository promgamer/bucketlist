/**
 * History.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    wish : { model: 'Wish', required: true },
    owner : { model: 'Person', required: true },
    date : { type: 'datetime', required: true },
    action : { type: 'string', required: true } // CREATED, REMOVED, SUGGESTED, ACCEPTED, COMPLETED
  }
};

