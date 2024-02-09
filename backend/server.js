const cors = require('cors')
require('dotenv').config()
const Airtable = require('airtable')
const express = require('express')
const app = express()

app.use(cors())

const base = new Airtable({apiKey: process.env.API_KEY_ODB}).base('app5C3EKxBArX6f00')

const table1 = base('Visionary voices');
const table2 = base('Creative Catalyst')

const getQuotes = () => {
    return new Promise((resolve, reject) => {
        table1.select({
            view: 'Grid view',
            fields: ['author name', 'Author Headshots', 'What he did', 'Quote']
        }).firstPage((err, records) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                const data = records.map(record => ({
                    id: record.id,
                    name: record.get('author name'),
                    image: record.get('Author Headshots'),
                    desc: record.get('What he did'),
                    quote: record.get('Quote')
                }));
                resolve(data);
            }
        });
    });
}

const getIdeas = () => {
    return new Promise((resolve, reject) => {
        table2.select({
            view: 'Grid view',
            fields: ['Heading' ,'Description']
        }).firstPage((err, records) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                const data = records.map(record => ({
                    id: record.id,
                    heading: record.get('Heading'),
                    idea: record.get('Description')
                }));
                resolve(data);
            }
        });
    });
}


    
app.get('/quotes',  async (req, res) => {
    
    try{
        const data =await getQuotes()
        res.json(data);
    }
    catch(e){
        res.status(500).send('Error retrieving data from Airtable');
    }
})

app.get('/ideas',  async (req, res) => {
    
    try{
        const data =await getIdeas()
        res.json(data);
    }
    catch(e){
        res.status(500).send('Error retrieving data from Airtable');
    }
})


app.listen(3000, () => console.log("Server listening on port 3000"))