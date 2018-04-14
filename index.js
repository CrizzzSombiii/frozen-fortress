app=require("express")()
net=require("http").createServer(app)
app.get("/",(req,res)=>{
res.sendFile(__dirname+"/public/index.htm")
})
app.use("/public",require("express").static(__dirname+"/public"))
net.listen(process.env.PORT||3000,()=>{console.log("Ready!")})
require("socket.io")(net,{}).sockets.on("connection",(socket)=>{
console.log("socket connection")
})
