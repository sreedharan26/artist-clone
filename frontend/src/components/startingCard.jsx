import "../styles/starting.css"

export default function StartingCard({next}){
    return (
        <>
            <div className="start-card">
                <div className="sc-content">
                    <p className="sc-head">Find your artist personality</p>
                    <p className="sc-text">Take our quick quiz to discover which famous artist or thinker matches your unique creativity. Explore your artistic personality through questions inspired by the habits of history's most innovative minds. Perfect for artists seeking motivation, growth, and inspiration. Find out your creative match in just a few clicks!</p>
                    <p className="red-sc-text">Select multiple answers or skip questions to match your unique creativity.</p>
                </div>
                <div className="buttons sc-buttons">
                    <button type="click" onClick={next}>Next</button>
                </div>
            </div>
        </>
    )
}