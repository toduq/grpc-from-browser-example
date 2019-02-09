import { HelloRequest } from './proto/helloworld_pb'
import { GreeterClient } from './proto/HelloworldServiceClientPb'

const service = new GreeterClient('http://localhost:8080', {}, {})

const request = new HelloRequest()
request.setName("John")

const call = service.sayHello(request, {}, (err, resp) => {
  if (err) {
    console.log(err.code)
    console.log(err.message)
  } else {
    document.getElementById('h1').innerText = resp.getMessage()
  }
})

call.on('status', (status) => {
  console.log(status.code)
  console.log(status.details)
  console.log(status.metadata)
})
