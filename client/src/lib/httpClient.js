const redirectUrls = require('../config').redirect;


const handleError = (errorStatus) => {
    if (errorStatus === 403) {
        window.location = redirectUrls.unauthorized;
    } else if (errorStatus === 401) {
        window.location = redirectUrls.externalUrl;
    }
    else if (errorStatus === 404) {
        window.location = redirectUrls.pageNotFound;
    }
    else {
        window.location = redirectUrls.serverError;
    }
}

async function get(url) {
    try {
        const response = await fetch(url, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const body = await response.json();
            return body;
        } else {
            throw response;
        }
    }
    catch (err) {
        if (err.status) {
            handleError(err.status);
        }
    }
}

async function post(url, payload) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const body = await response.json();
            return body;
        } else {
            throw response;
        }
    }
    catch (err) {
        if (err.status) {
            handleError(err.status);
        }
    }
}


export default { get, post };

