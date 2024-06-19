const { pagingQuery, totolCountQuery, Shop } = require('../mapping/sqlmap');
const connectionQuery = require('../utils/connectionQuery');
class ShopService {
    //新增后台管理员数据
    addShop (data) {
        return connectionQuery(Shop.shopAdd(data));
    }

    /**
     * 分页查询产品数据
     * @param page 页数
     * @param limit 条数
     * @returns
     */
    async getShopListPage (data) {
        try {
            const { sql, vars } = Shop.pagingQuery({ page: Number(data.page), limit: Number(data.limit), sid: data.sid })
            const list = await connectionQuery(sql, vars)
            const total = await connectionQuery(totolCountQuery('shop'))
            return {
                list,
                total: total?.[0]?.['COUNT(*)'] || 0
            }
        } catch (error) {
            console.log(error);
        }
        return {}
    }
}
module.exports = new ShopService();
