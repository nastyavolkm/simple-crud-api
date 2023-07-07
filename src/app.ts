import * as http from 'http';
import 'dotenv/config';
import { requestHandler } from "./requestHandler.js";

const DEFAULT_PORT = 4000;
const PORT = Number(process.env.PORT || DEFAULT_PORT);

const server = http.createServer(requestHandler(PORT));

server.listen(PORT,() => {
    console.log(`Server is listening on port ${PORT}`)
});

