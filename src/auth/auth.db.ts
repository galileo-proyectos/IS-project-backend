import DBConnection from '../DBConnetion';
import ClientError from '../utils/ClientError';

class AccountsDAO extends DBConnection {
  public async create (data: Create.User): Promise<number> {
    const sql = `INSERT INTO users SET ?`;
    const { insertId } = await this.query(sql, {
      email: data.email,
      password: data.password,
      bornDate: data.bornDate !== null ? new Date(data.bornDate) : null,
      phone: data.phone,
      acceptPromotions: data.acceptPromotions,
      acceptTerms: data.acceptTerms
    }) as DB.OkPacket;
    return insertId;
  }

  /**
   * This method is used to verify all users' emails are unique.
   * @param email user's email
   * @returns true if the email is already used, false if not.
   */
  public async existsEmail (email: string): Promise<boolean> {
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
  public async readPassword (email: string): Promise<Read.UserWithPassword> {
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

  /**
   * This method is used to read hashed passwords from db
   * @param email user's email
   * @returns user's data
   */
  public async readByEmail (email: string): Promise<Read.User | null> {
    const sql = `
      SELECT
        id,email,bornDate,phone,imageURL
      FROM users
      WHERE email='${email}'
      LIMIT 1
    `;
    const data = await this.query(sql) as Read.UserWithPassword[]; // warn!: some fields are missing
    if (data.length > 0) {
      return data[0];
    }
    return null;
  }

  public async readJWT (userId: number): Promise<string | null> {
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

  public async storeJWT (userId: number, jwt: string) : Promise<void> {
    const sql = `UPDATE users SET ? WHERE id=${userId}`;
    await this.query(sql, { currentJWT: jwt });
  }

  public async storeRecoveryCode (userId: number, code: string): Promise<void> {
    const sql = `
      INSERT INTO user_recovery_codes
      SET userId=${userId}, recoveryCode='${code}'
    `;
    await this.query(sql);
  }
}

const dao = new AccountsDAO();
export default dao;
