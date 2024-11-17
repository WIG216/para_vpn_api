import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = path.join(__dirname, '..', '..', '..', 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); 
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); 
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const fileName = Date.now() + fileExtension;

    cb(null, fileName); 
  }
});

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed') as any, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, 
}).single('image'); 

export { upload };
