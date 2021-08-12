import React from 'react'
import '../css/infocard.css'
import discover from '../svg/discover.svg'
import plan from '../svg/plan.svg'
import travel from '../svg/travel.svg'
import { Link } from 'react-router-dom';

export default function InfoCard() {
    return (
        <div className="infocard-root">
            {/* <div className="row">
                <h3 className="infocard-text-main"> How we can help you </h3>
            </div> */}
            <div className="container">
                <div className="row feature-container">
                    <div className="col-sm-12 col-md-4 infocard-col">
                        <div>
                            <img src={plan} />
                        </div>
                        <div>
                            <p className="feature-main">Plan your trip <br /> reading Reviews </p>
                            <p className="feature-desc">Get valuable guidance from people and make smarter choices for your vacation destination.
                            </p>
                            <Link to="/search" style={{ textDecoration: 'none', display: 'flex' }}>
                                <p className="feature-btn">Learn more →</p>
                            </Link>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 infocard-col">
                        <div>
                            <img src={discover} />
                        </div>
                        <div>
                            <p className="feature-main">Discover new <br /> destination</p>
                            <p className="feature-desc">Discover about new cities their tourist attraction and much more and plan your trip accordingly.
                            </p>
                            <Link to="/discover" style={{ textDecoration: 'none', display: 'flex' }}>
                                <p className="feature-btn">Learn more →</p>
                            </Link>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 infocard-col">
                        <div>
                            <img src={travel} />
                        </div>
                        <div>
                            <p className="feature-main">We travel <br /> along with you</p>
                            <p className="feature-desc">Your partner may leave you but we promise to never leave you alone in this world and always be there to guide you.
                            </p>
                            <Link to="/discover" style={{ textDecoration: 'none', display: 'flex' }}>
                                <p className="feature-btn">Learn more →</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
