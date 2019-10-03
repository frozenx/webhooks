class ControllerError extends Error {
    constructor(error) {
        super(error);
        this.name = 'ControllerError';
        this.appCode = 'E003';
        this.code = 500;
        this.stack = error.stack;
        this.getMessage();
    }
    getMessage() {
        this.message = `${this.name} | ${this.appCode} | ${this.code} | ${new Date()} | ${this.stack}`;
    }
}

module.exports = ControllerError;