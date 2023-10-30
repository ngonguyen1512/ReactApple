// services/imageService.js
export const saveImage = (file) => new Promise(async (resolve, reject) => {
    // Đường dẫn đến thư mục public/images trên phía client
    const imagePath = 'client/public/images/';

    // Đảm bảo rằng thư mục tồn tại, nếu không, tạo mới
    if (!fs.existsSync(imagePath)) {
        fs.mkdirSync(imagePath, { recursive: true });
    }

    // Tạo một luồng đọc ghi để lưu file từ phía server sang client
    const fileStream = fs.createWriteStream(imagePath + file.name);
    fileStream.write(image.data);
    fileStream.end();

    fileStream.on('finish', () => {
        resolve('images/' + file.name);
    });

    fileStream.on('error', (err) => {
        reject(err);
    });
});