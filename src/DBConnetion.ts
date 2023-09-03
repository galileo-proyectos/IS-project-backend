import mysql from 'mysql2';
import { Pool } from 'mysql2';

// super class
class DB {
  static pool: Pool | null;

  static init (user: DB.DBUser) {
    DB.pool = mysql.createPool({
      connectionLimit : 10,
      host: process.env.DB_HOST,
      user: user.username,
      password: user.password,
      database: process.env.DB_NAME,
      typeCast: function (field, next) {
        if (field.type === 'NEWDECIMAL' || field.type === 'DECIMAL') {
          const value = field.string();
          return value === null ? null : Number(value);
        }
        return next();
      }
    });
  }
  protected query(sql: string, data:any=null): Promise<DB.QueryResult> {
    return new Promise((res, rej) => {
      if (DB.pool !== null) {
        DB.pool.query(sql, data, (err, result: DB.QueryResult) => {
          if (err) {
            if (process.env.NODE_ENV === 'development') {
              console.error(`[ERROR]: ${sql}`);
            }
            rej(err);
          };
          res(result);
        });
      } else {
        rej(new Error('DB not initialized'));
      }
    });
  }
}

// init pool connection
const rootUser: DB.DBUser = {
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!
}
DB.init(rootUser);

// export all db controllers
export default DB;
