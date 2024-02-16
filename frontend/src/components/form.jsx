export default function Form(props){
    const options = props.data.options.map(option => (
        <>
            <input type="radio" name={props.data.id}/>
            <label>{option}</label>
            <br />
        </>
    ))
    // console.log(props)

    return (
        <>
            <p>
                {props.data.question}
            </p>
            {options}
        </>
    )
}