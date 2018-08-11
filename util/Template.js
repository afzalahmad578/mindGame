
const handlebars = require('handlebars')
exports.TemplateUtil = (template, complieData) => {
    const fs = require('fs');
    return new Promise((resolve, reject) => {
        fs.readFile(template, 'utf8', (err, content) => {
            if (err)
                reject(err);
            try {
                const template = handlebars.compile(content)
                let html = template(complieData)
                resolve(html)
            } catch (err) {
                reject(err)
            }
        })
    });
}