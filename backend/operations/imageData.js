const getImagesData = (table3) => {
    return new Promise((resolve, reject) => {
        table3.select({
            view: 'Grid view',
            fields: ['Name' ,'imageBase64']
        }).firstPage((err, records) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                const data = records.map(record => ({
                    id: record.id,
                    prompt: record.get('Name'),
                    imagebase64: record.get('imageBase64')
                }));
                resolve(data);
            }
        });
    });
}

module.exports = getImagesData