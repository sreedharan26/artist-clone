import { useEffect, useRef, useState } from "react";
import "../styles/todo.css"

function Dot(){
    return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="228" viewBox="0 0 16 228" fill="none">
    <circle cx="7.73983" cy="7.41463" r="6.91463" fill="#F2BFFF" stroke="#6C6C6C"/>
    <circle cx="7.73983" cy="28.7317" r="6.91463" fill="#F2BFFF" stroke="#6C6C6C"/>
    <circle cx="7.73983" cy="50.0489" r="6.91463" fill="#F2BFFF" stroke="#6C6C6C"/>
    <circle cx="7.73983" cy="71.3658" r="6.91463" fill="#F2BFFF" stroke="#6C6C6C"/>
    <circle cx="7.73983" cy="92.6828" r="6.91463" fill="#F2BFFF" stroke="#6C6C6C"/>
    <circle cx="7.73983" cy="114" r="6.91463" fill="#F2BFFF" stroke="#6C6C6C"/>
    <circle cx="7.73983" cy="177.951" r="6.91463" fill="#F2BFFF" stroke="#6C6C6C"/>
    <circle cx="7.73983" cy="135.317" r="6.91463" fill="#F2BFFF" stroke="#6C6C6C"/>
    <circle cx="7.73983" cy="199.268" r="6.91463" fill="#F2BFFF" stroke="#6C6C6C"/>
    <circle cx="7.73983" cy="156.634" r="6.91463" fill="#F2BFFF" stroke="#6C6C6C"/>
    <circle cx="7.73983" cy="220.585" r="6.91463" fill="#F2BFFF" stroke="#6C6C6C"/>
  </svg>
}


function ListItem({placeholder, index, tick, updateTask, value}){
    const [inputValue, setInputValue] = useState(value || "")
    const ref = useRef(null)
    const inputRef = useRef(null)
    function handleChange(e){
        updateTask(index, e.target.value)
        setInputValue(e.target.value)
        autoHeight()
    }

    function autoHeight() {
        const textarea = ref?.current
        if(textarea){
            textarea.style.height = 'auto';
            console.log(textarea.scrollHeight)
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }

    function sub(){
        tick(index, inputRef.current, ref.current, setInputValue)
        setInputValue("")
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
    const arr = [{id: 0, task: "Drink Water Like a Fish"}, {id: 1, task: "Take Lots of Breaks"}, {id: 2, task: "Go for Walks"}]
    const [taskArray, setTaskArray] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
    useEffect(() => {
        try{
            let data = localStorage.getItem('tasks')
            if(data === null){
                    localStorage.setItem('tasks', JSON.stringify(arr))
                    setTaskArray(arr)
            }else{
                data = JSON.parse(data)
                console.log(data)
                let newData = []
                for(let i =0; i<3;i++){
                    if(data[i].task !== arr[data[i].id].task){
                        newData.push(data[i])
                    }
                }
                for(let i =0; i<3;i++){
                    if(data[i].task === arr[data[i].id].task){
                        newData.push(data[i])
                    }
                }
                console.log(newData)
                setTaskArray(newData)
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
            if(newTasks[i].id === index){
                newTasks[i] = {...newTasks[i], task: text !== "" ? text : newTasks[i].task}
            }
        }
        localStorage.setItem('tasks', JSON.stringify(newTasks))
        setTaskArray(newTasks)
    }

    function finish(index, element, textarea, setInputValue){
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
                if(taskArray[i].id !== index){
                    newTasks.push(taskArray[i])
                }
            }
            for(let i = 0; i< 3; i++){
                if(arr[i].id === index){
                    newTasks.push(arr[i])
                }
            }
            // newTasks.push(arr[index])
            console.log(newTasks)
            setTaskArray(newTasks)
            localStorage.setItem('tasks', JSON.stringify(newTasks))
        }, 400 )
    }

    console.log(taskArray)
    const list = taskArray.map((task, i) => <ListItem key={task?.id} placeholder={task?.task !== arr[task?.id].task && task?.task !=="" ? "" : task?.task} value={task?.task === arr[task?.id].task && task?.task !== "" ? null : taskArray[i].task} index={task?.id} tick={finish} updateTask={updateTask}/>)

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