import React from "react";
import { Provider } from "react-redux";
import { HashRouter, Switch, Route } from "react-router-dom";
import { configureStore } from "./store/reduxStore";
import { Templates } from "./templates";
import Usuario from "./pages/Usuario";
import FichaUsuario from "./pages/FichaUsuario";

const App = () => {
  return (
    <Provider store={configureStore()}>
      <HashRouter>
        <Switch>
          <Templates>
            <Route exact path="/" component={Usuario} />
            <Route exact path="/ficha/:id" component={FichaUsuario} />
          </Templates>
        </Switch>
      </HashRouter>
    </Provider>
  );
};

export default App;