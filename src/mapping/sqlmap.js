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
            return {
                sql: "select id, account, password, shop_id from user where account = ?",
                vars: [account]
            }
        },
        adminNameQuery: (account) => {
            return `select id,account,password,email,weight from user where account like '%${account}%'`;
        },
        tokenByAccount: ({ token, account }) => {
            console.log('token, account', token, account)
            return {
                sql: 'UPDATE user SET token = ? WHERE account = ?',
                vars: [token, account]
            }
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
        pagingQuery: ({ page, limit, pid, sid }) => {
            const offset = (page - 1) * limit;
            const emptySid = sid === undefined || sid === 'undefined'
            const emptyPid = pid === undefined || pid === 'undefined'
            console.log('!emptyPid', !emptyPid);
            if (!emptyPid) {
                return {
                    sql: `SELECT * FROM product ${!emptySid ? 'WHERE shop_id = ' + sid : ''}
                ORDER BY CASE WHEN id = ? THEN 0 ELSE 1 END, update_time DESC
                limit ? offset ?`,
                    vars: [pid, limit, offset]
                }
            } else {
                return {
                    sql: `select * from product ${!emptySid ? 'WHERE shop_id = ' + sid : ''}
                limit ? offset ?`,
                    vars: [limit, offset]
                }
            }
        },
    },

    Shop: {
        shopAdd: (data) => {
            return `insert into shop (title,price,images) values (${data
                .map((item) => `'${item}'`)
                .join(',')})`;
        },
        pagingQuery: ({ page, limit, sid }) => {
            console.log("=====99", sid);
            const offset = (page - 1) * limit;
            return {
                sql: `SELECT * FROM shop
            ORDER BY CASE WHEN id = ? THEN 0 ELSE 1 END, update_time DESC
            limit ? offset ?`,
                vars: [sid, limit, offset]
            }
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
    pagingQuery: ({ page, limit, pid, sid, table }) => {
        console.log('pid-----:' , pid);
        const offset = (page - 1) * limit;
        const emptySid = sid === undefined || sid === 'undefined'
        const emptyPid = sid === undefined || sid === 'undefined'
        console.log();
        if (!emptyPid) {
            console.log(9999999);
            return {
                sql: `SELECT * FROM ${table} ${!emptySid ? 'WHERE shop_id = ' + sid : ''}
                ORDER BY CASE WHEN id = ? THEN 0 ELSE 1 END, update_time DESC
                limit ? offset ?`,
                vars: [pid, limit, offset]
            }
        } else {
            return {
                sql: `select * from ${table} ${!emptySid ? 'WHERE shop_id = ' + sid : ''}
                limit ? offset ?`,
                vars: [limit, offset]
            }
        }
    },

    totolCountQuery: (table) => {
        return `SELECT COUNT(*) FROM ${table}`
    }

};
const { Admin, Product, Shop, pagingQuery, totolCountQuery } = sqlmap;
module.exports = { Admin, Product, Shop, pagingQuery, totolCountQuery };
