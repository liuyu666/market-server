const AdminController = require('../controller/AdminController');
const express = require('express'); //导入express

const router = express.Router(); //创建路由对象

router.get('/admin/test', AdminController.getTest);
//分页查询后台管理员数据
router.get('/admin/queryAdminList', AdminController.getAdminList);
//新增管理员数据
router.post('/admin/addAdmin', AdminController.addAdmin);
//删除指定管理员数据
router.delete('/admin/deleteAdmin', AdminController.deleteAdmin);
//模糊查询管理员数据
router.get('/admin/getAdminDim', AdminController.getAdminDim);
//修改管理员信息
router.put('/admin/updateAdmin', AdminController.updateAdmin);

module.exports = router; //导出路由对象
