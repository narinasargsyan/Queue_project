const { DataTypes} = require('sequelize'); 

const userModel = { 
    id: { 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false, 
        type: DataTypes.INTEGER, 
    }, 
    fullname: {
        type: DataTypes.STRING, 
        allowNull: false, 
    },
    email: { 
        type: DataTypes.STRING, 
        allowNull: false, 
    }, 
    password: { 
        type: DataTypes.STRING, 
        allowNull: true, 
    },
    phone:{ 
        type: DataTypes.STRING, 
        allowNull: false, 
    },
    role:{
        type: DataTypes.STRING, 
        allowNull: false, 
    },
    createdAt: { 
      type: DataTypes.DATE, 
      defaultValue: DataTypes.NOW, 
    }, 
    updateAt:{ 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
    } 
  }; 
   
  const userOptions = { 
    timestamps: false, 
    schema: 'public', 
    freezeTableName: true, 
  }; 
 
  const UserAssociate = (db) =>{ 
    db.Users.hasMany(db.Queues, {
        foreignKey: 'userId',
        as: 'UserQueue'
    }); 
  };
   
  module.exports = (seq) => { 
    const model = seq.define('Users', userModel, userOptions); 
    model.associate = UserAssociate; 
    return model; 
  };