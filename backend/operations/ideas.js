const getIdeas = (table2) => {
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

module.exports = getIdeas