const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("defaultdb", "avnadmin", AVNS_4xFjyA2BJV1KR3_aG4 -, {
    host: "bookingcare-chinh.a.aivencloud.com",
    port: 23879,
    dialect: "mysql",
    logging: false,
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

export default connectDB;
