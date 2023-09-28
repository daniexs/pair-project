'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patient.belongsTo(models.User)
      //Patient.hasMany(models.PatientDisease,{foreignKey: 'PatientId'})
      Patient.belongsToMany(models.Disease, {through: models.PatientDisease})
    }
    get dateFormat(){
      return this.dateOfBirth.toISOString().split('T')[0]
    }
  }
  Patient.init({
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Nama Tidak Boleh Kosong"
        },
        notEmpty: {
          msg: "Nama Tidak Boleh Kosong"
        }
      }
    },
    address: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Alamat Tidak Boleh Kosong"
        },
        notEmpty: {
          msg: "Alamat Tidak Boleh Kosong"
        }
      }
    },
    age: DataTypes.INTEGER,
    dateOfBirth: {
      type:DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "TTL Tidak Boleh Kosong"
        },
        notEmpty: {
          msg: "TTL Tidak Boleh Kosong"
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Patient',
  });
  Patient.beforeCreate((patient)=>{
      const today = new Date();
      const age = today.getFullYear() - patient.dateOfBirth.getFullYear() - 
                  (today.getMonth() < patient.dateOfBirth.getMonth() || 
                  (today.getMonth() === patient.dateOfBirth.getMonth() && today.getDate() < patient.dateOfBirth.getDate()));
      patient.age = age
  }),
  Patient.beforeUpdate((patient)=>{
    const today = new Date();
    const age = today.getFullYear() - patient.dateOfBirth.getFullYear() - 
                (today.getMonth() < patient.dateOfBirth.getMonth() || 
                (today.getMonth() === patient.dateOfBirth.getMonth() && today.getDate() < patient.dateOfBirth.getDate()));
    patient.age = age
})
  return Patient;
};