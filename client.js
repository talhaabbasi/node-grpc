const grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader")
const packageDefinition = protoLoader.loadSync("todo.proto", {})

const grpcObject = grpc.loadPackageDefinition(packageDefinition)
const todoPackage = grpcObject.todoPackage

const client = new todoPackage.Todo(
  "localhost:40000",
  grpc.credentials.createInsecure()
)

client.createTodo(
  {
    id: -1,
    text: "Feed the dog",
  },
  (err, response) => {
    console.log("Received from server" + JSON.stringify(response))
  }
)

client.readTodos({}, (err, response) => {
  response.items.forEach((i) => console.log(i.text))
})
