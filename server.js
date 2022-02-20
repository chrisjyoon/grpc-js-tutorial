var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");

var PROTO_PATH = __dirname + '/protos/room-rates.proto';
const option = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
}
var packageDefinition = protoLoader.loadSync(PROTO_PATH, option)
const roomRatesProto = grpc.loadPackageDefinition(packageDefinition).roomRates
const server = new grpc.Server()
let roomTypes = [
  { id: '1', code: 'DLX' },
  { id: '2', code: 'STD' },
]

server.addService(roomRatesProto.RoomRateService.service, {
  getRoomTypes: (call, callback) => {
    console.log('received call => ', call.request)
    callback(null, { roomTypes })
  }
})

server.bindAsync(
  '127.0.0.1:50051',
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log('Server running at http://localhost:50051')
    server.start()
  }
)