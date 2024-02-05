import '../styles/card.css'


export default function Card({children}){
    return (
        <>
            <div className='card'>
                <div className='content'>
                    {children}
                    <div className='back-wrapper'>

                    </div>
                </div>
            </div>
        </>
    )
}