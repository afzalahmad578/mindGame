module.exports.getUrl = (req) => {
    const { protocol } = req;
    const hostname = req['headers']['host'];

    return protocol + '://' + hostname;
}
