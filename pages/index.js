import ColorPickerContainer from "../components/ColorPickerContainer";
import Header from "../components/Header";
import { PainterContext } from "../contexts/PainterContext";
import { useState } from "react";
import Canvas from "../components/Canvas";
import CanvasLib from "../libs/CanvasLib";

export default function Home() {
  //selected color from color picker
  //set black color as default
  const [selColor, setSelColor] = useState("#000000");
  const [intervalID, setIntervalID] = useState(null);

  //16x16 2D Array that holds color data
  const [pixels, setPixels] = useState(CanvasLib.createEmptyCanvas());

  //will be called by Cell component
  const paint = (xPos, yPos) => {
    //copy from old 2d Array
    const newPixels = CanvasLib.copyCanvas(pixels);
    newPixels[xPos][yPos] = selColor;
    setPixels(newPixels);
  };

  const clear = () => {
    setPixels(CanvasLib.createEmptyCanvas());
  };

  const randomCanvas = () => {
    setPixels(CanvasLib.createRandomCanvas());
  };

  const playDisco = () => {
    const id = setInterval(() => {
      setPixels(CanvasLib.createRandomCanvas());
    }, 100);
    setIntervalID(id);
  };

  const stopDisco = () => {
    clearInterval(intervalID);
    setIntervalID(null);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "GhostWhite" }}>
      <PainterContext.Provider value={{ selColor, setSelColor, pixels, paint }}>
        <Header />
        <ColorPickerContainer />
        <Canvas />

        <div className="d-flex justify-content-center gap-2">
          <button className="btn btn-dark" onClick={clear}>
            Clear
          </button>
          <button className="btn btn-dark" onClick={randomCanvas}>
            Random Color
          </button>
          <button
            className="btn btn-dark"
            onClick={intervalID == null ? playDisco : stopDisco}
          >
            {intervalID == null ? "Play Disco" : "Stop Disco"}
          </button>
        </div>
      </PainterContext.Provider>
    </div>
  );
}
