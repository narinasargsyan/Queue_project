const { DataTypes} = require('sequelize'); 

const queueModel = { 
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
     
  }; 
   
  const queueOptions = { 
    timestamps: false, 
    schema: 'public', 
    freezeTableName: true, 
  }; 
 
  const QueueAssociate = (db) => { 
    db.Queues.belongsTo(db.Users, {
        foreignKey: 'userId',
        as: 'QueueUser'
    });
   };
   
  module.exports = (seq) => { 
    const model = seq.define('Queues', queueModel, queueOptions); 
    model.associate = QueueAssociate; 
    return model; 
  };