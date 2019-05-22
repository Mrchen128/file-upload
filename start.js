let express=require("express");
var bodyParser  = require("body-parser");//解析post参数，并注入到req.body中；
let fs= require("fs"); 
let multer = require("multer");//上传文件的模块
let upload =multer({dest:"./imgs"});//设置图片保存路径
let app=express();
let sql=require("./sql")

app.use(bodyParser.urlencoded({ extended: false }))
app.use("/",express.static("html"));//设置静态服务器；
app.post("/img",upload.single('file'),(req,res)=>{
    // console.log(res.body);
    let file = req.file;
    let imgurl="./html/imgs/"+file.originalname
    fs.rename(file.path,imgurl,(err)=>{
        if(!err){
            sql.sync().then(()=>{
                return   sql.findOrCreate({
                    where:{
                        imgurl:"http://localhost:3010/imgs/"+file.originalname
                    }
                })
            }).then(([user,created])=>{
                console.log(user)
                res.send(user)
            })
           
            //此时将文件名存到数据库；
        }
    }); //将上传的文件重命名，并且移动到新位置
})
app.listen(3010)