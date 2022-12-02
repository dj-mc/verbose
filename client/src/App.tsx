import ThemeToggle from "./components/ThemeToggle";
import { UserContext } from "./components/UserContext";
import Views from "./components/Views";

function App() {
  return (
    <div className="App">
      <UserContext>
        <Views />
        <ThemeToggle />
      </UserContext>
    </div>
  );
}

export default App;
