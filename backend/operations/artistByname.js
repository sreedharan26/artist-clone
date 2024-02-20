const getArtists = (table1) => {
    return new Promise((resolve, reject) => {
        table1.select({
            view: 'Grid view',
            fields: ['author name', 'Author Headshots', 'What he did', 'Daily Schedule']
        }).firstPage((err, records) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                let data = records.map(record => ({
                    id: record.id,
                    name: record.get('author name'),
                    image: record.get('Author Headshots'),
                    desc: record.get('What he did'),
                    schedule: record.get('Daily Schedule')
                }));
                // data = data.filter(obj => (obj.schedule!==null && obj.schedule!=='\n' && obj.schedule.length > 2))
                resolve(data);
            }
        });
    });
}

module.exports = getArtists