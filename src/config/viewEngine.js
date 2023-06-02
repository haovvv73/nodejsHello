import express from "express";

const configViewEngine = (app) => {
    // app la instance cua express
    // cau hinh loai view engine 
    app.set("view engine", "ejs")

    // cau hinh duong dan folder to file ejs
    app.set("views", "./src/views")

    // cau hinh duong dan static file, page
    app.use(express.static('./src/public'))
}

export default configViewEngine