import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/database/database.js'

const Organization = sequelize.define('organization', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'organization_id'
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codeArea: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contactName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    legalType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    legalManagerName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    legalManagerId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    legalManagerEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isPrincipal: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    taxId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    supplierList: {
        type: DataTypes.JSON,
        allowNull: true
    },
    userList: {
        type: DataTypes.JSON,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
})

export default Organization;