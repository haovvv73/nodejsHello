import pool from "../config/connectionDB";
import multer from 'multer';

// app.get('/', (req, res) => {
//     res.render("index.ejs")
// })

const getHomePage = async (req, res) => {
    let data = []
    // lay data tu database
    // ket noi database lay du lieu co the bi [] do js bat dong bo 
    // khac phuc doi qua syntax promise 
    // connection.query(
    //     'SELECT * FROM `users`',
    //     function (err, results, fields) {
    //         data = results.map(row => row)
    //         // console.log("🚀 ~ file: homeController.js:16 ~ getHomePage ~ data", data)

    //         // espress js cho ta props data vào view bằng tham số thứ hai
    //         // ở view ta thực thiện cú pháp ejs để catch dữ liệu về
    //         res.render("index.ejs", { dataUser: data })
    //         // render and send
    //     }
    // );

    const [row, field] = await pool.execute('SELECT * FROM users')
    return res.render("index.ejs", { dataUser: row })

}

const getDetailPage = async (req, res) => {
    const { id } = req.params

    // khi chọc vào database sẽ phải đợi SQL xong ms có data
    // async / await khi đụng đến database
    const [user] = await pool.execute('SELECT * FROM users WHERE ID = ?', [id])
    // console.log(user);
    return res.send(JSON.stringify(user))
}

const createNewUser = async (req, res) => {
    const { firtName, lastName, email, adress } = req.body
    await pool.execute('INSERT INTO USERS(firtName,lastName,email,adress) VALUES(?,?,?,?)', [firtName, lastName, email, adress])
    return res.redirect('/')
}

const delateUser = async (req, res) => {
    const { userID } = req.body
    await pool.execute('DELETE FROM users WHERE ID=?', [userID])
    return res.redirect('/')
}

const getEditPage = async (req, res) => {
    const { id } = req.params
    const [user] = await pool.execute('SELECT * FROM users WHERE ID = ?', [id])
    return res.render('update.ejs', { user: user[0] })
}

const postUpdateUser = async (req, res) => {
    const { firtName, lastName, email, adress, ID } = req.body
    await pool.execute('UPDATE users SET firtName = ?, lastName = ?, email = ?, adress = ? WHERE ID = ?', [firtName, lastName, email, adress, ID])
    return res.redirect('/')
}

const getUploadFilePage = (req, res) => {
    return res.render('uploadFile.ejs')
}

// event upload file
// const upload = multer().single('profile_pic');
// const uploadMultiple = multer().single('multiple_images', 3);

const handleUploadFile = async (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form
    // handle dom that file

    // upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    //  all case validation
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }
    // else if (err instanceof multer.MulterError) {
    //     return res.send(err);
    // }
    // else if (err) {
    //     return res.send(err);
    // }

    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/img/${req.file.filename}" width="500"><hr /><a href="/uploadFile">Upload another image</a>`);
    // });
}

// event upload multiple file
const handleUploadMultipleFile = (req, res) => {
    // uploadMultiple(req, res, function (err) {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (req.files.length <= 0) {
        return res.send('Please select an image to upload');
    } else if (req.files.length >= 4) {
        return res.send('you can upload file image = 4')
    }
    // else if (err instanceof multer.MulterError) {
    //     return res.send(err);
    // }
    // else if (err) {
    //     return res.send(err);
    // }

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/img/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }

    result += '<hr/><a href="/uploadFile">Upload more images</a>';
    res.send(result);
    // });
}


export { getHomePage, getDetailPage, createNewUser, delateUser, getEditPage, postUpdateUser, getUploadFilePage, handleUploadFile, handleUploadMultipleFile }