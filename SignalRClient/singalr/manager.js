function manager(args) {
    const signalR = require('./signalr.min.js');

    var self = this;
    self.status = 0;
    self.connect = async function (url) {
        return new Promise((resolve, ereject) => {
            self.connection = new signalR.HubConnectionBuilder()
                .withUrl(url)
                .build();
            self.connection.start()
                .then((result) => {
                    resolve(true);

                })
                .catch((reason) => {
                    resolve(false);
                })
            self.connection.onclose(async () => {
                await self.connection.start();
            })
        });

    };
    self.callMethod = async function (name, data) {
        return new Promise((resolve, reject) => {
            self.connection.invoke(name, data)
                .then((result) => {
                    resolve(true);
                })
                .catch((reason) => {
                    resolve(false);
                })
        })

    }
    self.listenToMethod = async function (name, callback) {
        self.connection.on(name, callback);
    }
    return self;
}


module.exports = manager;

