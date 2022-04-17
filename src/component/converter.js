import React from "react";
import {sampleData} from "./sampleExample"
import "./Style.css"

export const ConvertJsonToCSV = () => {
    const [jsonArr, setJsonArr] = React.useState('')
    const [resultCSV, setResultCSV] = React.useState('')

    const createCSV = (data) =>{
        data = data.reduce((previousValue, currentValue) => previousValue +','+ currentValue,
        '').slice(1)

        setResultCSV((prevState)=>{
            if(prevState === ''){
               return data
            }else{
               return prevState+'\n'+data
            }
        })
    }

    const handleClean = (event) =>{
        event.preventDefault();
        console.log('Limpiando...')
        setJsonArr('')
        setResultCSV('')
    }
    /* const handleFormat = () => {

    } */
    const transformToCsv = (event) =>{
        event.preventDefault()
       // if( typeof jsonArr !== "string" || typeof JSON.parse(jsonArr) !== "number" ) {
        helperToObtainFirstRow()
        buildUpCSV()
    }
    const buildUpCSV = () => {
        const  obj = JSON.parse(jsonArr)
        const rows = obj.map( item => Object.values(item))
        rows.forEach( row => createCSV(row))
    }
    const helperToObtainFirstRow = () =>{
        const  obj = JSON.parse(jsonArr)
        const row = Object.keys(obj[0])
        createCSV(row)
    }
    const insertSampleExample = (event) =>{
        event.preventDefault()
        setJsonArr(sampleData)
    }
    return(
        <div className="mainContainer">
                <h1>JSON TO CSV</h1>
                <div className="boxesContainer">   
                    <textarea rows={25} cols={30} placeholder="Ingrese en formato Json"  value={jsonArr} onChange={(e)=>setJsonArr(e.target.value)}/>
                    <textarea rows={25} cols={30} placeholder="Resultado de la conversión"  value={resultCSV} readOnly /> 
                </div>
                <section className="bottonContainer"> 
                    <button  onClick={transformToCsv} value="Convertir a CSV"> Convertir a CSV</button>
                   {/*  <button  onClick={handleFormat} value="Formatear JSON"> Formatear JSON</button> */}
                    <button  onClick={handleClean} value="Limpiar" >Limpiar</button>
                    <button  onClick={insertSampleExample} value="Ejemplo" >Ejemplo</button>
                </section>        
        </div>
    )
}