import { UserContext } from "./components/UserContext";

import Views from "./components/Views";

function App() {
  return (
    <div className="App">
      <UserContext>
        <Views />
      </UserContext>
    </div>
  );
}

export default App;
