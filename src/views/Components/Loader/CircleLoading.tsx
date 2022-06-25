import { FC } from "react";
 
const CircleLoading: FC= () => {
    return ( 
        <div className="loader_com">
            <div className="load-wrapp">
                <div className="load-5">
                    <div className="ring-2">
                    <div className="ball-holder">
                        <div className="ball"></div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default CircleLoading;