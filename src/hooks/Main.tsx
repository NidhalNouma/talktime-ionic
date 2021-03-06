import Peer from "simple-peer";
import { io } from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { URL } from "../constant";

const Main = (
  type: Number,
  close: Function,
  setStream: any,
  setRStream: any,
  id: string,
  show: Function
) => {
  const [startCall, setStartCall] = useState(false);

  const [socket, setSocket] = useState<any>(null);

  const peer = useRef<any>(null);

  useEffect(() => {
    if (type === 1) {
      setSocket(io(URL, { reconnectionDelayMax: 10000, query: { id } }));

      console.log("start ....");
    } else if (type === 0) {
      setStartCall(false);
      if (socket) {
        socket.send(JSON.stringify({ type: "end" }));
        socket.destroy();
        setSocket(null);
        if (peer && peer.current) {
          peer.current.destroy();
          peer.current = null;
        }
        console.log("ERROR send end");
      }
    }
  }, [type]);

  useEffect(() => {
    if (socket) {
      let stream: any = null;

      socket.on("error", function (err: any) {
        console.error("[socket error]", err.stack || err.message || err);
      });

      socket.on("connect", async function () {
        // console.log("id ==>", socket.id, socket);
        await getMediaUser(next, (s: any) => (stream = s));
      });

      socket.onAny((evtName: String, message: String) =>
        onData(evtName, message)
      );

      const onData = (evtName: String, message: String | any) => {
        console.log("got socket message: " + message + evtName);
        try {
          message = JSON.parse(message);
        } catch (err: any) {
          console.error("[socket error]", err.stack || err.message || err);
        }

        // console.log("messege is ", message);

        if (message.type === "signal") {
          handleSignal(message.data);
        } else if (message.type === "count") {
          console.log(message.data);
        } else if (message.type === "end") {
          next();
        } else if (message.type === "peer") {
          handlePeer(message.data);
        }
      };

      const next = () => {
        if (peer && peer.current) {
          console.log("ok");
          if (socket && socket.connected)
            socket.send(JSON.stringify({ type: "end" }));
          peer.current.destroy();
          close();
        }
        if (socket && socket.connected)
          socket.send(JSON.stringify({ type: "peer" }));
      };

      const handlePeer = async (data: Object | any) => {
        data = data || {};

        let config = {
          iceServers: [
            {
              urls: "stun:stun.l.google.com:19302",
            },
            {
              urls: "turn:3.8.135.133:3478",
              username: "username1",
              credential: "password1",
            },
          ],
        };

        peer.current = new Peer({
          initiator: !!data.initiator,
          trickle: false,
          stream,
          streams: [stream],
          config,
        });

        peer.current.on("error", function (err: any) {
          console.error("peer error", err.stack || err.message || err);
        });

        peer.current.on("connect", function () {
          setStartCall(true);
        });

        peer.current.on("signal", function (data: any) {
          socket.send(JSON.stringify({ type: "signal", data: data }));
        });

        peer.current.on("stream", function (rstream: any) {
          setRStream(rstream);
        });

        // peer.current.on("data", function (message: any) {
        // addChat(message, "remote");
        // });

        // Takes ~3 seconds before this event fires when peerconnection is dead (timeout)
        peer.current.on("close", next);
      };

      const handleSignal = (data: any) => {
        if (peer && peer.current) peer.current.signal(data);
      };
    }
  }, [socket]);

  const getMediaUser = async (next: Function, fn: Function) => {
    console.log("Getting/requesting audio permission ...");
    const constraints = { audio: true };

    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (s) {
          fn(s);
          setStream(s);

          next();
        })
        .catch(function (err) {
          console.error(err);
          show("Can not access this device microphone!", -1);
        });
    } else {
      show("Can not access this device microphone!", -1);
    }
  };

  return { startCall };
};

export default Main;
