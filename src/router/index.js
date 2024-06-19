const AdminController = require('../controller/AdminController');
// const CommonController = require('../controller/CommonController');
const ProductController = require('../controller/ProductController');
const ShopController = require('../controller/ShopController');

const uploadImage = require('../utils/imageUpload')

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

// {
    //     "data": {
        //         "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3d3dy5pdGNhc3QuY24vIiwic3ViIjoiOTU1MDViMDgtNjEwNS00ZDAyLTk1YjQtMDE4OTUwN2U1YTQ1IiwianRpIjoiNjExNzNkMWMtYzgxYi00MDg2LWJiNmUtNWE1Zjk5YzdkOWU5IiwiaWF0IjoxNzE2NTM1Mjg4LCJleHAiOjE3MTY1Mzg4ODh9.EPUL_i11zhXPilHDzXE6AAC46MA_Pt79Atqp4TfgGtg",
        //         "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3d3dy5pdGNhc3QuY24vIiwic3ViIjoiOTU1MDViMDgtNjEwNS00ZDAyLTk1YjQtMDE4OTUwN2U1YTQ1IiwianRpIjoiOGVmMWU0NTEtY2JjOS00OWNkLWE0MWEtMTVhZjBmZTZlMTQxIiwiaWF0IjoxNzE2NTM1Mjg4LCJleHAiOjE3MTY1Mzg4ODh9.-3Mx02NlkCw_TO1uNsfPF0Q7NiXkKC5Nha1-1raMF-8"
        //     },
        //     "message": "OK"
        // }
        
router.post('/admin/login', AdminController.login);
// ! 商品
router.post('/product/item', ProductController.addProduct);
router.get('/product/list', ProductController.getProductList);

// ! 店铺
router.get('/shop/list', ShopController.getShopList);

uploadImage(router)


module.exports = router; //导出路由对象
