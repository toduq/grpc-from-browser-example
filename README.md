# grpc-from-browser-example

This project is a minimal example to use gRPC from browser!

This project has 3 kind of modules.

- Kotlin Spring Boot gRPC server
- Typescript gRPC client for browser
- Nginx proxy uses `grpc_proxy`

## How to Run Servers

### Spring Boot

```
$ ./gradlew generateProto
$ ./gradlew bootRun
```

### Typescript Development Server

This example use parcel-bundler for compiling Typescript.

Before you run this server, you have to install the following binaries.

- protoc (http://google.github.io/proto-lens/installing-protoc.html)
- protoc-gen-grpc-web (https://github.com/grpc/grpc-web/releases)

```
$ cd client
$ npm install
$ npm run watch
```

### Nginx proxy

Before you run this server, you have to install docker.

```
$ npm run docker-run
```

Let's visit `http://localhost:8080/` to see the result! 

## Using ports

- 8080 (by nginx)
- 8081 (by parcel-bundler, accessed from nginx)
- 8082 (by spring boot, accessed from nginx)

## gRPC Development Notes

### grpcwebtext vs grpcweb

The protoc command's `--grpc-web_out` option has `mode` argument.
We can choose grpcwebtext (plain text) or grpcweb (binary).
In this example, I use grpcweb because grpcwebtext doesn't works well with Spring Boot...

### CORS problem

All gRPC requests from browser uses `POST` method.
If you want to separate assets serving servers(i.e. parcel-bundler) and nginx,
you have to configure CORS settings.

https://github.com/grpc/grpc-web/blob/master/net/grpc/gateway/examples/echo/nginx.conf

### Debug

You can use `grpc_cli` to send gRPC request directly(I mean without nginx) from your terminal.

https://github.com/grpc/grpc/blob/master/doc/command_line_tool.md

Before you use this tool, you have to enable `ProtoReflectionService`.
Let's comment-in the `grpc.enable-reflection` line on the `application.yml`.

```
grpc:
  port: 8082
  enable-reflection: true
```

```
$ grpc_cli call localhost:8082 SayHello 'name: "John"'
connecting to localhost:8082
message: "Hello John"

Rpc succeeded with OK status
```

Amazing.
