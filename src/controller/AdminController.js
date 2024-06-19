
const AdminService = require('../service/AdminService');
const response = require('../utils/response');
class AdminController {
    // ! using
    login1 (req, res) {
        const { account, code } = req.body;

        AdminService.getAdminByAccount(account)
            .then((result = []) => {
                if (result && result.length > 0) {
                    if (result[0].password === code) {
                        res.json(response.success({
                            token: 'c8wfb93chq98cb912ij3d',
                            shop_id: result[0].shop_id
                        }, 'success', 200));
                    } else {
                        res.json(response.error('密码错误', null, 401));
                    }
                } else {
                    res.json(response.error('账号不存在', null, 401));
                }
                // 加个token
            })
            .catch((err) => {
                res.json(response.error(err.code, null, err.errno));
            });
    }
    login (req, res) {
        const { account, code } = req.body;
        AdminService.getTokenByLogin(account, code)
            .then((result = {}) => {
                console.log(result, 99988);
                // status 0成功 1账号错误 2 密码错误 3其他错误
                const { status = 0, token = 'c8wfb93chq98cb912ij3d', shop_id = 1 } = result
                switch (status) {
                    case 0:
                        res.json(response.success({
                            token,
                        }, 'success', 200));
                        break;

                    case 1:
                        res.json(response.error('账号不存在', null, 401));
                        break;

                    case 2:
                        res.json(response.error('密码错误', null, 401));
                        break;
                    default:
                        res.json(response.error('未知错误', null, 500));
                        break;
                }
                
            })
            .catch((err) => {
                console.log(err, 'error');
                res.json(response.error(err.code, null, err.errno));
            });
    }
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
