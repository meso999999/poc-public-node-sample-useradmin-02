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
    connection.query(
        'SELECT * FROM users',
        (error, results) => {
            console.log(results.id)
            res.render('admin.ejs', { userTable: results });
        }
    );
});

app.get('/edit/:id', (req, res) => {
    connection.query(
        'SELECT * FROM users WHERE id=?',
        [req.params.id],
        (error, results) => {
            //クエリ実行後の処理（アロー関数で）を記述
            res.render('edit.ejs', { userTable: results[0] });
        }
    );
});

app.post('/edit/:id', (req, res) => {
    connection.query(
        'UPDATE users SET name=?,email=?,password=? WHERE id = ?',
        [req.body.name,req.body.email,req.body.password, req.params.id],
        (error, results) => {
            res.redirect('/admin');
        }
    )
});

app.post('/delete/:id', (req, res) => {
    connection.query(
        'DELETE FROM users WHERE id=?',
        [req.params.id],
        (error, results) => {
            connection.query(
                'SELECT * FROM users',
                (error, results) => {
                    res.render('admin.ejs', { userTable: results });
                }
            );
        })
});

app.post('/userform', (req, res) => {
    connection.query(
        'INSERT INTO users(name,email,password) VALUES(?,?,?)',
        [req.body.addName, req.body.email, req.body.password],
        (error, results) => {
            res.render('index.ejs');
        }
    );
});

app.listen(3000);