import DB from '../DBConnetion';
import ClientError from '../utils/ClientError';

export default class AccountsDAO extends DB {
  public static async create (data: Create.User): Promise<number> {
    const sql = `INSERT INTO users SET ?`;
    const { insertId } = await this.query(sql, {
      email: data.email,
      bornDate: data.bornDate !== null ? new Date(data.bornDate) : null,
      phone: data.phone,
      acceptPromotions: data.acceptPromotions,
      acceptTerms: data.acceptTerms
    }) as DB.OkPacket;
    return insertId;
  }

  public static async changePassword (userId: number, password: string) {
    const sql = `
      UPDATE users SET password='${password}'
      WHERE id=${userId}
      LIMIT 1
    `;
    await this.query(sql);
  }

  /**
   * This method is used to verify all users' emails are unique.
   * @param email user's email
   * @returns true if the email is already used, false if not.
   */
  public static async existsEmail (email: string): Promise<boolean> {
    const sql = `
      SELECT id
      FROM users
      WHERE email='${email}'
      LIMIT 1`;
      const data = await this.query(sql) as DB.RowDataPacket[];
      return data.length !== 0;
  }

  /**
   * This method is used to read hashed passwords from db
   * @param email user's email
   * @returns user's data
   */
  public static async readPassword (email: string): Promise<Read.UserWithPassword> {
    const sql = `
      SELECT
        id,email,password
      FROM users
      WHERE email='${email}'
      LIMIT 1
    `;
    const data = await this.query(sql) as Read.UserWithPassword[]; // warn!: some fields are missing
    if (data.length > 0) {
      return data[0];
    } else {
      throw new ClientError('email does not exist');
    }
  }

  public static async readJWT (userId: number): Promise<string | null> {
    const sql = `
      SELECT currentJWT
      FROM users
      WHERE id=${userId}
      LIMIT 1
    `;
    const data = await this.query(sql) as { currentJWT: string | null }[];
    if (data.length > 0) {
      return data[0].currentJWT;
    } else {
      return null;
    }
  }

  public static async storeJWT (userId: number, jwt: string) : Promise<void> {
    const sql = `UPDATE users SET ? WHERE id=${userId}`;
    await this.query(sql, { currentJWT: jwt });
  }
}
