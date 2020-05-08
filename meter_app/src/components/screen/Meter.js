
import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from "materialize-css"
import {Line} from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';
import DataGrid from 'react-data-grid';
import 'react-data-grid/dist/react-data-grid.css';
 

const Meter =()=>
{
  const history=useHistory();
  const[serial,setSerial] =useState("")
  const[meterreadingdata,setMeterreadingdata] =useState("")
  const [items, setItems] = React.useState([]);
  const[MeterGraph,setMeterGraph] =useState({})
  const[Bargraph,setBargraph] =useState({})
  
  const columns = [
    { key: 'Serial', name: 'Serial' },
    { key: 'ReadingDateTimeUTC', name: 'ReadingDateTimeUTC' },
    { key: 'WH', name: 'WH' },
    { key: 'VARH', name: 'VARH' }
  ];
  const MeteringData=[]

  useEffect(()=>{
   
    if(meterreadingdata!=undefined)
    {   
      
     

      var Mgraph= meterreadingdata.MeterGraph;
      var Metering =meterreadingdata.Metering;
       
             if(Array.isArray(Metering)){
                Metering.forEach(element =>  
                MeteringData.push(element));
               setItems(MeteringData);
             }
            
             if(Mgraph!=undefined)
             {
             
                        var gVale={
                          labels: Mgraph.labelsReadingDatetime,
                          datasets: [
                            {
                              label: Mgraph.labelWH,
                              backgroundColor: 'rgba(75,192,192,1)',
                              borderColor: 'rgba(0,0,0,1)',
                              borderWidth: 2,
                              data: Mgraph.dataWH
                            },
                            {
                              label: Mgraph.lableVARH,
                              backgroundColor: 'rgba(80,152,182,2)',
                              borderColor: 'rgba(0,3,3,1)',
                              borderWidth: 2,
                              data: Mgraph.dataVARH
                            }
                          ]
                        }

                        var state = {
                          labels: Mgraph.labelsReadingDatetime,
                          datasets: [
                            {
                              label: Mgraph.labelWH,
                              backgroundColor: 'rgba(75,192,192,1)',
                              borderColor: 'rgba(0,0,0,1)',
                              borderWidth: 2,
                              data: Mgraph.dataWH
                            },
                            {
                              label: Mgraph.lableVARH,
                              backgroundColor: 'rgba(85,100,200,5)',
                              borderColor: 'rgba(10,8,15,55)',
                              borderWidth: 2,
                              data: Mgraph.dataVARH
                            }
                          ]
                        }

                        
               setBargraph(state);
               setMeterGraph(gVale);
               
            
             }

             
             
    }
  
  },[meterreadingdata]);
 
  const handleChange=(event)=> {
    
    
    setBargraph({});
    setMeterGraph({});
    setItems([])
    setItems("");
    setSerial(event.target.value)
  }

 

  const SearchSerial=()=>{
    var IsValid=true;
    setBargraph({});
    setMeterGraph({});
    setItems([])
    setItems("");
    var ToastMessage="";
    if(serial=="" || serial.length==0 || serial==undefined)
    {
      ToastMessage="";
      IsValid=false;
      ToastMessage= "serial is requied<br>"
    }
    if(serial.length>0 && (serial.length<11 || serial.length>11))
    {
      IsValid=false;
      ToastMessage+= "minlength   characters 11 required<br>"
    }
    if(IsValid==false)
    {
       var Msg =ToastMessage;
       ToastMessage="";
       return M.toast({html:Msg,classes:"#c62828 red darken-3"});
       
    }
    if(IsValid)
    {

        fetch("/search",{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({serial})
           }).then(res=>res.json())
          .then(data=>{
            setMeterreadingdata("")
            if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
              
            }
            else
            {
            
              setMeterreadingdata(data)

            }
          });



    }//is valid if
 }//serach functions.


return(
<div>
<div className="search">
               <div className="card search input-field">
                 <h2>Search Meter Reading</h2>
                 
                 <input type="text" value={serial} onChange={handleChange}
                  placeholder="Please Enter serial"/>


                <button className="btn waves-effect waves-light #1976d2 blue darken-1"
                onClick={()=>SearchSerial()}>
                    Search
                </button>
                  
               </div>
</div>

 <div className="showtalbe">
 
  
     <DataGrid  columns={columns}  rows={items}/>  

 </div>
 <div className="graph">
 <div><h4>Bar Graph</h4>
        <Bar
          data={Bargraph}
          options={{
            title:{
              display:true,
              text:'Meter Reading ',
              fontSize:18
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
      <div>
      <h4>Line Graph</h4>
        <Line data={MeterGraph}></Line>  
     </div>
 </div>
</div>
)

};
export default Meter