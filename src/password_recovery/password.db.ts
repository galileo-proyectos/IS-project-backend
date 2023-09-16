import DB from "../DBConnetion";


export default class PasswordDAO extends DB {
  /**
   * This method is used to read hashed passwords from db
   * @param email user's email
   * @returns user's data
   */
  public static async readByEmail (email: string): Promise<Read.User | null> {
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

  public static async storeRecoveryCode (userId: number, code: string): Promise<void> {
    const sql = `
      INSERT INTO user_recovery_codes
      SET userId=${userId}, recoveryCode='${code}'
    `;
    await this.query(sql);
  }

  public static async existsRecoveyCode (code: string): Promise<number | null> {
    const sql = `
      SELECT userId FROM user_recovery_codes
      WHERE recoveryCode='${code}'
      LIMIT 1
    `;
    const dbData = await this.query(sql) as { userId: number }[];
    if (dbData.length !== 0) {
      return dbData[0].userId;
    }
    return null;
  }

  public static async deleteRecoveryCode (userId: number) {
    const sql = `
      DELETE FROM user_recovery_codes
      WHERE userId=${userId}
    `;
    await this.query(sql);
  }
}
