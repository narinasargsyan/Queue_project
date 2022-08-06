'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.createTable('Queues', { 
      id: { 
          primaryKey: true, 
          autoIncrement: true, 
          allowNull: false, 
          type: DataTypes.INTEGER, 
      },
      userId: { 
          type: DataTypes.INTEGER, 
          allowNull: false, 
          references: { 
            model: { 
              tableName:"Users", 
              schema: 'public' 
            }, 
            key: 'id' 
          } 
      }, 
      workerId: {
          type: DataTypes.INTEGER, 
          allowNull: true,
          references: { 
              model: { 
                tableName:"Users", 
                schema: 'public' 
              }, 
              key: 'id' 
            } 
      },
      status: {
          type: DataTypes.INTEGER, 
          default: 0,
          allowNull: false,  
      },
       
    });

  },

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('Queues');
  }
};
