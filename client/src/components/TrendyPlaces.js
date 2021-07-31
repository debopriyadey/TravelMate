import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '100px',
    },
    cityImg: {
        height: '80px',
        width: '80px',
        borderRadius: '5px'
    },

    box: {
        alignSelf: 'center',
    }
}))

export default function TrendyPlaces() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Container>
                <h3>Trending Places To Visit </h3>
                <br />
                {/* <hr className="mb-2 mt-0 d-inline-block mx-auto" style={{ width: "400px", backgroundColor: 'grey' }} /> */}
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-4 mb-4 d-flex">
                        <Link to="/search?q=Kolkata" className="d-flex">
                            <div className="mr-3 align-self-center">
                                <img src="https://images.unsplash.com/photo-1571679654681-ba01b9e1e117?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8a29sa2F0YXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" className={classes.cityImg} />
                            </div>
                            <div className="align-self-center">
                                <h6> Kolkata,</h6>
                                <h6> West Bengal</h6>
                            </div>
                        </Link>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4 mb-4 d-flex">
                        <Link to="/search?q=Shimla" className="d-flex">
                            <div className="mr-3 align-self-center">
                                <img src="https://images.unsplash.com/photo-1600065755981-a7f7f560ab04?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hpbWxhfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" className={classes.cityImg} />
                            </div>
                            <div className="align-self-center">
                                <h6>Shimla</h6>
                                <h6>Himacha Pradesh</h6>
                            </div>
                        </Link>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4 mb-4 d-flex">
                        <Link to="/search?q=Cochin" className="d-flex">
                            <div className="mr-3 align-self-center">
                                <img src="https://www.ekeralatourism.net/wp-content/uploads/2018/03/Cochin.jpg" alt="" className={classes.cityImg} />
                            </div>
                            <div className="align-self-center">
                                <h6>Cochin</h6>
                                <h6>Kerela</h6>
                            </div>
                        </Link>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4 mb-4 d-flex">
                        <Link to="/search?q=Varanasi" className="d-flex">
                            <div className="mr-3 align-self-center">
                                <img src="https://images.unsplash.com/photo-1571536802807-30451e3955d8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dmFyYW5hc2l8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" className={classes.cityImg} />
                            </div>
                            <div className="align-self-center">
                                <h6>Varanasi</h6>
                                <h6>Uttar Pradesh</h6>
                            </div>
                        </Link>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4 mb-4 d-flex">
                        <Link to="/search?q=Rajwada" className="d-flex">
                            <div className="mr-3 align-self-center">
                                <img src="https://images.thrillophilia.com/image/upload/s--1bq6FaJM--/c_fill,g_center,h_450,q_auto,w_753/dpr_1.0,f_auto,fl_strip_profile/v1/images/photos/000/132/335/original/1536670464_shutterstock_567029827_%281%29.jpg.jpg" alt="" className={classes.cityImg} />
                            </div>
                            <div className="align-self-center">
                                <h6>Rajwada</h6>
                                <h6>Madhya Pradesh</h6>
                            </div>
                        </Link>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4 mb-4 d-flex">
                        <Link to="/search?q=Vaishno Devi" className="d-flex">
                            <div className="mr-3 align-self-center">
                                <img src="https://cdn-cdmoj.nitrocdn.com/aMXvDVbOTxUQVHZUrOLYcprbySihZhas/assets/static/optimized/blog/wp-content/uploads/2020/12/23151b65990e8382d2c116adb3718124.Vaishno-Devi.jpg" alt="" className={classes.cityImg} />
                            </div>
                            <div className="align-self-center">
                                <h6>Vaishno Devi</h6>
                                <h6>Jammu and Kashmir</h6>
                            </div>
                        </Link>
                    </div>
                </div>
            </Container>
        </div >
    )
}
