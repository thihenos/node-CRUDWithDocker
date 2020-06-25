module.exports = function(sequelize, DataTypes) {
  var Job = sequelize.define('job', {

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 255]
      }
    },

    salary: {
      type: DataTypes.DOUBLE,
      length: 8
    }

  });

  return Job
}