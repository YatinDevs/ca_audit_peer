const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const FormNine = sequelize.define("FormNine", {
  firmName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  frnNo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  partnerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  memberShipNo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  receivedPeerReviewReportI: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  receivedPeerReviewReportWe: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  declarationDate: {
    type: DataTypes.DATEONLY,
  },
});

module.exports = FormNine;
