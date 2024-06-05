const { pagingQuery, Admin } = require('../mapping/sqlmap');
const connectionQuery = require('../utils/connectionQuery');
class AdminService {
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
     * 根据传入的查询条件查询数据
     * @param {string} account 传入查询条件
     * @returns
     */
    getAdminByAccount (account) {
        return connectionQuery(Admin.adminByAccount(account));
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
