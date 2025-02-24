const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const FormEight = sequelize.define("Form8", {
  firmName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  frn: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  applicationNo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  applicationDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  reviewerAppointedDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  reason: {
    type: DataTypes.ENUM("pandemic", "illness"),
    allowNull: false,
  },
  lastIssuedCertificateDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  extensionFromDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  extensionToDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  partnerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  membershipNo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = FormEight;
