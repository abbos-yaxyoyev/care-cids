import dotenv from 'dotenv'
import path from 'path'

dotenv.config(
    {
        path: path.resolve(
            __dirname,
            '../../.env'
        )
    }
)

export const ENV = {
    DB_URL: process.env.DB_URL || 'mongodb://localhost:27017/CARE_KIDS',
    DB_REPLICA_SET: process.env.DB_REPLICA_SET || 'localReplicaSet',
    HOST: process.env.HOST || '0.0.0.0',
    PORT: parseInt(process.env.PORT) || 3000,
    JWT_SECRET: process.env.JWT_SECRET || 'JWT_SECRET',
    JWT_EXPIRE: process.env.JWT_EXPIRE || '1W',
    FIREBASE_SERVER_KEY: process.env.FIREBASE_SERVER_KEY || 'FIREBSE_KIDS_CONTROLLER'
}
