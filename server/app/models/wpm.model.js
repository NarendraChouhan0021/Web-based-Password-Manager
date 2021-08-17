module.exports = (sequelize, Sequelize) => {
  const WPM = sequelize.define("wpms",
    {
      _id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      website_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        field: "created_at",
        type: "TIMESTAMP",
      },
      updatedAt: {
        allowNull: false,
        field: "updated_at",
        type: "TIMESTAMP",
      }
    },
    {
      timestamps: true,
      underscored: true,
    }
  );

  return WPM;
};
