import React from 'react'
import './Home.css';
import Product from "./Product";

function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <img 
                className="home__image"
                src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" />
                <div className="home__row">
                    <Product
                        id="12321341" 
                        title='The lean startup' 
                        price={29.99} 
                        image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg" 
                        rating={5}
                    />
                    <Product
                        id="49538094" 
                        title='Dripex Freestanding Punching Bag 69 inch - 182lb Heavy Boxing Bag with Suction Cup Base' 
                        price={499.95} 
                        image="https://m.media-amazon.com/images/I/51+3Tu3vCPL._AC_UL320_.jpg" 
                        rating={5} 
                    />
                </div>

                <div className="home__row">
                    <Product 
                        id="25106389" 
                        title='BaoFeng UV-82 BaoFeng Radio 8 Watt High Power UHF VHF Ham Radio Dual Band Amateur BaoFeng Walkie Talkies Portable 2 Way Radio 5 Pack with Driver Free Programming Cable and Long Antenna' 
                        price={145.99} 
                        image="https://m.media-amazon.com/images/I/61W6RRYTRwL._AC_UY218_.jpg" 
                        rating={5} 
                    />
                    <Product 
                        id="31105927" 
                        title='Bear X Intense CD Ready to Shoot Crossbow Package with Scope, Quiver, Bolts, Cocking Rope, and Wax, Stoke Finish' 
                        price={329.99} 
                        image="https://m.media-amazon.com/images/I/814fr8qAZQL._AC_UL320_.jpg" 
                        rating={5} 
                    />
                    <Product 
                        id="71005825" 
                        title='Ruko F11 Pro Drone 4K Quadcopter UHD Live Video GPS Drones, FPV Drone with Camera for Adults' 
                        price={299.99} 
                        image="https://m.media-amazon.com/images/I/51O5I+MvACL._AC_UY218_.jpg" 
                        rating={5} 
                    />
                </div>

                <div className="home__row">
                    <Product
                        id="90529482" 
                        title='Samsung 85-inch Class Crystal UHD TU-8000 Series - 4K UHD HDR Smart TV with Alexa Built-in (UN85TU8000FXZA, 2020 Model)' 
                        price={1797.99} 
                        image="https://m.media-amazon.com/images/I/91FcuuZwcrL._AC_UY218_.jpg" 
                        rating={5}
                    />
                </div>
            </div>

            
        </div>
    )
}

export default Home
