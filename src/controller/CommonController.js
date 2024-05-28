
const ProductService = require('../service/ProductService');
const response = require('../utils/response');
class ProductController {

    /**
     * 新增数据
     * @param {Context} ctx
     */
    async uploadImage (req, res) {
        try {
            const imagePath = req.file.path;
            const fileName = req.file.originalname;

            // 读取文件内容
            const fileContent = await readFile(imagePath);

            // 推送到GitHub仓库
            await octokit.repos.createOrUpdateFileContents({
                owner: process.env.GITHUB_USERNAME,
                repo: process.env.REPO_NAME,
                path: `images/${fileName}`, // 图片保存路径，可根据需要调整
                message: `Upload image: ${fileName}`,
                content: Buffer.from(fileContent).toString('base64'),
                branch: process.env.BRANCH,
            });

            // 清理临时文件
            fs.unlinkSync(imagePath);

            // 返回图片URL（假设GitHub Pages已启用）
            const imageUrl = `https://raw.githubusercontent.com/${process.env.GITHUB_USERNAME}/${process.env.REPO_NAME}/${process.env.BRANCH}/images/${fileName}`;
            res.json({ success: true, imageUrl });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Upload failed.' });
        }

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
        const { limit = 10, page = 1 } = req.body;
        ProductService.getProductListPage({ limit, page })
            .then((result) => {
                res.json(response.success(result, 'success', 200));
            })
            .catch((err) => {
                res.json(response.error(err.code, null, err.errno));
            });
    }

}
module.exports = new ProductController();
