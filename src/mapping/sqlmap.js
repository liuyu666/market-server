const sqlmap = {
    Admin: {
        adminAll: () => {
            return `SELECT * FROM users`;
        },
        adminDel: (id) => {
            return `delete from admin where id = ${id}`;
        },
        adminAdd: (data) => {
            return `insert into admin (id,account,password,email,weight) values (${data
                .map((item) => `'${item}'`)
                .join(',')})`;
        },
        adminByAccount: (account) => {
            return `select id,account,password,email,weight from admin where account like '%${account}%'`;
        },
        adminNameQuery: (account) => {
            return `select id,account,password,email,weight from admin where account = '${account}'`;
        },
        adminUpdate: (data) => {
            return `
        update admin set account = '${data.account}',password = '${data.password}',
        email = '${data.email}',weight = ${data.weight} where id = '${data.id}'
      `;
        },
        adminUpdateActive: (data) => {
            return `
      update admin set weight = ${data.weight} where id = '${data.id}'
    `;
        },
    },

    /**
     * 分页查询
     * @param {number} page 查询页数
     * @param {number} limit 查询条数
     * @param {string} table 查询表
     * @returns {string} 返回值为string类型
     */
    pagingQuery: (page, limit, table) => {
        const offset = (page - 1) * limit;
        return `select * from ${table} limit ${limit} offset ${offset}`;
    },
};
const { Admin, pagingQuery } = sqlmap;
module.exports = { Admin, pagingQuery };
