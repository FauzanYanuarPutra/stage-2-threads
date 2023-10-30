const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: 'da9j9y9oo',
    api_key: '229612681296517',
    api_secret:'hcbFNSFqKftUw_NzseHZ0JtGd9U'
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'CloudinaryDemo',
        allowedFormats: ['jpeg', 'png', 'jpg'],
    }                                                              
}); 

module.exports = {
    storage
};