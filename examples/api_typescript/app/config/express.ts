import express from 'express';
import bodyParser from 'body-parser'

export function applyConfig(app: express.Application) {
    app.use(bodyParser.json())
}