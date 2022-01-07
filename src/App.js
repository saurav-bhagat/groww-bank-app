import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";

import './App.css';
import AllBanks from "./components/AllBanks";
import BankDetails from "./components/BankDetails";
import Home from "./components/Home";

const App = () => {
	console.log("Inside app component")
	return (
		<div className="App">
			<Router basename={process.env.PUBLIC_URL}>
				<Routes>
					<Route exact path="/" element={ <Home />} />
					<Route exact path="/all-banks" element={<AllBanks />} />
					<Route exact path="/bank-details/:ifsc_code" element={<BankDetails />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
