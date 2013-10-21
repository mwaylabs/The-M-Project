var config = {
    paths: {
        dist: "dist",
        app: "app"
    },
    server: {
        openBrowser: false,
        autoReload: false,
        port: 9000,

        // We use grunt-connect-proxy for the proxy task.
        // For further information go to:
        // https://github.com/drewzboto/grunt-connect-proxy
        proxies: [
            {
                context: "/myServer",
                host: "your.server.com",
                port: 80,
                https: false
            }
        ]
    },
    test: {
        port: 9001
    }
};

module.exports = config;