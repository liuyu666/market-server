
const ProductService = require('../service/ProductService');
const response = require('../utils/response');
class ProductController {

    /**
     * 新增数据
     * @param {Context} ctx
     */
    async addProduct (req, res) {
        const { body: product } = req;
        ProductService.addProduct([
            product.title,
            product.price,
            product.images
        ])
            .then(() => {
                res.json(response.success(null, 'success', 200));
            })
            .catch((err) => {
                res.json(response.error(err.code, null, err.errno));
            });
    }


    /**
     * 获得产品列表分页数据
     * @param {Context} ctx
     */
    getProductList (req, res) {
        console.log(req, 11111122);
        const { limit = 10, page = 1, pid } = req.query;
        ProductService.getProductListPage({ limit, page, pid })
            .then((result) => {
                res.json(response.success(result, 'success', 200));
            })
            .catch((err) => {
                res.json(response.error(err.code, null, err.errno));
            });
    }

}
module.exports = new ProductController();
