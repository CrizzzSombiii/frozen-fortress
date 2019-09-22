obj={}
mongojs=require("mongojs")
db=mongojs("ds117590.mlab.com:17590/mc2db",{"account","progress"])
app=require("express")()
net=require("http").createServer(app)
app.get("/",(req,res)=>{
res.sendFile(__dirname+"/public/index.htm")
})
app.use("/public",require("express").static(__dirname+"/public"))
net.listen(process.env.PORT||3000,()=>{console.log("Ready!")})
require("socket.io")(net,{}).sockets.on("connection",(socket)=>{
  socket.on("read",(e)=>{
    return db.collection.find({variable:e.variable})
  })
  socket.on("save",(e)=>{
    db.products.insert({variable:e.variable,value:e.value})
  })
})
