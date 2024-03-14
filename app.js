const express = require("express");
const morgan =require("morgan");
const app =new express();
app.use(morgan('dev'));
app.use(express.json());
// in memory
let tasks =[];
//routes to get all tasks
app.get('/',(req,res)=>{
    res.json(tasks);
})


//route to create anew task
app.post('/task',(req,res)=>{
    const task = req.body;
    tasks.push(task);
    res.send({message:"task added",tasks})
})

//route to get a  id
app.get('/task/:id',(req,res)=>{
    const id =req.params.id;
    const task =tasks.find(task=>task.id===id)
    if(!task){
        res.send("Tasks not found");
    }else{
        res.json(task);
    }

})
//update
app.put('/tasks/:id',(req,res)=>{
    const id =req.params.id;
    const updatedTasks=req.body;
    const index =tasks.findIndex((task)=>task.id===id);
    if(index===-1){
        res.send("Task not found")
    }else{
        tasks.splice(index,1,updatedTasks);
        //updated task
        res.send({message:"message updated",tasks})
    }
})
app.delete('/edit/:id',(req,res)=>{
    const id =req.params.id;
    const index =tasks.findIndex((task)=>task.id===id);
    if(index===-1){
        res.send("Specified item not found")
    }else{
        tasks.splice(index,1);
        //updated task
        res.send({message:'Specified item is deleted',tasks});
    }
})




app.listen(3005,(req,res)=>{
    console.log("port is up")
})