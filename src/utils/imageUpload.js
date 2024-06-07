const multer = require('multer');
const fs = require('fs');
const path = require('path');

const dotenv = require('dotenv');
dotenv.config();
const { v4: uuidv4 } = require('uuid');

const upload = multer({ dest: 'uploads/' }); // 文件临时存储目录

module.exports = function uploadImage (router) {
    router.post('/common/upload', upload.single('image'), async (req, res) => {
        try {
            const originalname = req.file.originalname;
            const suffix = originalname.split('.').at(-1)
            const fileUuid = uuidv4();
            const fileName = `${fileUuid}.${suffix}`
            console.log(req.file, 90900);
            const newPath = path.join(__dirname, '../public/images', req.file.filename);
            fs.renameSync(req.file.destination + req.file.filename, newPath);

            // 返回文件的网络地址  
            const imageUrl = `http://liuyu666.cn/images/${req.file.filename}`; // 替换为你的域名或IP地址  
            res.json({ success: true, imageUrl });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Upload failed.' });
        }
    });
}
