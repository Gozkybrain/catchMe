import React, { useState } from "react";
import Loader from "./loader";

function Preloader(props) {
    const [showPreloader, setShowPreloader] = useState(true);

    setTimeout(() => {
        setShowPreloader(false);
    }, 2000);

    return (
        <div>
            {showPreloader ? (
                <div><Loader /></div>
            ) : (
                <div>
                    {/* THE PRELOADER LOADS FOR 2 SECONDS */}
                    {props.myForm ? <div>
                    {/* MAIN CONTENT DISPLAYS NEXT */}
                    </div> : null}
                </div>
            )}
        </div>
    );
}

export default Preloader;
