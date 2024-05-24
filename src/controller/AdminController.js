
const AdminService = require('../service/AdminService');
const response = require('../utils/response');
class AdminController {
    getTest (req, res) {
        console.log('/admin/test', req, res);
        res.json({
            status: 0,
            message: 'success',
            data: {
                text: '这是测试连通成功!'
            }
        });
    }
    /**
     * 获得管理员列表分页数据
     * @param {Context} ctx
     */
    getAdminList (req, res) {
        const { limit = 10, page = 1} = req.body;
        AdminService.getAdminListPage({ limit, page })
            .then((result) => {
                res.json(response.success(result, 'success', 200));
            })
            .catch((err) => {
                res.json(response.error(err.code, null, err.errno));
            });
    }

    /**
     * 新增数据
     * @param {Context} ctx
     */
    async addAdmin (req, res) {
        const { body: admin } = req;
        const isAdmin = await AdminService.getAdminByName(admin.account);

        if (isAdmin.length) {
            res.json(
                response.error(`新增用户${isAdmin[0].account}已存在！`, null, 200)
            );
            return;
        }
        AdminService.addAdminInfo([
            Math.floor(Math.random() * 10000 - 1),
            admin.account,
            admin.password,
            admin.email,
            admin.weight,
        ])
            .then(() => {
                res.json(response.success(null, 'success', 200));
            })
            .catch((err) => {
                res.json(response.error(err.code, null, err.errno));
            });
    }

    /**
     * 更新数据
     * @param {Context} ctx
     */
    updateAdmin (req, res) {
        const { body: admin } = req;
        AdminService.updateAdmin(admin)
            .then((result) => {
                res.json(response.success(null, 'success', 200));
            })
            .catch((err) => {
                res.json(response.error(err.code, null, err.errno));
            });
    }

    /**
     * 删除数据
     * @param {Context} ctx
     */
    deleteAdmin (req, res) {
        const { id } = req.body;
        AdminService.delAdmin(id)
            .then(() => {
                res.json(response.success(null, 'success', 200));
            })
            .catch((err) => {
                res.json(response.error(err.code, null, err.errno));
            });
    }

    /**
     * 模糊查询管理员信息
     * @param ctx 上下文
     */
    getAdminDim (req, res) {
        const { account } = req.query;
        AdminService.getAdminByAccount(account)
            .then((result) => {
                res.json(response.success(result, 'success', 200));
            })
            .catch((err) => {
                res.json(response.error(err.code, null, err.errno));
            });
    }

    /**
     * 修改管理员登录权限
     * @param ctx 上下文
     */
    editAdminInfo (req, res) {
        const { body } = req;
        AdminService.editAdminInfo(body)
            .then((result) => {
                res.json(response.success(null, 'success', 200));
            })
            .catch((err) => {
                res.json(response.error(err.code, null, err.errno));
            });
    }
}
module.exports = new AdminController();
