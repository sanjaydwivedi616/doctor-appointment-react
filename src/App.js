import './App.css';
import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";
import RouterPage from './component/router/Router';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <div className="container">
        <RouterPage />
      </div>
      {/* <Footer></Footer> */}
    </div>
  );
}

export default App;
