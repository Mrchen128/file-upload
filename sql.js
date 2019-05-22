const Sequelize = require('sequelize');
const sequelize = new Sequelize('nodesql', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

});
const User = sequelize.define('img', {
    imgurl: {
      type: Sequelize.STRING
    },
  });


  module.exports=User;

  
