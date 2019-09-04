module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'category_node',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      postId: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: 'post',
          key: 'id'
        }
      },
      categoryId: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: 'category',
          key: 'id'
        }
      }
    },
    {
      timestamps: false,
      tableName: 'category_node'
    }
  );
};
