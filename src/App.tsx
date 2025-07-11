import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import AsteroidInfo from "./pages/AsteroidInfo";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/asteroidinfo" element={<AsteroidInfo />} />
			</Routes>
		</Router>
	);
}

export default App;
