const readXlsxFile = require('read-excel-file/node');
const fs = require('fs');
var path = require('path');
let mongoose = require('mongoose');
let symtomsdb = mongoose.model('symtoms');

module.exports.exltoDB = function (req,res) {
    readXlsxFile('./ExcelSheet/List of Symtoms.xlsx')
        .then(function (rows) {
            for(let i=1;i<rows.length;i++){
                symtomsdb.create({
                    name : rows[i][0].toUpperCase()
                },function(err,sdb){
                    if(err){
                        res
                            .status(400)
                            .json(err)
                    }
                    else{
                        for (let j=1;j<rows[i].length;j++){
                            if (rows[i][j] == 'Y'){
                                sdb.diseases.push({
                                    name : rows[0][j]
                                })
                            }
                        }
                        sdb.save(function(err,sdbfinal){
                            if(err){
                                console.log(err);
                            }
                        })
                    }
                })

            }
        })
        .catch(function(err){
            console.log(err);
        })

}