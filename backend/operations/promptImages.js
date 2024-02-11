const axios = require('axios')
const api_key = process.env.API_KEY_IMG
const url = "https://api.segmind.com/v1/sd1.5-cyberrealistic";

const getImages = async ( prompt) => {
        const options = {
            "prompt": toString(prompt),
            "scheduler": "dpmpp_2m",
            "num_inference_steps": 25,
            "guidance_scale": 7.5,
            "samples": 1,
            "seed": 945216760,
            "img_width": 512,
            "img_height": 768,
            "base64": false
        }
        try {
            const response = await axios.post(url, options, { headers: { 'x-api-key': api_key } });
            // const imageData = await response.blob()
            // const imageURL = URL.createObjectURL(imageData)
            // console.log(imageURL);
            // return imageURL;
            // console.log(response)
            console.log('Generated');
            return response.data
        } catch (error) {
            console.error('Error:', error.message);
            return new Error(error.message)
        }
}

module.exports = getImages