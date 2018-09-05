// @flow

import path from 'path';
import config from 'config';

import express from 'express';
import bodyParser from 'body-parser';

import cors from 'server/cors';
import html from 'server/html';

import api from 'server/api';


const {
    name,
    port,
    contentBase
} = config;

const PUBLIC_PATH = path.resolve (__dirname, contentBase);

express ()
    .use (cors)
    .use (express.static (PUBLIC_PATH))

    .use (bodyParser.json ())

    .use ('/api', api)
    .get ('*', html)

    .listen (port, () => {
        console.log (`* ${name} express server started on port ${port}`);
    });