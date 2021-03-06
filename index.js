var exp = require("express");
var app = exp();
const bodyParser = require("body-parser");
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "KinRai08011!",
  database: "todoapp",
});
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("取得したいデータのURLにアクセスしてください");
});

// todoのRead関数
app.get("/todos", function (req, res) {
  connection.query("select * from todo", function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
});

//todoのCreate関数
app.post("/todos", function (req, res) {
  connection.query(
    "insert into todo set ?",
    req.body,
    function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    }
  );
});

// todoのUpdate関数
app.put("/todos/:id", function (req, res) {
  const putcommand = 'update todo set ? where id = ' + req.params.id; 
  connection.query(
    putcommand,req.body,
    function (error, results, fields) {
      if (error) throw error;
      console.log("POSTリクエストが成功しました");
      res.send(results);
    }
  );
});
//todoのDelete関数
app.delete("/todos/:id", function (req, res) {
  connection.query(
    "delete from todo where id = ?",
    [req.params.id],
    function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    }
  );
});

app.listen(3000, function () {
  console.log("成功 http://localhost:3000/ で確認してくだい");
});
