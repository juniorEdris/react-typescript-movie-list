import { FC } from 'react';
import { useRoutes } from "react-router-dom";
import router from "./router";


const App:FC = () =>  {

  const content = useRoutes(router);

  return (
    <div className="App">
      {content}
    </div>
  );
}

export default App;
