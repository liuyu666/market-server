const sqlmap = {
    Admin: {
        adminAll: () => {
            return `SELECT * FROM user`;
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
    Product: {
        productAdd: (data) => {
            return `insert into product (title,price,images) values (${data
                .map((item) => `'${item}'`)
                .join(',')})`;
        },
    },

    /**
     * 分页查询
     * @param {object} params 
     * @param {number} params.page 查询页数
     * @param {number} params.limit 查询条数
     * @param {string} params.pid 商品id
     * @param {string} params.table 查询表
     * @returns 
     */
    pagingQuery: ({ page, limit, pid, table }) => {
        const offset = (page - 1) * limit;
        console.log(pid, 999);
        if (pid) {
            return {
                sql: `SELECT * FROM ${table}
            ORDER BY CASE WHEN id = ? THEN 0 ELSE 1 END, update_time DESC
            limit ? offset ?`,
                vars: [pid, limit, offset]
            }
        } else {
            return {
                sql: `select * from ${table} limit ? offset ?`,
                vars: [limit, offset]
            }
        }
    },

    totolCountQuery: (table) => {
        return `SELECT COUNT(*) FROM ${table}`
    }

};
const { Admin, Product, pagingQuery, totolCountQuery } = sqlmap;
module.exports = { Admin, Product, pagingQuery, totolCountQuery };
