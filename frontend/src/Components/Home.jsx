import "../Styles/Home.css";
import Navbar from "./Navbar";

export const Home = () => {
  return (
    <>
      <div className="homeContainer">
        <Navbar />
        <div className="mainHomeBody">
          <h1>WELCOME TO WORLD TOURISM</h1>
        </div>
      </div>
    </>
  );
};

export default Home;
