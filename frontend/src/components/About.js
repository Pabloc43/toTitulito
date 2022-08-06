import React from "react";
import Presentacion from "../media/presentacion.mp4"

export const About = () => (
    <div className=" bord col-12 h-100 w-100">
                    <div className="box-1 mt-md-0 mt-5">
                        <video width="" height="" controls loop>
                            <source src={Presentacion} type="video/mp4" />
                        </video>
                    </div>
                </div>

);
