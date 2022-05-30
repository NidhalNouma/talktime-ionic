const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
const port = process.argv[2] || 8080;

const photos = require("./api/photos");
const audio = require("./api/audio");
const user = require("./api/user");

app.use("/p", photos);
app.use("/photos", photos);
app.use("/audio", audio);
app.use("/user", user);

const path = require("path");
app.use("/icons", express.static(path.join(__dirname, "../build/icons")));
app.use("/static", express.static(path.join(__dirname, "../build/static")));

var count = 0;
const hosts = { default: { peers: {}, waitingId: null } };
const arrHosts = [];

app.post("/host/:id", (req, res) => {
  const r = { id: req.params.id, exist: false };

  const host = arrHosts.find((host) => host === r.id);
  if (host) {
    r.exist = true;
  } else arrHosts.push(r.id);

  res.json(r);
});

app.post("/host/d/:id", (req, res) => {
  const r = { id: req.params.id, delete: false };

  const host = arrHosts.find((host) => host === r.id);
  if (host) {
    var index = arrHosts.indexOf(r.id);
    if (index !== -1) {
      arrHosts.splice(index, 1);
    }
    r.delete = true;
  }

  res.send(r);
});

app.get("/live/:id", (req, res) => {
  const id = req.params.id;

  const host = arrHosts.find((host) => host === id);
  if (host) {
    return res.sendFile(path.join(__dirname, "../build/index.html"));
  } else return res.redirect("/talk");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

const server = http.createServer(app);

var socket = require("socket.io")(server, {
  pingTimeout: 7000,
  pingInterval: 3000,
  cors: {
    origin: "*",
  },
});
socket.on("connection", onconnection);

function onconnection(peer) {
  console.log(peer.id);

  var send = peer.send;
  peer.send = function () {
    try {
      send.apply(peer, arguments);
    } catch (err) {}
  };

  const hostId = peer.handshake.query.id;
  if (hostId === "undefined") hosts.default.peers[peer.id] = peer;
  else {
    if (!hosts[hostId]) {
      hosts[hostId] = { peers: {}, waitingId: null };
      hosts[hostId].peers = { [peer.id]: peer };
      hosts[hostId].waitingId = null;
    } else {
      hosts[hostId].peers = { ...hosts[hostId].peers, [peer.id]: peer };
    }
  }

  console.log(hosts);

  peer.on("disconnect", () => onclose(peer));
  peer.on("error", () => onclose(peer));
  peer.on("message", onmessage.bind(peer));
  count += 1;
  broadcast(JSON.stringify({ type: "count", data: count }), hostId);
}

function onclose(p) {
  console.log("====END");

  const hostId = p.handshake.query.id;
  let pp = hostId === "undefined" ? hosts.default : hosts[hostId];

  pp.peers[p.id] = null;
  delete pp.peers[p.id];

  if (p.id === pp.waitingId) {
    pp.waitingId = null;
  }
  if (p.peerId) {
    var peer = pp.peers[p.peerId];
    peer.peerId = null;
    peer.send(JSON.stringify({ type: "end" }), onsend);
  }
  count -= 1;
  broadcast(JSON.stringify({ type: "count", data: count }), hostId);
}

function onmessage(data) {
  console.log("[" + this.id + " receive] " + data + "\n");
  try {
    var message = JSON.parse(data);
  } catch (err) {
    console.error("Discarding non-JSON message: " + err);
    return;
  }

  const hostId = this.handshake.query.id;
  let pp = hostId === "undefined" ? hosts.default : hosts[hostId];

  if (message.type === "peer") {
    if (pp.waitingId && pp.waitingId !== this.id) {
      var peer = pp.peers[pp.waitingId];

      this.peerId = peer.id;
      peer.peerId = this.id;

      this.send(
        JSON.stringify({
          type: "peer",
          data: {
            initiator: true,
          },
        }),
        onsend
      );

      peer.send(
        JSON.stringify({
          type: "peer",
        }),
        onsend
      );

      pp.waitingId = null;
    } else {
      pp.waitingId = this.id;
    }
  } else if (message.type === "signal") {
    if (!this.peerId) return console.error("unexpected `signal` message");
    var peer = pp.peers[this.peerId];
    peer.send(JSON.stringify({ type: "signal", data: message.data }));
  } else if (message.type === "end") {
    if (!this.peerId) return console.error("unexpected `end` message");
    var peer = pp.peers[this.peerId];
    // onclose(peer);
    peer.peerId = null;
    this.peerId = null;
    peer.send(JSON.stringify({ type: "end" }), onsend);
  } else {
    console.error("unknown message `type` " + message.type);
  }
}

function onsend(err) {
  if (err) console.error(err.stack || err.message || err);
}

function broadcast(message, hostId) {
  let pp = hostId === "undefined" ? hosts.default : hosts[hostId];

  for (var id in pp.peers) {
    var peer = pp.peers[id];
    if (peer) {
      peer.send(message);
    }
  }
}

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
