import { useState } from "react"

export default function Form({data, res, setRes}){
    // const [response, setResponse] = useState(null)

    const handleClick = (e) => {
        // console.log(e)
        // setResponse(e.target.value)
        const value = parseInt(e.target.value)
        const checked = e.target.checked
        // console.log(value, checked)
        setRes(prev => prev.map((obj) => {
            if(obj.id === res.id){
                let newObject = { ...obj}
                if(checked){
                    let selctedOptions = newObject && newObject.selected 
                    !selctedOptions.includes(value) && selctedOptions.push(value)
                    newObject = {...newObject, selected: selctedOptions}
                }
                else{
                    let n = newObject && newObject.selected && newObject.selected.length
                    for (let i =0 ;i < n; i++){
                        if(newObject.selected && newObject.selected[i] === value){
                            newObject.selected && newObject.selected.splice(i, 1);
                            break;
                        }
                    }
                }
                return newObject
            }
            return obj
        }))
    }

    // console.log(res)

    const options = data.options.map((option, i) => (
        <div key={i} className="options">
            <input 
                type="checkbox" 
                id={i}
                name={i} 
                value={i+1} 
                onChange={e => handleClick(e)} 
                checked = {(res.selected && res.selected.includes(i+1))}
            />
            <label id={i} htmlFor={i}>{option}</label>
        </div>
    ))

    return (
        <>
            <p className="question">
                {data.question}
            </p>
            <div className="options-cont">
                {options}
            </div>
        </>
    )
}