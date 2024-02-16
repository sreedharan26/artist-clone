const getImagesData = (table3) => {
    return new Promise((resolve, reject) => {
        table3.select({
            view: 'Grid view',
            fields: ['Name' ,'image']
        }).firstPage((err, records) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                const data = records.map(record => ({
                    id: record.id,
                    prompt: record.get('Name'),
                    image: record.get('image')
                }));
                resolve(data);
            }
        });
    });
}

module.exports = getImagesData