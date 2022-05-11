import { React, useEffect, useState } from "react";
import List from "./list";


const Dashboard = ({user, link}) => {
    // const [state, setState] = useState(0);
    
    return (
        <div>
            <div className="container space-bet nav">
                <div className="container">
                    {/* <img src={link} alt="img" width="50rem" height="50rem"></img> */}
                    <h1>TaskBoard</h1>
                </div> 
                <div className="profile">
                    <img src={link} alt="img" width="50rem" height="50rem" className="profile"></img>
                </div>
            </div>
            <div className="page">
                <List name="My Tasks" user={user}/>
            </div>

            {/* <div className="add-btn add-task" onClick={ () => setState(1) }>+</div> */}
        </div>
    )
}

export default Dashboard;