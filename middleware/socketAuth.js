exports.userAuth = (socket, model) => {
    return new Promise((resolve, reject) => {

        const token = socket.handshake.query.access_token;

        console.log('token---> ',token)

        if (token) {

            let criteria = { access_token: token };

            let update = {
                $set: { socket_id: socket.id },
            }

            resolve(DBManager.findAndUpdate(model, criteria, update, { new: true }));


        } else {
            return reject(new Error('access_token is Required'))
        }
    });
}


