import supertest from 'supertest';
import { server } from '../src/server/Server.js';



export const request = supertest(server);
