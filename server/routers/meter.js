const express =require('express');
const router =express.Router();

const baby = require('babyparse');
const moment = require('moment');

const csvFilePath ='./Datafile/metering_data.csv';


router.post('/search',(req,res)=>{
    
    const {serial}=req.body;
    const Metering = []
    var  WH =0
    var  VARH=0
    var labelsReadingDatetime=[]
    var labelWH="WH"
    var dataWH=[]
    var lableVARH="VARH"
    var dataVARH=[]
   

    if(!serial)
    {
      return res.status(422).json({error:"Please add serial"}) ;
    }
    else
    {
        baby.parseFiles(csvFilePath,{
            header:true,
            skipEmptyLines: true,
            step: function(row) 
            {
                
                var rowData =row.data[0];
                if(rowData.Serial==serial)
                {

                    WH+=parseInt(rowData.WH);
                    VARH+=parseInt(rowData.VARH);
                    if(rowData.ReadingDateTimeUTC!='')
                    {
                        if (moment(rowData.ReadingDateTimeUTC, "DD-MM-YYYY").isValid()) 
                        {
                            var mm = moment(rowData.ReadingDateTimeUTC, "DD-MM-YYYY LT");
                            rowData.ReadingDateTimeUTC=  mm.format("DD/MM/YYYY LT")
                            rowData.WH=parseInt(rowData.WH)
                            rowData.VARH=parseInt(rowData.VARH)
                        }
                        labelsReadingDatetime.push(rowData.ReadingDateTimeUTC)
                        dataWH.push(parseInt(rowData.WH))
                        dataVARH.push(parseInt(rowData.VARH))
                    
                    }
                  
                  Metering.push(rowData)
                }
               
                 
            },
            complete: function() {
              
                var MeterGraph = {
                    "labelsReadingDatetime":labelsReadingDatetime,
                    "labelWH":labelWH,
                    "dataWH":dataWH,
                    "lableVARH":lableVARH,
                    "dataVARH":dataVARH
                }
                var MeterReading = {
                    "Serial":serial,
                    "WHTotal":WH,
                    "VARHTotal":VARH
                }
                return res.json({Metering,MeterGraph,MeterReading});

            }
         }); 

    }//else end
});


module.exports= router;












//const fs = require('fs')
//const parse = require('csv-parse');
// router.post('/SearchMeter',(req,res)=>{
    
//     Metering = []
    
//     const {serial,city}=req.body;
   
//     if(!serial || !city)
//     {
//       return res.status(422).json({error:"Please add serial and city "}) ;
//     }
//     else
//     {

//         var parser = parse({delimiter: '\t'}, function (err, data) {
//             // when all countries are available,then process them
//             // note: array element at index 0 contains the row of headers that we should skip
//             var isrow =0;
//             data.forEach(function(line) 
//             {
//               // create country object out of parsed fields
//               if(isrow>0)
//               {
                  
//                 if(city=='both')  
//                 {  
//                     if(line[0]==serial)  
//                     {
                        
//                         var meter = { "Serial" : line[0]
//                             , "ReadingDateTime" : line[1]
//                             , "WH" : line[2]
//                             , "VARH" : line[3]
//                             };
                       
//                             Metering.push(meter);
//                     }
//                 }
//                else
//                 {
//                     if(line[0]==serial &&(line[2]==city || line[3]==city))  
//                     {
                       
//                         var meter = { "Serial" : line[0]
//                         , "ReadingDateTime" : line[1]
//                         , "WH" : line[2]
//                         , "VARH" : line[3]
//                         };
                        
//                         Metering.push(meter);
//                     }

//                 }
                     
//               }
//               isrow+=1;
//             });  //foreach 
//            return res.json({Metering});

//         });//function end

//         // read the inputFile, feed the contents to the parser
//         fs.createReadStream(csvFilePath).pipe(parser);

//     }//else end


// });



 