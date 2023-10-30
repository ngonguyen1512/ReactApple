import multer from 'multer';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/images');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Giới hạn file size: 5MB
});

export const uploadImage = (req, res) => {

    upload.single('file')(req, res, async function (err) {
        const { file } = req.file
        if (err) {
            console.error(err); // In lỗi ra console để xem thông điệp cụ thể
            return res.status(400).json({ error: 'Error uploading file' });
        }
        // Xử lý logic upload file ở đây
        return res.status(200).json({ message: 'File uploaded successfully' });
    });
};

