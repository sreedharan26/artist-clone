const getIdeas = (table) => {
    return new Promise((resolve, reject) => {
        table.select({
            view: 'Grid view',
            fields: ['option1' ,'option2', 'option3', 'option4']
        }).firstPage((err, records) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                const data = records.map(record => ({
                    id: record.id,
                    option1: record.get('option1'),
                    option2: record.get('option2'),
                    option3: record.get('option3'),
                    option4: record.get('option4'),
                }));
                const artistData = []
                data.forEach(object => {
                    const question = []
                    question.push([object && object.option1])
                    question.push([object && object.option2])
                    question.push([object && object.option3])
                    question.push([object && object.option4])
                    artistData.push(question)
                    return 
                })
                resolve(artistData);
            }
        });
    });
}

module.exports = getIdeas