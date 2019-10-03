class ServiceError extends Error {
    constructor(error) {
        super(error);
        this.name = 'ServiceError';
        this.appCode = 'E002';
        this.code = 500;
        this.stack = error.stack;
        this.getMessage();
    }
    getMessage() {
        this.message = `${this.name} | ${this.appCode} | ${this.code} | ${new Date()} | ${this.stack}`;
    }
}

module.exports = ServiceError;