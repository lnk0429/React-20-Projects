import { useEffect, useState } from "react";

export default function RandomColor() {
  // UseSTATE
  const [color, setColor] = useState("#000000");

  const [colorType, setColorType] = useState("hex");

  //   Function
  function handleColor(currType) {
    setColorType(currType);
  }

  function randomNumber(length) {
    return Math.floor(Math.random() * length);
  }

  function hexColor() {
    const characterList = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
    ];

    let hex = "#";
    for (let i = 0; i < 6; i++) {
      hex += characterList[randomNumber(characterList.length)];
    }
    setColor(hex);
  }

  function rgbColor() {
    const r = randomNumber(256);
    const g = randomNumber(256);
    const b = randomNumber(256);
    setColor(`rgb(${r},${g},${b})`);
  }

  //   UseEffct
  useEffect(() => {
    if (colorType === "rgb") rgbColor();
    else hexColor();
  }, [colorType]);

  // REACT
  return (
    <div
      style={{
        backgroundColor: color,
      }}
      className="w-screen h-screen"
    >
      {/* Selection section*/}
      <div className="flex p-10 justify-center gap-5">
        <button
          onClick={() => handleColor("hex")}
          className="bg-amber-500 rounded-4xl px-5 py-1 font-bold hover:text-white"
        >
          HEX Color
        </button>
        <button
          onClick={() => handleColor("rgb")}
          className="bg-amber-500 rounded-4xl px-5 py-1 font-bold hover:text-white"
        >
          RGB Color
        </button>
        <button
          className="bg-amber-500 rounded-4xl px-5 py-1 font-bold hover:text-white"
          onClick={colorType === "hex" ? hexColor : rgbColor}
        >
          Create A Random Color
        </button>
      </div>
      {/* Text section */}
      <p className="text-4xl flex justify-center">
        {colorType === "rgb" ? `${color}` : `HEX ${color}`}
      </p>
    </div>
  );
}
