import express from 'express'
import { createNewUser, delateUser, getDetailPage, getHomePage, getEditPage, postUpdateUser, getUploadFilePage, handleUploadFile, handleUploadMultipleFile } from '../controller/homeController';
import appRoot from 'app-root-path'
import multer from 'multer';
import path from 'path';

const router = express.Router();
// app.get('/', (req, res) => {
//     res.render("index.ejs")
// })


// -------------------- handle upload file -------------------

// storage location for our images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // path folder save file
        cb(null, appRoot + '/src/public/img');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// validation case only image __ filter
const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });

const initWebRoute = (app) => {
    router.get('/', getHomePage)

    router.get('/detail/user/:id', getDetailPage)

    router.get('/edit/user/:id', getEditPage)

    router.get('/uploadFile', getUploadFilePage)

    router.post('/create-new-user', createNewUser)

    router.post('/delete-user', delateUser)

    router.post('/update-user', postUpdateUser)

    router.post('/upload-profile-pic', upload.single('profile_pic'), handleUploadFile)

    router.post('/upload-multiple-images', upload.array('multiple_images'), handleUploadMultipleFile)

    // tham số 1 ý nghĩa là thêm tiền tố cho params
    // "/abc" => /abc/about,store
    // "/" => ko có gì
    return app.use("/", router)
}

// es7
export default initWebRoute;
// es5
// module.exports = intiWebRoute;