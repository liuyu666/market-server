const { pagingQuery, Admin } = require('../mapping/sqlmap');
const connectionQuery = require('../utils/connectionQuery');
const uuid = require('short-uuid');

class AdminService {
    async getTokenByLogin (account, code) {
        const { sql, vars } = Admin.adminByAccount(account)
        const result = await connectionQuery(sql, vars);
        console.log(result, 'result-----=======');
        if (result && result.length > 0) {
            if (result[0].password === code) {
                // updateTokenByAccount
                const token = uuid.generate();
                await this.updateTokenByAccount({ token, account })
                return {
                    status: 0,
                    token
                }
            } else {
                return {
                    status: 2
                }
            }
        } else {
            return {
                status: 1
            }
        }
    }
    updateTokenByAccount ({ account, token }) {
        console.log(9999, account, token);
        const { sql, vars } = Admin.tokenByAccount({ account, token })
        return connectionQuery(sql, vars);
    }
    // ! using
    /**
     * 根据传入的查询条件查询数据
     * @param {string} account 传入查询条件
     * @returns
     */
    getAdminByAccount (account) {
        const { sql, vars } = Admin.adminByAccount(account)
        return connectionQuery(sql, vars);
    }

    // ! using
    getTokenByAccount (account) {
        // 根据account去查询近2小时有没有token，有的话，就返回
        // 没有的话，新生成一个token
        const { sql, vars } = Admin.adminByAccount(account)
        return connectionQuery(sql, vars);
    }

    
    getAdminAll () {
        return connectionQuery(Admin.adminAll());
    }
    /**
     * 分页查询管理员数据
     * @param page 页数
     * @param limit 条数
     * @returns
     */
    getAdminListPage (data) {
        return connectionQuery(
            pagingQuery(Number(data.page), Number(data.limit), 'user')
        );
    }

    //根据传入账号查询指定数据
    getAdminByName (account) {
        console.log('account', account);
        return connectionQuery(Admin.adminNameQuery(account));
    }

    //新增后台管理员数据
    addAdminInfo (data) {
        return connectionQuery(Admin.adminAdd(data));
    }

    //删除指定后台管理员数据
    delAdmin (id) {
        return connectionQuery(Admin.adminDel(id));
    }

    /**
     * 更新指定管理员信息
     * @param id 管理员id
     * @param data 管理员更新数据集合
     * @returns
     */
    updateAdmin (data) {
        return connectionQuery(Admin.adminUpdate(data));
    }

    /**
     * 修改管理员权限
     * @param id 管理员id
     * @param data 修改数据
     * @returns
     */
    editAdminInfo (data) {
        return connectionQuery(Admin.adminUpdateActive(data));
    }
}
module.exports = new AdminService();
