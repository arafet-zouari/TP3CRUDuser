const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader'); 
const packageDef = protoLoader.loadSync( "todo.proto" , {}); 
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage; 

const server = new grpc.Server(); 

server.bind('localhost:9000' , grpc.ServerCredentials.createInsecure());
server.addService(todoPackage.Todo.service,{
	'create': create,
	'get' : get,
	'delet':delet,
	'update':update
	
}); 

server.start(); 

const todos = []; 

function create (call , callback) {
	const todoItem = { 
	   'id' : todos.length +1 , 
	   'username' : call.request.username
	}
	todos.push(todoItem);
	callback(null, todoItem); 	
}

function get(call , callback)
{
	callback(null , {
		'items': todos
		
	}); 
}
function delet (call , callback)
{ const todoItem = { 
	'id' : call.request.id , 
	'username' : call.request.username
 }
 const index =todos.findIndex(u => u.id == todoItem.id  & u.username==todoItem.username);
 todos.splice(index,1);
	callback(null , {
		'items': todos	
	}); 
}
function update(call , callback) {
	const todoItem = { 
        'id':call.request.id,
	   'username' : call.request.username,
       
	}
	const index =todos.findIndex(u => u.id == todoItem.id  & u.username==todoItem.username);
	
	todos[index].username=todoItem.username;
	callback(null, {'items': todos	
}); 
	
}