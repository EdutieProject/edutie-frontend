import * as React from 'react';

import "./ViewDziedziny.css";
import Slider from "./Slider";
import grawitacja from "./staticPhotos/grawitacja.svg";
import ladunki from "./staticPhotos/ladunki.svg";
import aerodynamika from "./staticPhotos/aeorodynamika.svg";



export default function ViewDziedziny() {
    const images = [
        grawitacja,
        ladunki,
        aerodynamika,
        // Add more image URLs as needed
    ];

    const headerTexts = [
        'Grawitacja displaying',
        'Elektrostatyka displaying',
        'Aeorodynamika displaying',
        // Add more header texts as needed
      ];

    return (

        <div className="root">
            <div className="container">
                <div className="item gallery">
                    <div className="wrapper">
                        <Slider images={images} headerTexts={headerTexts}/>
                    </div>
                </div>


            </div>
        </div>

    )
}

