import "../src/scss/default/defaultCssReset.scss";
import "../src/scss/main.scss";
import "../src/assets/fonts/fonts.css";
import Widgets from "./Pages/Widgets";

export default function App() {
  return (
    <div className="main">
      <Widgets />
    </div>
  );
}
