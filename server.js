const grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader")
const packageDefinition = protoLoader.loadSync("todo.proto", {})

const grpcObject = grpc.loadPackageDefinition(packageDefinition)
const todoPackage = grpcObject.todoPackage

const server = new grpc.Server()

server.bind("0.0.0.0:40000", grpc.ServerCredentials.createInsecure())

server.addService(todoPackage.Todo.service, {
  createTodo: createTodo,
  readTodos: readTodos,
})

server.start()

function createTodo(call, callback) {
  console.log(call)
}
function readTodos(call, callback) {
  console.log(call)
}
