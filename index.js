const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write(
      "<html><head><title>Node Js Server</title></head><Body><h1>Hi from server</h1><form action='/message' method='POST'><input label='write message' type='text' name='message'><button type='submit'>submit</button></form></Body></html>"
    );
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      fs.writeFile(
        "message.txt",
        Buffer.concat(body).toString().split("=")[1],
        (err) => {
          res.statusCode = 302;
          res.setHeader("Location", "/");
          return res.end();
        }
      );
    });
  }
});

server.listen(3000, () => {
  console.log(`server running on ${3000}`);
});
