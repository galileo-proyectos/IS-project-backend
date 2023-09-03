import mysql from 'mysql2';

export {};

declare global {
  namespace DB {
    interface DBUser {
      username: string;
      password: string;
    }
    type OkPacket = mysql.OkPacket;
    type RowDataPacket = mysql.RowDataPacket;
    type QueryResult = 
      mysql.RowDataPacket[] 
    | mysql.RowDataPacket[][] 
    | mysql.OkPacket 
    | mysql.OkPacket[] 
    | mysql.ResultSetHeader;
  }
}