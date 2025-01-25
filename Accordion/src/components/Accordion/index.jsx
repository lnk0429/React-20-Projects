import { useState } from "react";
import data from "./data";
export default function Accordion() {
  //STATE
  const [showIndex, setShowIndex] = useState(null);

  const [mulChoice, setMulChoice] = useState(false);

  const [mulList, setMulList] = useState([]);
  //   FUNC
  function handleToggle(curIndex) {
    if (mulChoice) {
      if (mulList.includes(curIndex)) {
        setMulList(mulList.filter((i) => i !== curIndex));
      } else {
        setMulList([...mulList, curIndex]);
      }
    } else {
      if (curIndex === showIndex) {
        setShowIndex(null);
      } else {
        setShowIndex(curIndex);
      }
    }
  }

  function handleMulti() {
    setMulChoice(!mulChoice);
    setMulList([]);
    setShowIndex(null);
  }
  // REACT
  return (
    <div>
      {/* Multi function btn */}
      <div>
        <button
          className="bg-violet-500 hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700 rounded-full p-2 hover:text-white"
          onClick={handleMulti}
        >
          {mulChoice ? "Single Choice" : "Multiply Choice"}
        </button>
      </div>
      {data?.length > 0
        ? data.map((item, index) => (
            <div
              key={index}
              className="flex justify-center items-center py-10 flex-col gap-10"
            >
              {/* Question box */}
              <div className="flex gap-10">
                {/* Question */}
                <div>
                  <p>{item.question}</p>
                </div>
                {/* Button */}
                <button
                  onClick={() => handleToggle(index)}
                  className="bg-amber-500 w-[20px] h-[20px] flex justify-center items-center
                  rounded-full hover:text-white font-bold"
                >
                  +
                </button>
              </div>
              {/* Answer box */}
              {/* {showIndex === index ? <div>{item.answer}</div> : null} */}
              {mulChoice ? (
                mulList.includes(index) ? (
                  <div>{item.answer}</div>
                ) : null
              ) : showIndex === index ? (
                <div>{item.answer}</div>
              ) : null}
            </div>
          ))
        : null}
    </div>
  );
}
