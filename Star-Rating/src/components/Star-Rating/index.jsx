import { useState } from "react";
import { TiStarFullOutline } from "react-icons/ti";

export default function StarRating({ numOfStar }) {
  // STATE
  const [hover, setHover] = useState(0);
  const [click, setClick] = useState(0);
  // FUNC
  function handleClick(curStar) {
    setClick(curStar);
  }

  function handleHover(curStar) {
    setHover(curStar);
  }

  function handLeave() {
    setHover(0);
  }
  //   REACT
  return (
    <div className="w-screen h-screen bg-gray-900 flex justify-center items-center text-5xl">
      {/* <TiStarFullOutline /> */}
      {[...Array(numOfStar)].map((_, index) => {
        index += 1;
        return (
          <TiStarFullOutline
            key={index}
            className={
              index <= (hover || click) ? "text-yellow-500" : "text-gray-950"
            }
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={handLeave}
          />
        );
      })}
    </div>
  );
}
