import "./App.css";
import ImageSlider from "./components/ImageSlider";

function App() {
  return (
    <>
      <ImageSlider url="https://picsum.photos/v2/list?" page={2} limit={7} />
    </>
  );
}

export default App;
