/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('post', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    author_id: {
      type: DataTypes.CHAR(36),
      allowNull: true,
      references: {
        model: 'usr_smile',
        key: 'user_id'
      }
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('publish', 'draft', 'hide'),
      allowNull: false,
      defaultValue: 'draft'
    },
    last_edited_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    last_edited_by: {
      type: DataTypes.CHAR(36),
      allowNull: true
    }
  }, {
      tableName: 'post'
    });
};
