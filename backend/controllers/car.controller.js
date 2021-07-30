const carModel = require("../models/Car.model");

class CarController{
    async static Create(req,res){
        try{
            const newcar = new carModel({
                producer: req.body.producer,
                model: req.body.model,
                year: req.body.year,
                companyintrodate: req.body.companyintrodate,
                actualrun: req.body.actualrun,
            });
            await newcar.save().catch(e=>{
                return res.status(406).send({message: "Error while adding new car"})
            })
            return res.status(200).json(newcar);
        }catch(e){return res.status(505).send({message: "Server error"})}
    }
    async static Edit(req,res){
        try{
            let objstat = await carModel.findOneAndUpdate({_id:req.params.id},{
                $set:{producer: req.body.producer,
                    model: req.body.model,
                    year: req.body.year,
                    companyintrodate: req.body.companyintrodate,
                    actualrun: req.body.actualrun,
                    editdate: Date.now(),
                }},{new:true}
            ).then(document=>{
                if(document){
                    return {status: 200, updatedcar: document}
                }else{
                    return {status: 406, updatedcar: {}}
                }
            });
            return res.status(objstat.status).json(objstat.updatedcar) 
        }catch(e){return res.status(505).send({message: "Server error"})}
    }
    async static Delete(req,res){
        try{
            await carModel.deleteOne({_id: req.params.id},(err,doc)=>{
                if(err || doc.deletedCount === 0)
                    return res.status(406).send({message: "Cannot delete car, wrong id or something else"});
                return res.status(200).send({message: "Car deleted"});
            })
        }catch(e){
            return res.status(505).send({message: "Server error"})
        }
    }
}
module.exports = CarController