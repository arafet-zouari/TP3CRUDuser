const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader'); 
const packageDef = protoLoader.loadSync("todo.proto", {}); 
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage; 

const client = new todoPackage.Todo('localhost:9000' , grpc.credentials.createInsecure()); 
client.delet({
	'username' : 'arafet'
} , (err, response ) => { 
       console.log('sup avec succées' + JSON.stringify(response)); 
}) 
client.update({
	'id':2,
	'username' : 'sahar'
} , (err, response ) => { 
       console.log('MAJ avec succées' + JSON.stringify(response)); 
}) 
client.get({} , (err , response ) => {
	console.log('affichage utilisateur', JSON.stringify(response));
}) 
client.create({
	'id' : 1 , 
	'username' : 'arafet'
} , (err, response ) => { 
       console.log('creation avec succées' + JSON.stringify(response)); 
}) 
client.create({
	'id' : 2 , 
	'username' : 'asma'
} , (err, response ) => { 
       console.log('creation avec succées' + JSON.stringify(response)); 
}) 






