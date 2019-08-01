/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('usr_smile', {
    user_id: {
      type: DataTypes.CHAR(36),
      allowNull: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    joinAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    lastEditedAt: {
      type: DataTypes.DATE,
      allowNull: true

    },
    fullname: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    isAdmin: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
      timestamps: false,
      tableName: 'usr_smile'
    });
};
