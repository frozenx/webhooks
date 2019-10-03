class HttpError extends Error {
    constructor(error) {
        super(error);
        this.name = 'HttpError';
        this.appCode = 'E001';
        this.stack = error.stack;
        this.setCodeAndStatusText(error);
        this.setMessage();
    }
    setCodeAndStatusText(error) {
        if (error.response) {
            this.code = error.response.status;
            this.url = error.response.config.url;
            this.httpMessage = JSON.stringify(error.response.data.message);

        } else if (error.code === 'ECONNREFUSED') {
            this.code = 443;
            this.url = error.config.url;
            this.httpMessage = 'Connection refused';
        }
    }
    setMessage() {
        this.message = `${this.name} | ${this.appCode} | ${this.code} | ${this.url} | ${new Date()} | ${this.httpMessage} | ${this.stack}`;
    }
}

module.exports = HttpError;