import React from "react";
import TemporaryDrawer from "./Drawer";
import "./styles.css";
import Button from '../Button';
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <h1 className="logo">
        DropWatch<span style={{ color: "var(--red)" }}>.</span>
      </h1>
      <div className="links">
        <Link to="/">
          <p className="link">Home</p>
        </Link>
        <Link to="/compare">
          <p className="link">Compare</p>
        </Link>
        <Link to="/watchlist">
          <p className="link">Watchlist</p>
        </Link>
        <Link to="/dashboard">
        <Button text={"Dashboard"}/>
        </Link> 
      </div>

      <div className="drawer-component">
        <TemporaryDrawer />
      </div>
    </div>
  );
}

export default Header;
      // <h1 className='logo'>
      // <SplitText
      //     text=" CryptoTracker"
      //     className="text-2xl font-semibold text-center"
      //     delay={10}
      //     duration={2}
      //     ease="elastic.out(1,0.3"
      //     splitType="chars"
      //     from={{ opacity: 0, y: 40 }}
      //     to={{ opacity: 1, y: 0 }}
      //     threshold={0.5}
      //     rootMargin="-100px"
      //     textAlign="center"
      // />
      // </h1>