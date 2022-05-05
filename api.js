import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(path.dirname(import.meta.url));
const api = express();

api.use(express.static(path.join(__dirname, 'public')));
api.use('/',express.static('index.html'));

export {
    api,
}