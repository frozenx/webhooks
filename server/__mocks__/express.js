const express = jest.genMockFromModule('express');

const mockGet = jest.fn();
const mockPost = jest.fn();
express.mockGet = mockGet;
express.mockPost = mockPost;

express.Router = () => ({
  get: mockGet,
  post: mockPost,
});


module.exports = express;
