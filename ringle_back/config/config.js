require('dotenv').config();
module.exports =
{
    "production":{
        "username" : process.env.RDS_USERNAME,
        "password" : process.env.RDS_PASSWORD,
        "database" :process.env.RDS_DB_NAME,
        "host" : process.env.RDS_HOSTNAME,
        "dialect":"mysql"

    },
    "development":{
        "username" : process.env.RDS_USERNAME,
        "password" : process.env.RDS_PASSWORD,
        "database" :process.env.RDS_DB_NAME,
        "host" :process.env.RDS_HOSTNAME,
        "dialect":"mysql",
        "ssl": "Amazon RDS",
        "port":3306

    }
}