import { useEffect, useState } from 'react';
import init from "./Init"


const Main = () => {
  const [initialised, setInitialised] = useState(false);

    useEffect(() => {
          !initialised ? init() : setInitialised(true)
    }, [initialised])

    return (
      <div className="App">
        <div className="game-container">
            <canvas className="game-canvas" width="768" height="432">
            </canvas>
        </div>
      </div>
    );
  }
  
  export default Main;
  