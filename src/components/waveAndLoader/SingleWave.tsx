import React, { useState, useEffect } from "react";
const Wavei = require("wave-visualizer");

interface ContainerProps {
  lstream: Object;
}

const Wave: React.FC<ContainerProps> = ({ lstream }) => {
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
    lwave.fromStream(lstream, "lwave", {
      type: "shine",
      colors: ["rgba(45, 134, 233, 1)", "white", "blue"],
    });

    const intr = setInterval(setTimer, 1000);

    return () => {
      lwave.stopStream();
      clearInterval(intr);
    };
  }, []);

  return (
    <div className="waves swave">
      {/* <canvas style={{ maxHeight: "110px" }} id="wave"></canvas> */}
      <canvas style={{ maxHeight: "110px" }} id="lwave"></canvas>
    </div>
  );
};

export default Wave;
