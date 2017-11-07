const path = require('path');
const net = require('net');
const fs = require('fs');
const crypto = require('crypto');
const port = 8124;
const saveDirectory = process.env.NODE_PATH;
const maxConnection = process.env.CONST_MAX_CONNECTION;

const remote = "Remote";
const ack = "ACK";
const dec = "DEC";
const accept = "File received";

let seed = 0;
let clientModes = [];
let file = [];
let separator = "||";

const server = net.createServer((client) => {


    client.on('data', (data) => {
        if (data.toString() === dec) {
            console.log("UNDEFINED DISCONNECT FROM SERVER BY DEC COMMAND");
            client.write(dec);
            client.end();
        }
    });
    client.on('data', ClientHandler);
    client.on('data', ClientFilesDialogue);
    client.on('end', () => console.log(`Client ${client.id} disconnected`));



    function ClientHandler(data, error) {
        if (!error) {
            console.log("client handler")
            if (client.id === undefined && (data.toString() === remote)) {
                client.id = Date.now().toString() + seed++;
                console.log(`Client ${client.id} connect`);
                clientModes[client.id] = data.toString();
                    fs.mkdirSync(saveDirectory + path.sep + client.id);
                client.write(ack);
            }
        }
        else {
            console.error("ClientHandler error : " + error);
            client.write(dec);
        }
    }
    function ClientFilesDialogue(data, error) {
        if (!error) {
            if (clientModes[client.id] === remote && data.toString() !== "remote") {
				if(data.toString().startsWith("COPY"))
				{
					let cop_data=data.toString().split(separator);
					CreateFile(cop_data[1], saveDirectory+"/"+client.id+"/"+cop_data[2], client);
				}
				if(data.toString().startsWith("ENCODE"))
				{
					let cop_data=data.toString().split(separator);
					EncodeFile(cop_data[1], client.id+"/"+cop_data[2], client, key);
				}
				if(data.toString().startsWith("DECODE"))
				{
					let cop_data=data.toString().split(separator);
					DecodeFile(cop_data[1], client.id+"/"+cop_data[2], client, key);
				}
				
				
				
				
            }
        }
        else {
            console.error("ClientFilesDialogue error : " + error);
        }
    }
});
server.maxConnections = maxConnection;

server.listen(port, () => {
    console.log(`Server listening on localhost:${port}`);
});

function CreateFile(or_pat, pat, client) {
    console.log("createfile");
	let rs= fs.createReadStream(or_pat);
	let ws= fs.createWriteStream(pat);
	rs.pipe(ws);
	ws.on('finish', ()=>{
	console.log("copying success");
	});
}

function EncodeFile(or_pat, pat, client) {
    console.log("createfile");
	let rs= fs.createReadStream(or_pat);
	let ws= fs.createWriteStream(pat);
	re.pipe(ws);
	ws.on('finish', ()=>{
	console.log("copying success");
	});
}

function DecodeFile(or_pat, pat, client) {
    console.log("createfile");
	let rs= fs.createReadStream(or_pat);
	let ws= fs.createWriteStream(pat);
	re.pipe(ws);
	ws.on('finish', ()=>{
	console.log("copying success");
	});
}