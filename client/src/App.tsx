import UserContext from "./components/UserContext";

import Views from "./components/Views";
import socket from "./socket-io.js";

function App() {
  socket.connect();
  return (
    <div className="App">
      <UserContext>
        <Views />
      </UserContext>
    </div>
  );
}

export default App;
