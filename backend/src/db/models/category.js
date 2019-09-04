module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'category',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      parentId: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      }
    },
    {
      timestamps: false,
      tableName: 'category'
    }
  );
};
