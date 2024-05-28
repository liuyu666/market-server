const { pagingQuery, Product } = require('../mapping/sqlmap');
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
    getProductListPage (data) {
        return connectionQuery(
            pagingQuery(Number(data.page), Number(data.limit), 'products')
        );
    }
}
module.exports = new ProductService();
