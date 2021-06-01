var exp = require("express");
var app = exp();

var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "KinRai08011!",
    database: "todoapp"
});


app.get("/", function (req, res) {
  connection.query('select * from todo', function (error, results, fields) {
      if (error) throw error;
      res.send(results);
  });
});

//任意のポート番号
app.listen(3000, function () {
  console.log("成功");
})