'use strict'
const { Model } = require('sequelize')
const { encrypt, decrypt } = require('../middleware/cryptoUtils')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Ticket, {
        foreignKey: 'userId'
      })
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      fullName: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue('fullName')
          return decrypt(rawValue)
        },
        set(val) {
          this.setDataValue('fullName', encrypt(val))
        }
      },
      passwordDigest: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users'
    }
  )
  return User
}
