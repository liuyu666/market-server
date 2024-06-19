
const ShopService = require('../service/ShopService');
const response = require('../utils/response');
class ShopController {

    /**
     * 新增数据
     * @param {Context} ctx
     */
    async addShop (req, res) {
        const { body: shop } = req;
        ShopService.addShop([
            shop.title,
            shop.price,
            shop.images
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
    getShopList (req, res) {
        const { limit = 10, page = 1, sid } = req.query;
        ShopService.getShopListPage({ limit, page, sid })
            .then((result) => {
                res.json(response.success(result, 'success', 200));
            })
            .catch((err) => {
                res.json(response.error(err.code, null, err.errno));
            });
    }

}
module.exports = new ShopController();
