/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comment', {
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
    userId: {
      type: DataTypes.CHAR(36),
      allowNull: true,
      references: {
        model: 'usr_smile',
        key: 'user_id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    reply: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    reply_for_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'comment',
        key: 'id'
      }
    }
  }, {
    tableName: 'comment'
  });
};
