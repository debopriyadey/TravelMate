import React from 'react'
import '../css/infocard.css'
import discover from '../svg/discover.svg'
import plan from '../svg/plan.svg'
import travel from '../svg/travel.svg'

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
                            <p className="feature-desc">Dolore in deserunt ad anim proident exercitation duis dolor aliquip esse sint in. Qui amet sit pariatur in.
                            </p>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 infocard-col">
                        <div>
                            <img src={discover} />
                        </div>
                        <div>
                            <p className="feature-main">Discover new <br /> destination</p>
                            <p className="feature-desc">Labore eiusmod deserunt fugiat quis adipisicing consequat nisi aliquip voluptate mollit labore. 
                            </p>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 infocard-col">
                        <div>
                            <img src={travel} />
                        </div>
                        <div>
                            <p className="feature-main">We travel <br /> along with you</p>
                            <p className="feature-desc">Aliquip cupidatat officia nulla qui laboris enim. Voluptate sit elit sint cupidatat minim voluptate ad.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
