const axios = require('axios')

const gptImages = async (prompt) => {
    const res = await axios.post('https://api.openai.com/v1/images/generations', 
                                    {
                                        headers: {
                                            "Content-Type": "application/json",
                                            // Authorization: `Bearer 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`
                                        }
                                    },
                                    {
                                        "model": "dall-e-3",
                                        "prompt": prompt,
                                        "n": 1,
                                        "size": "1729x1024"
                                    }
                                )
}

module.exports = gptImages