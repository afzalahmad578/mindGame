const multiparty = require('multiparty');

module.exports.appParsing = (req, res, next) => {
    try {
        let form = new multiparty.Form();
        form.parse(req, (err, fields, files) => {
            // console.log(req);
            if (err) { throw err; }

            // req
            req.locals = {};
            req.locals['fields'] = fields;
            req.locals['files'] = files;
            console.log('files--> ' + JSON.stringify(files))
            next();
        });
    } catch (err) {
        next(err);
    }
}