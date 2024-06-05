const { pagingQuery, totolCountQuery, Product } = require('../mapping/sqlmap');
const connectionQuery = require('../utils/connectionQuery');
class ProductService {
    //新增后台管理员数据
    addProduct (data) {
        return connectionQuery(Product.productAdd(data));
    }
    /**
     * 分页查询产品数据
     * @param page 页数
     * @param limit 条数
     * @returns
     */
    async getProductListPage (data) {
        try {
            const { sql, vars } = pagingQuery({ page: Number(data.page), limit: Number(data.limit), pid: data.pid, table: 'product' })
            console.log(1122,sql, vars);
            const list = await connectionQuery(sql, vars)
            console.log(list, 'list')
            const total = await connectionQuery(totolCountQuery('product'))
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
module.exports = new ProductService();
