/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'contributor_user',
    {
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
      contribAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      },
      user_id: {
        type: DataTypes.CHAR(36),
        allowNull: false
      }
    },
    {
      timestamps: false,
      tableName: 'contributor_user'
    }
  );
};
