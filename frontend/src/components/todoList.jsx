import { useEffect, useRef, useState } from "react";
import "../styles/todo.css"

function Dot(){
    return <svg viewBox="0 0 15 250" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7.41463" cy="7.41463" r="6.91463" fill="#F2BFFF" stroke="#6C6C6C"/>
    <circle cx="7.41463" cy="28.7315" r="6.91463" fill="#F2BFFF" stroke="#6C6C6C"/>
    <circle cx="7.41463" cy="50.0489" r="6.91463" fill="#F2BFFF" stroke="#6C6C6C"/>
    <circle cx="7.41463" cy="71.3658" r="6.91463" fill="#F2BFFF" stroke="#6C6C6C"/>
    <circle cx="7.41463" cy="92.6827" r="6.91463" fill="#F2BFFF" stroke="#6C6C6C"/>
    <circle cx="7.41463" cy="114" r="6.91463" fill="#F2BFFF" stroke="#6C6C6C"/>
    <circle cx="7.41463" cy="135.317" r="6.91463" fill="#F2BFFF" stroke="#6C6C6C"/>
    <circle cx="7.41463" cy="156.634" r="6.91463" fill="#F2BFFF" stroke="#6C6C6C"/>
    <circle cx="7.41463" cy="177.951" r="6.91463" fill="#F2BFFF" stroke="#6C6C6C"/>
    <circle cx="7.41463" cy="199.268" r="6.91463" fill="#F2BFFF" stroke="#6C6C6C"/>
    <circle cx="7.41463" cy="220.586" r="6.91463" fill="#F2BFFF" stroke="#6C6C6C"/>
    <circle cx="7.41463" cy="241.415" r="6.91463" fill="#F2BFFF" stroke="#6C6C6C"/>
    {/* <circle cx="7.41463" cy="262.732" r="6.91463" fill="#F2BFFF" stroke="#6C6C6C"/> */}
    {/* <circle cx="7.41463" cy="284.048" r="6.91463" fill="#F2BFFF" stroke="#6C6C6C"/> */}
    {/* <circle cx="7.41463" cy="305.366" r="6.91463" fill="#F2BFFF" stroke="#6C6C6C"/> */}
    {/* <circle cx="7.41463" cy="326.683" r="6.91463" fill="#F2BFFF" stroke="#6C6C6C"/> */}
    {/* <circle cx="7.41463" cy="348" r="6.91463" fill="#F2BFFF" stroke="#6C6C6C"/> */}
    {/* <circle cx="7.41463" cy="369.317" r="6.91463" fill="#F2BFFF" stroke="#6C6C6C"/> */}
    {/* <circle cx="7.41463" cy="390.634" r="6.91463" fill="#F2BFFF" stroke="#6C6C6C"/> */}
    </svg>
    
}


function ListItem({placeholder, index, tick, updateTask, value}){
    const [inputValue, setInputValue] = useState(value || "")
    const ref = useRef(null)
    const inputRef = useRef(null)
    // const [rows, setRows] = useState(1)

    useEffect(() => {
        autoHeight()
    }, [inputValue])
    
    useEffect(() => {
        autoHeight()
        if(index === 0){
            ref.current?.focus()
        }
    }, [])

    function handleChange(e){
        updateTask(index, e.target.value)
        setInputValue(e.target.value)
        autoHeight()
    }

    function autoHeight() {
        const textarea = ref?.current
        if(textarea){
            textarea.style.height = 'auto';
            // console.log(textarea.scrollHeight)
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }

    function sub(){
        tick(index, inputRef.current, ref.current, setInputValue, autoHeight)
        // setInputValue("")
    }

    return (
        <>
            <div className="list-item-cont">
                    <input type="checkbox" className="todo-checkbox" ref={inputRef}  onChange={() => sub()} />
                    <textarea ref={ref} rows="1" className="text-area" onInput={(e) => handleChange(e)} placeholder={placeholder} value={inputValue} ></textarea>
            </div>
        </>
    )
}

export default function TodoList(){
    // const arr = [{id: 0, task: "Drink Water Like a Fish"}, {id: 1, task: "Take Lots of Breaks"}, {id: 2, task: "Go for Walks"}]
    const arr1 = ["Drink Water Like a Fish", "Take Lots of Breaks", "Go for Walks"]
    const [taskArray, setTaskArray] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
    useEffect(() => {
        try{
            let data = localStorage.getItem('tasks')
            if(data === null){
                    localStorage.setItem('tasks', JSON.stringify(arr1))
                    setTaskArray(arr1)
            }else{
                data = JSON.parse(data)
                // console.log(data)
                // let newData = []
                // for(let i =0; i<3;i++){
                //     if(data[i].task !== arr[data[i].id].task){
                //         newData.push(data[i])
                //     }
                // }
                // for(let i =0; i<3;i++){
                //     if(data[i].task === arr[data[i].id].task){
                //         newData.push(data[i])
                //     }
                // }
                // console.log(newData)
                setTaskArray(data)
            }
        }
        catch(e){
            console.log(e)
        }

    }, [])


    function updateTask(index, text){
        let newTasks = taskArray
        // newTasks[index] && (newTasks[index] = {id: taskArray[index].id, task: text})
        for(let i =0; i< 3; i++){
            if(i === index ){
                newTasks[i] = text
            }
        }
        localStorage.setItem('tasks', JSON.stringify(newTasks))
        setTaskArray(newTasks)
    }

    function finish(index, element, textarea, setInputValue, autoHeight){
        element.checked = true;
        textarea.style.textDecoration = "line-through"
        console.log(index)
        setTimeout(() => {
            element.checked = false;
            textarea.style.textDecoration = "none";
            // textarea.value = "" ;
            setInputValue("")
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
            const newTasks = []
            for(let i = 0; i< 3; i++){
                if(i !== index){
                    newTasks.push(taskArray[i])
                }else{
                    newTasks.push(arr1[index])
                }
            }
            // for(let i = 0; i< 3; i++){
            //     if(arr[i].id === index){
            //         newTasks.push(arr[i])
            //     }
            // }
            // // newTasks.push(arr[index])
            // console.log(newTasks)
            setTaskArray(newTasks)
            localStorage.setItem('tasks', JSON.stringify(newTasks))
        }, 400 )
    }

    // console.log(taskArray)
    const list = taskArray.map((task, i) => <ListItem key={i} placeholder={arr1[i]} value={task === arr1[i] && task !== "" ? null : task} index={i} tick={finish} updateTask={updateTask}/>)

    return (
        <>
            <div className="t-cont">
                <div className="dots-cont">
                    <Dot />
                </div>
                <div className="list-cont">
                    <p className="todo-head">Smile Diary: Remember to Fill! 😊🔔</p>
                    <div className="todo-list">
                        {
                            // taskArray &&  taskArray.map((task,i) => <ListItem key={i} placeholder={task?.task !== arr[task?.id].task ? "" : taskArray[i].task} value={task?.task === arr[task?.id].task ? null : taskArray[i].task}  index={task?.id} tick={finish} updateTask={updateTask} />)
                            list
                        }
                    </div>
                </div>
            </div>

        </>
    )
}
{/* <ListItem placeholder={"Drink Water Like a Fish"} />
<ListItem placeholder={"Take Lots of Breaks"} />
<ListItem placeholder={"Go for Walks"} /> */}