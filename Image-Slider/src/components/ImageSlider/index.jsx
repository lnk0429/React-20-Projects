import { useEffect, useState } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
//<IoArrowBackCircleSharp />
import { IoArrowForwardCircleSharp } from "react-icons/io5";
//<IoArrowForwardCircleSharp />

export default function ImageSlider({ url, page = 1, limit = 5 }) {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [curImg, setCurImg] = useState(0);

  //   FUNCTION
  async function fetchData(url, page, limit) {
    try {
      setError("");
      setLoading(true);

      const response = await fetch(`${url}page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error("No data available, please check url.");
      }
      const data = await response.json();
      if (data?.length > 0) {
        setData(data);
        console.log(data);
      }
    } catch (e) {
      console.log(e.message);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  //FUNCTION
  function handleNext() {
    if (curImg === data.length - 1) {
      setCurImg(0);
    } else {
      setCurImg((prev) => prev + 1);
    }
  }

  function handlePrevious() {
    if (curImg === 0) {
      setCurImg(data.length);
    }
    setCurImg((prev) => prev - 1);
  }

  function selectImg(index) {
    setCurImg(index);
  }

  //   USE EFFECT
  useEffect(() => {
    fetchData(url, page, limit);
  }, [url, page, limit]);

  //   REACT
  return (
    <div className="w-screen h-screen bg-green-950 flex justify-center items-center">
      <div className="w-[500px] h-[500px] flex justify-center items-center">
        <div className="flex justify-center relative items-center">
          <IoArrowBackCircleSharp
            className="absolute left-2 fill-gray-950 text-3xl hover:fill-white transition-all ease-in-out duration-300 hover:scale-110"
            onClick={handlePrevious}
          />
          {data?.length > 0
            ? data.map((imgItem, index) => (
                <img
                  src={imgItem.download_url}
                  alt={imgItem.download_url}
                  key={index}
                  className={index === curImg ? "block rounded-3xl" : "hidden"}
                />
              ))
            : null}
          <IoArrowForwardCircleSharp
            className="absolute right-2   fill-gray-950 text-3xl hover:fill-white hover:scale-110 transition-all ease-in-out duration-300"
            onClick={handleNext}
          />
          <div className="absolute -bottom-10 flex gap-4">
            {data.map((_, index) => (
              <button
                key={index}
                className={
                  index === curImg
                    ? "bg-gray-900 w-3 h-3 rounded-full scale-150"
                    : "bg-white w-3 h-3 rounded-full"
                }
                onClick={() => selectImg(index)}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// url:picsum.photos/v2/list?page=1&limit=5
//bg-white w-3 h-3 rounded-full
