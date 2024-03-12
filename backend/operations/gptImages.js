const axios = require('axios')
require('dotenv').config

const API_KEY = process.env.EX_API;
const { OpenAI } = require("openai");

// Create an instance of OpenAIApi using your API key
const openai = new OpenAI({ apiKey: API_KEY });

// Define a function to generate images from prompts
const generateImage = async (prompt) => {
    try {
        const response = await openai.images.generate({
            prompt,
            n: 1,
            size: "512x512",
        });
        return response;
    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
};

module.exports = generateImage;

// const gptImages = async (prompt) => {
//     console.log("gpt start")
//     try{
//         const res = await axios.post('https://api.openai.com/v1/images/generations', 
//                                         {
//                                             headers: {
//                                                 "Authorization": `Bearer ${API_KEY}`
//                                             },
//                                             body: JSON.stringify({
//                                                 "model": "dall-e-2",
//                                                 "prompt": prompt,
//                                                 "n": 1,
//                                                 "size": "1024x1024"
//                                             })
//                                         }
//                                     )
//         console.log("gpt end")
//         return res
//     }catch(e){
//         console.log("err")
//         console.log(e.message)
//         return new Error(e)
//     }
// }

// module.exports = gptImages
