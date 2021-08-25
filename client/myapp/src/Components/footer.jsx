import { Button, Card, CardGroup, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiFillCopyrightCircle, AiFillMessage } from 'react-icons/ai';
import { ImLocation2, ImPhone } from 'react-icons/im';
import logo from './logo.png';
import { useState } from "react";


function FooterComp() {

    return (
        <div style={{ marginTop: "10%" }} >
            <Card>


                <section >
                    <div className="container text-right mt-5">

                        <div className="row mt-3">

                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

                                <h6 className="mb-4">
                                    <Card.Subtitle className="mb-2 text-muted">
                                        <img
                                            src={logo}
                                            width="30"
                                            height="30"
                                            className="d-inline-block align-center"
                                            alt="Logo"
                                        />{' '}
                                        משלוחים דואר-מיתר
                                    </Card.Subtitle>
                                </h6>
                                <p className="mb-2 text-muted">
                                    <small>
                                        שירות המשלוחים הוקם בתחילת שנת 2020 ומנוהל על ידי שני סטודנטים בני היישוב.
                                        שירות זה הוקם כדי לתת מענה לתושבי מיתר וכרמית אשר מעוניינים במשלוחי דואר עד לביתם
                                    </small>
                                </p>
                            </div>
                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-muted mb-4">
                                    תפריט
                                </h6>
                                <small>
                                    <p >
                                        <Link to="/neworder" className="text-muted">   הזמנת משלוח </Link>
                                    </p>
                                    <p>
                                        <Link to='/myorders' className="text-muted">   מעקב משלוחים </Link>
                                    </p>
                                    <p>
                                        <a
                                            href="https://israelpost.co.il/"
                                            className="text-muted">דואר-ישראל
                                        </a>

                                    </p>
                                </small>
                            </div>
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 className="text-muted mb-4 ">
                                    צור קשר
                                </h6>
                                <small>
                                    <p><ImLocation2 />
                                        <a
                                            href="https://goo.gl/maps/88reu677747KPpxLA"
                                            className="text-muted">דרך מיתר, סניף דואר מיתר
                                        </a>
                                    </p>
                                    <p>
                                        <AiFillMessage />
                                        <a
                                            href="https://wa.me/+972543008422"
                                            className="text-muted">לחץ ליצירת קשר
                                        </a>
                                    </p>
                                    <p>
                                        <ImPhone /> <Link to='' className="text-muted" >08-651-7843 </Link>
                                    </p>
                                </small>
                                
                            </div>
                        </div>
                    </div>
                    <Card.Footer dir='ltr' className="text-center text-muted">
                        <small>  Copyright  <AiFillCopyrightCircle /> 2020 Nevo Brami</small>
                    </Card.Footer>
                </section>
            </Card>
        </div>
    )
}
export default FooterComp;
