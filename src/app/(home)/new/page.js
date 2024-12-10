import React from 'react';

const HairServices = () => {
    return (
        <div className="hair-services">
            <h1>HAIR SERVICES</h1>
            <div className="blonding">
                <h2>BLOADING</h2>
                <div className="service">
                    <h3>Baby Lights Full</h3>
                    <p>From $230</p>
                    <p>Baby lights are very fine, white blonde highlights that are carefully placed to mimic a baby blonde, sun-kissed look.</p>
                </div>
                <div className="service">
                    <h3>Balayage Full</h3>
                    <p>From $155</p>
                    <p>A Full Balayage focuses on hand painting the hair all throughout the head. Your colorist will hand-paint the color in vertical shapes directly onto your hair, creating a natural, blended, sun-kissed color.</p>
                </div>
                <div className="service">
                    <h3>Balayage Partial</h3>
                    <p>From $15</p>
                    <p>A Partial Balayage focuses on hand painting the top layers of your hair and around your face. Your colorist will hand-paint color directly onto your hair, creating a natural, blended, sun-kissed color.</p>
                </div>
                <div className="service">
                    <h3>Bleach Root Retouch</h3>
                    <p>From $125</p>
                </div>
            </div>
            <div className="cuts">
                <h2>CUTS</h2>
                <div className="service">
                    <h3>Women</h3>
                    <p>From $55</p>
                    <p>Includes shampoo & blowout</p>
                </div>
                <div className="service">
                    <h3>Bang Trim</h3>
                    <p>From $15</p>
                    <p>Dry cut</p>
                </div>
                <div className="service">
                    <h3>Men</h3>
                    <p>From $35</p>
                    <p>Includes shampoo, conditioning & styling</p>
                </div>
                <div className="service">
                    <h3>Beard Trim</h3>
                    <p>From $10</p>
                    <p>Trim only</p>
                </div>
                <div className="service">
                    <h3>Neck Clean Up</h3>
                    <p>Complementary service</p>
                </div>
            </div>
        </div>
    );
};

export default HairServices;