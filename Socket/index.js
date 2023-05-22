const io = require('socket.io')(8800,{
    cors:{
        origin:"http://localhost:3000"
    }
})




let activeUsers = [];

io.on("connection",(socket)=>{
   //Add New User
   socket.on('new-user-add',(newUserId)=>{
    //check user dont already exist  
    if(!activeUsers.some((user)=>user.userId===newUserId)){
        activeUsers.push({
            userId: newUserId,
            soocketId: socket.id

        })
    }

    io.emit('get-users',activeUsers)



   });

   //send message
   socket.on("send-message",(data)=>{
    
    const {recieverUserId} = data
    const user = activeUsers.find((user)=>user.userId === recieverUserId)
   console.log('recid',recieverUserId);
   console.log('data',data);
    if(user){
        io.to(user.soocketId).emit("recieve-message",data)
        
    }
    console.log('user',user)
   });


   socket.on("disconnect",()=>{
    activeUsers = activeUsers.filter((user)=>user.soocketId !== socket.id)
     
    io.emit('get-users',activeUsers)
})
})