const {Router}= require("express");
const Notes= require("../model/employenotes");

const noteRouter= Router();

noteRouter.post("/note", async(req,res)=>{
    const {date,pdf}= req.body;
    
    const note= await Notes.find({date: date})
    console.log(note);

    if(note.length==0){
       let notes={
            pdf:pdf
        }
        let data= await Notes.create({
            date: date, notes
        })
        res.status(200).json(data)
    }
    else{
        let notes={
            pdf:pdf
        }
        const dataUpdate= await Notes.findOneAndUpdate({date:date, $push: notes={pdf: pdf}})
        res.status(200).json(dataUpdate)

    }
})

module.exports= noteRouter