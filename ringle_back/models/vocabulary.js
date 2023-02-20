const Sequelize = require('sequelize');

module.exports = class Vocabulary extends Sequelize.Model {
    static init(sequelize) {
      return super.init({
        VocabId : {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        Vocab: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        V_score: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        A_score: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        D_score: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        Desc: {
            type: Sequelize.STRING(300),
            allowNull: true,
        },
      }, {
        sequelize : sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Vocabulary',
        tableName: 'Vocabualaries',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      });
  };
} 