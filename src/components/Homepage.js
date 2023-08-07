import React from "react";

import "./css/home.css";
import Product from "./product";

export default function Homepage() {

  return (
    <div className="home">
      <div className="home_container">
        <img
          className="banner_image"
          src="https://m.media-amazon.com/images/I/71U-Q+N7PXL._SX3000_.jpg"
          alt=""
        />

        <div className="home_row">
          <Product 
          id = {1}
            title={"The Lean start Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde non veritatis provident sunt repellat qui culpa deleniti incidunt necessitatibu"}
            image={
              "https://www.thesecret.tv/wp-content/uploads/2015/05/The-Magic-Book.png"
            }
            rating={5}
            price={29.99}
          />
          
          <Product
          id = {2}
            title={"Kenwood HM330 250-Watt Hand Mixer (White) Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde non veritatis provident sunt repellat q"}
            image={
              "https://m.media-amazon.com/images/I/71HVkHUm-nL._SX679_.jpg"
            }
            price={29.99}
            rating={4}
          />
        </div>

        <div className="home_row">
          
          <Product 
          id = {3}
          title={"Apple EarPods with Lightning Connector Lorem ipsum dolor sit amet consectetur adipisicing elit. "} 
          image={"https://m.media-amazon.com/images/I/418AP8pw3KL._SX679_.jpg"}
          price={10.99}
          rating={3}
          />

          <Product 
          id = {4}
          title={"Samsung Galaxy Buds Live Bluetooth Truly Wireless in Ear Earbuds with Mic, Upto 21 Hours Playtime, Mystic Black"}
          image={"https://m.media-amazon.com/images/I/61G5JoU9tTL._SX679_.jpg"}
          price={40.50}
          rating={5}
          />
          <Product 
          id = {5}
          title={"Ambrane Trone Wired Gaming Mouse with 7 Programmable Buttons, 3-Speed Customizable 3600 DPI, Comfortable Grip, Breathing LED Lighting, Fast Response Time, 1.5m Long USB Cable, Lightweight (Black)"}
          image={"https://m.media-amazon.com/images/I/61j3PlZuOLL._SX679_.jpg"}
          price={10.99}
          rating={5}
          />
          
        </div>

        <div className="home_row">
          {/* 1 products*/}
          <Product 
          id = {6}
          title={"Copy"}
          image={"https://m.media-amazon.com/images/I/61j3PlZuOLL._SX679_.jpg"}
          price={9999.99}
          rating={7}
          />
        </div>
      </div>
    </div>
  );
}
