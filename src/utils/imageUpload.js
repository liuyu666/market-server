const multer = require('multer');
const { Octokit } = require('@octokit/rest');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const upload = multer({ dest: 'uploads/' }); // 文件临时存储目录

// 初始化Octokit客户端
const octokit = new Octokit({
    auth: process.env.GITHUB_PASSWORD,
});


// 辅助函数读取文件
function readFile (filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}


module.exports = function uploadImage (router) {
    router.post('/common/upload', upload.single('image'), async (req, res) => {
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
    });
}