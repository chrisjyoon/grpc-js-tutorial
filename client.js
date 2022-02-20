var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");

var PROTO_PATH = "./protos/room-rates.proto";

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const roomRatesService = grpc.loadPackageDefinition(packageDefinition).roomRates;

const client = new roomRatesService.RoomRateService(
  "localhost:50051",
  grpc.credentials.createInsecure()
)

client.getRoomTypes({ hotelCode: 'HOTELJACKY', rateCode: 'R' }, (error, roomTypes) => {
  if (error !== null) throw error
  console.log('roomTypes =', roomTypes)
})
