import DBConnection from '../DBConnetion';

class AccountsDAO extends DBConnection {
  async create (data: Create.User): Promise<number> {
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
  async existsEmail (email: string): Promise<boolean> {
    const sql = `
      SELECT id
      FROM users
      WHERE email='${email}'
      LIMIT 1`;
      const data = await this.query(sql) as DB.RowDataPacket[];
      return data.length !== 0;
  }
}

const dao = new AccountsDAO();
export default dao;
