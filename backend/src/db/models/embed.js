/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('embed', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    postId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'post',
        key: 'id'
      }
    },
    thumbnail: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    video: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'embed'
  });
};
