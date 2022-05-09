const mqtt = require('mqtt')

// first broker in cluster
const client = mqtt.connect('mqtt://broker.hivemq.com')
// second broker in cluster
const client1 = mqtt.connect('mqtt://test.mosquitto.org')

//connecting to the broker and subscribing to all the messages from topic tamucc/+ (all sub topics of tamucc topic)
client.on('connect', function () {
  console.log("connected to client hive mq")
  client.subscribe('tamucc/+', function (err) {
  })
})

// # broker 1
// depending on brokerid routing the message to the broker
client.on('message', function (topic, message) {
  var obj = JSON.parse(message.toString());
  if (obj.brokerid == "broker2")
    client1.publish(topic, message)
})

//connecting to the broker and subscribing to all the messages from topic tamucc/+ (all sub topics of tamucc topic)
client1.on('connect', function () {
  console.log("connected to client mosquitto")
  client1.subscribe('tamucc/+', function (err) {
  })
})

// # broker 2
// depending on brokerid routing the message to the broker
client1.on('message', function (topic, message) {
  var obj = JSON.parse(message.toString());
  if (obj.brokerid == "broker1")
    client.publish(topic, message)
})
