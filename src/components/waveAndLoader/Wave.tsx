import React, { useState, useEffect } from "react";
const Wavei = require("wave-visualizer");

interface ContainerProps {
  lstream: Object;
  stream: Object;
}

const Wave: React.FC<ContainerProps> = ({ lstream, stream }) => {
  const [wave] = useState(new Wavei());
  const [lwave] = useState(new Wavei());

  const [rel, setRel] = useState(0);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setTimeout(() => {
      setRel((r) => r + 1);
      // console.log(rel);
    }, 1000);
    return () => clearTimeout(interval);
  }, [rel]);

  useEffect(() => {
    wave.fromStream(lstream, "wave", {
      type: "shine",
      colors: ["rgba(149, 54, 64,1)", "white", "blue"],
    });

    lwave.fromStream(stream, "lwave", {
      type: "shine",
      colors: ["rgba(45, 134, 233, 1)", "white", "blue"],
    });

    const intr = setInterval(setTimer, 1000);

    return () => {
      wave.stopStream();
      lwave.stopStream();
      clearInterval(intr);
    };
  }, []);

  return (
    <div className="waves">
      <canvas style={{ maxHeight: "130px" }} id="wave"></canvas>
      <canvas style={{ maxHeight: "130px" }} id="lwave"></canvas>
    </div>
  );
};

export default Wave;
