
import config from 'config';
import http from 'http';
import app from './app';

const httpServer = http.createServer(app);
const serverConfig: {port: number} = config.get('server');

httpServer.listen(serverConfig.port).on('listening', () => {
	console.log(`Server started at port ${serverConfig.port}`);
})
