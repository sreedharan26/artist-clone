const getQuotes = (table1) => {
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

module.exports = getQuotes