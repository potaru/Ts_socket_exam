import * as appx from 'express';
import * as httpx from 'http';
import * as iox from 'socket.io';

import config from "./config/config";
import { router as main } from './router/main';


declare var __dirname;

const app = appx();
const http = httpx.createServer(app);
const io = iox(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/views/index.html');
});

app.use(appx.static(__dirname+'/public'));
app.use('/', main);

io.on('connection', function(socket){
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
});

http.listen(config.port, function(){
	console.log('listening on *:'+config.port+'');
});

