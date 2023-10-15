import "../Styles/Home.css";
import Navbar from "./Navbar";

export const Home = () => {
  return (
    <>
      <div className="homeContainer">
        <Navbar />
        <div className="mainHomeBody">
          <h2>WELCOME TO WORLD NATURE TOURISM</h2>
        </div>
      </div>
    </>
  );
};

export default Home;
