import "./App.css";

import { CardImage } from "./components/CardImage";
import { Button } from "./components/Button";
import { useFetchImages } from "./hooks/useFetchImages";
import { useState } from "react";
import { InputNumber } from "./components/InputNumber";

function App() {
  const [albumCount, setAlbumCount] = useState(1);
  const [imagesCount, setImagesCount] = useState(1);

  const [images, loading, error] = useFetchImages(
    `https://jsonplaceholder.typicode.com/photos?albumId=${albumCount}`
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <div className="cards">
        {error ? (
          <h2>There was an error in the api. {error.statusCode}</h2>
        ) : (
          images
            .filter((_, index) => index < imagesCount)
            .map((img) => <CardImage {...img} />)
        )}
      </div>

      <div className="controls">
        <Button
          className="button"
          text="Add Random Img"
          onClickCb={() => {
            setAlbumCount(error ? 1 : albumCount + 1);
          }}
        />
        <InputNumber
          className="input-number"
          cb={(val: number) => {
            setImagesCount(val);
          }}
        />
      </div>
    </div>
  );
}

export default App;
