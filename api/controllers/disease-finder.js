let mongoose = require('mongoose');
let symtomsdb = mongoose.model('symtoms');

module.exports.findDiseases = function (req,res) {
    let dis = [];
    let k=0;
    if(typeof(req.body.symtom) == typeof ('String')){
        symtomsdb
            .findOne({name : req.body.symtom.toUpperCase()})
            .exec(function(err,sdb) {
                if (err) {
                    res
                        .status(400)
                        .json(err)
                } else if (sdb == null) {
                    res
                        .status(400)
                        .json({"msg":"no such symtom"})
                }
                else{
                    let temp=[];
                    for (let j=0;j<sdb.diseases.length;j++){
                        temp[j] = sdb.diseases[j].name;
                    }
                    res
                        .status(200)
                        .json(temp)
                }
            })
    }
    else{
        for(let i=0;i<req.body.symtom.length;i++){
            symtomsdb
                .findOne({name : req.body.symtom[i].toUpperCase()})
                .exec(function(err,sdb){
                    if(err){
                        res
                            .status(400)
                            .json(err)
                    }
                    else if (sdb == null){
                        if (i+1 == req.body.symtom.length) {
                            if (dis.length == 1){
                                res
                                    .status(200)
                                    .json(dis);
                            }
                            else{
                                let intersection = dis[0].filter(x => dis[1].includes(x));
                                for (let i=2;i<dis.length;i++){
                                    intersection = intersection.filter(x => dis[i].includes(x));
                                }
                                res
                                    .status(200)
                                    .json(intersection);
                            }
                        }
                    }
                    else{
                        let temp = [];
                        for (let j=0;j<sdb.diseases.length;j++){
                            temp[j] = sdb.diseases[j].name;
                        }
                        dis[k] = {
                            symtom : req.body.symtom[i].toUpperCase(),
                            diseases : temp
                        };
                        k++;
                        if (i+1 == req.body.symtom.length) {
                            if (dis.length == 1){
                                res
                                    .status(200)
                                    .json(dis);
                            }
                            else{
                                let intersection = dis[0].diseases.filter(x => dis[1].diseases.includes(x));
                                for (let i=2;i<dis.length;i++){
                                    intersection = intersection.filter(x => dis[i].diseases.includes(x));
                                }
                                dis[k] = {
                                    Common : intersection
                                };
                                res
                                    .status(200)
                                    .json(dis);
                            }
                        }

                    }
                })
        }
    }
}