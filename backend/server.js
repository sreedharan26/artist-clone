const cors = require('cors')
require('dotenv').config()
const axios = require('axios')
const Airtable = require('airtable')
const express = require('express')
const app = express()
const compression = require('compression')

const getQuotes = require('./operations/quotes')
const getIdeas = require('./operations/ideas')
const getImages = require('./operations/promptImages')
const getPrompts = require('./operations/prompts')
const getImagesData = require('./operations/imageData')
const getArtistsData = require('./operations/artistPersonality')

app.use(cors())
app.use(compression({
    level: 6,
    threshold: 10 * 1000
}))

const base = new Airtable({apiKey: process.env.API_KEY_ODB}).base('app5C3EKxBArX6f00')

const table1 = base('Visionary voices');
const table2 = base('Creative Catalyst');
const table3 = base('Image prompts');
const table4 = base('Form');


const makeRequestWithDelay =  async (delay, promptObj) => {
    await new Promise(resolve => setTimeout(resolve, delay*1000));
    try{
        const imageResponse = await getImages(promptObj.prompt)
                if(imageResponse instanceof Error){
            throw new Error(imageResponse.status)
        }
        const updatedData = await axios.patch(
            `https://api.airtable.com/v0/app5C3EKxBArX6f00/tblbpaR1OB84NkwIv/${promptObj.id}`,
            {
                "fields": {
                    "imageBase64": imageResponse.image
                }
            },
            {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${process.env.API_KEY_ODB_WA}`
                }
            }    
        )
    }
    catch(e){
        console.log(e);
        return e;
    }
}
    
app.get('/quotes',  async (req, res) => {
    
    try{
    const data =await getQuotes(table1)
    res.json(data);
    }
    catch(e){
        res.status(500).send('Error retrieving data from Airtable');
    }
})

app.get('/ideas',  async (req, res) => {
    
    try{
        const data =await getIdeas(table2)
        res.json(data);
    }
    catch(e){
        res.status(500).send('Error retrieving data from Airtable');
    }
})

app.get('/images', async ( req, res) => {
    try{
        const data = await getImagesData(table3)
        res.json(data)
    }
    catch(e){
        console.log('Error in generating Image', e)
        res.status(500).send('Error in generating Image', e.message)
    }
})

app.get('/artistData', async ( req, res) => {
    try{
        const data = await getArtistsData(table4)
        res.json(data)
    }
    catch(e){
        console.log('Error in generating Image', e)
        res.status(500).send('Error in generating Image', e.message)
    }
})

app.get('/genImages', async (req, res) => {
    try{
        const prompts = await getPrompts(table3)
        let index = 1;
        for(const promptObj of prompts){
            try{
                await makeRequestWithDelay(2,promptObj)
                console.log(index)
                index++;
            }
            catch(e){
                console.log('Error occured', e.message)
            }
        }
        console.log("\n\nfinished\n\n")
        res.status(200).json(prompts)
    }
    catch(e){
        res.status(500).send("Error retriving data", e.message)
    }
})


app.listen(3000, () => console.log("Server listening on port 3000"))