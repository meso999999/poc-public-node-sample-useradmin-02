const express = require('express');
const app = express();
const mysql = require('mysql2');

app.use(express.static('link'))
app.use(express.urlencoded({ extended: false }));
require('dotenv').config()

// 環境変数取得
const mysql_user = process.env.MYSQL_USER
const mysql_pass = process.env.MYSQL_PASS

//定数connectionに、createConnectionを使って接続するデータベースの情報を格納します。
const connection = mysql.createConnection({
    host: 'localhost',
    user: mysql_user,
    password: mysql_pass,　//実際にはパスワードが設定されています。
    port: 3306,
    database: 'node_beginnertest'
});

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/userform', (req, res) => {
    res.render('userform.ejs');
});

app.get('/admin', (req, res) => {
    res.render('admin.ejs');
});

app.get('/edit/:id', (req, res) => {
    res.render('edit.ejs');
});

app.post('/edit/:id', (req, res) => {
    res.render('admin.ejs');
});

app.post('/delete/:id', (req, res) => {
    res.render('admin.ejs');
});

app.post('/userform', (req, res) => {
    res.render('index.ejs');
});

app.listen(3000);