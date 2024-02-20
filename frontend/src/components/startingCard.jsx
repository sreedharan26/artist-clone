import "../styles/starting.css"

export default function StartingCard({next}){
    return (
        <>
            <div className="start-card">
                <div className="sc-content">
                    <p className="sc-head">Find your artist personality</p>
                    <p className="sc-text">Discover your inner artist with our quiz, inspired by the habits of history's greatest minds. Select multiple answers or skip questions to match your unique creativity. Unveil which famous artist or thinker mirrors your artistic personality in just a few clicks.</p>
                </div>
                <div className="buttons sc-buttons">
                    <button type="click" onClick={next}>Next</button>
                </div>
            </div>
        </>
    )
}