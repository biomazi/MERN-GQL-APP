import './server/env';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { ApolloServer } from 'apollo-server-express';
import schema from './graphql';
import db from './models';
import jwt from 'jsonwebtoken';

const app = express();

const server = new ApolloServer({
  schema,
  context: ({ req, res }) => {
    const token = req.cookies.token;
    let user = null;
    try {      
      user = token ? jwt.verify(token, process.env.SECRET) : null;
    } catch (error) {
      console.log(error);
      throw new Error('Session expired, please log in!')
    }
    req.user = user;
    return { req, res, db };
  },
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

server.applyMiddleware({
  app,
  cors: {
    credentials: true,
    origin: 'http://localhost:3000',
  }
});

module.exports = app;
