import { v2 as cloudinary } from "cloudinary";

export default new (class CloudinaryConfig {
	upload() {
		cloudinary.config({
			cloud_name: 'da9j9y9oo',
			api_key: '229612681296517',
			api_secret: 'hcbFNSFqKftUw_NzseHZ0JtGd9U',
		});
	}

	async destination(image: any) {
		try {
			const cloudinaryResponse = await cloudinary.uploader.upload(
				"src/Upload/" + image,
				{
					folder: "circle-app",
				}
			);
			return cloudinaryResponse.secure_url;
		} catch (err) {
			throw err;
		}
	}
})();

