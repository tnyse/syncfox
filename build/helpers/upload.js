"use strict";
// import { S3 } from '@aws-sdk/client-s3';
// import multer from 'multer';
// import multerS3 from 'multer-s3';
// import config from '../config/configSetup';
// import { generateUUID } from './utility';
// const s3 = new S3({
// 	endpoint: config.SPACES_ENDPOINT,
// 	region: config.SPACES_REGION,
// 	credentials: {
// 		accessKeyId: config.SPACES_ACCESSKEY,
// 		secretAccessKey: config.SPACES_SECRETKEY,
// 	},
// });
// const validMimetype: string[] = ['application/pdf', 'image/jpeg', 'image/png'];
// const getFolder = (dir: string = 'profile') => {
// 	const folder =
// 		dir.toLowerCase() === 'profile'
// 			? 'Profile'
// 			: dir.toLowerCase() === 'doc'
// 			? 'Document'
// 			: dir.toLowerCase() === 'business'
// 			? 'Business'
// 			: 'General';
// 	return `${config.NODE_ENV}/${folder}`;
// };
// const fileFilter = (req: any, file: any, cb: any) => {
// 	const fileSize = parseInt(req.headers['content-length']);
// 	console.log({ file });
// 	if (validMimetype.includes(file.mimetype)) {
// 		if (file.mimetype === 'application/pdf' && fileSize > 1024 * 1024) return cb('File too large!', false);
// 		if (file.mimetype.split('/')[0] === 'image' && fileSize > 1024 * 1024 * 2) return cb('File too large!', false);
// 		cb(null, true);
// 	} else {
// 		cb('Invalid file uploaded.', false);
// 	}
// };
// export const uploadFile = multer({
// 	fileFilter,
// 	storage: multerS3({
// 		s3,
// 		bucket: 'simple-assets',
// 		cacheControl: 'max-age=2630000',
// 		acl: 'public-read',
// 		contentType: (req, file, cb) => {
// 			cb(null, file.mimetype);
// 		},
// 		key: (req, file, cb) => {
// 			cb(null, `simplefi-business/${getFolder(req.query.dir)}/${generateUUID()}.${file.originalname.split('.')[1]}`);
// 		},
// 	}),
// });
//# sourceMappingURL=upload.js.map