/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('rating', {
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
    view: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    share: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    comment: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    video_rate: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
      timestamps: false,
      tableName: 'rating'
    });
};
