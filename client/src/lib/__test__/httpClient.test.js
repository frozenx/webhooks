import httpClient from '../httpClient';

describe('lib/httpClient', () => {
    describe('Given http client is called with get method', () => {
        let body = JSON.stringify({ "key": "value" })
        beforeEach(() => {
            window.fetch = jest.fn();
        });
        test('then it should call the fetch api with passed url for get method', async () => {
            window.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue({ key: "value" }) });
            const data = await httpClient.get('some url');
            expect(window.fetch).toHaveBeenCalledWith('some url', { method: 'get' });
            expect(data).toEqual({ key: "value" });
        });
        test('then it should throw the error given the fetch api call fails for get method', async () => {
            window.fetch.mockRejectedValue('some error');
            try {
                const data = await httpClient.get('some url');
            } catch (err) {
                expect(window.fetch).toHaveBeenCalledWith('some url', { method: 'get' });
                expect(err).toEqual('some error');
            }
        });
        test('then it should call the fetch api with passed url and payload for post method', async () => {
            window.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue('some response') });
            const data = await httpClient.post('some url', { key: 'value' });
            expect(window.fetch).toHaveBeenCalledWith('some url', { 
                body,
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                "method": "POST"
            });
            expect(data).toEqual('some response');
        });
        test('then it should throw the error given the fetch api call fails for post method', async () => {
            window.fetch.mockRejectedValue('some error');
            try {
                const data = await httpClient.post('some url', { key: 'value' });
            } catch (err) {
                expect(window.fetch).toHaveBeenCalledWith('some url', {
                    body,
                    "headers": {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    "method": "POST"
                });
                expect(err).toEqual('some error');
            }
        });
    });
});