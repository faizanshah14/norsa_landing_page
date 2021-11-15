import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import ClientForm from "./pages/ClientForm";
import Navigation from "./components/Navigation";
import Contact from "./components/Contact";
import "./App.css";

const App = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title> Norsa N.V.</title>
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
      <Router>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<ClientForm />} />
        </Routes>
        <Contact />
      </Router>
    </div>
  );
};

export default App;
