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
    const handleFormat = () => {

    }
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
            <form>
                <div className="boxesContainer">
                    <div>
                        <textarea rows={25} cols={30} placeholder="Insert Json"  value={jsonArr} onChange={(e)=>setJsonArr(e.target.value)}/>
                    </div>
                    <div>
                        <textarea rows={25} cols={30} placeholder="Result from converting"  value={resultCSV} readOnly /> 
                    </div>
                </div>
                <div className="bottonContainer"> 
                    <input type={'submit'} onClick={transformToCsv} value="Convertir a CSV"/>
                    <input type={'submit'} onClick={handleFormat} value="Formatear JSON"/>
                    <input type={'submit'} onClick={handleClean} value="Limpiar" />
                    <input type={'submit'} onClick={insertSampleExample} value="Ejemplo" />
                </div> 
            </form>
        </div>
    )
}