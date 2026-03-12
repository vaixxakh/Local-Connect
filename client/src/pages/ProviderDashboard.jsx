import "../styles/ProviderDashboard.css";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../service/api";

export default function ProviderDashboard(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const switchToFinder = async () => {
        try {
            const res = await API.patch("/users/switch-role");
            const updateUser = res.data.user;
            
            dispatch(loginSuccess(updateUser));

            localStorage.setItem("user", JSON.stringify(updateUser));

            navigate("/");
            toast.success(`Switched to ${res.data.user.role} role`);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to switch role");
        }
    }

return(

<div className="dashboard">


<div className="topNavbar">


<div className="logo">
LocalConnect
</div>
 <button className="role-btn " onClick={switchToFinder}>
Switch to Finder
</button>

<div className="profile">

<img
src="/profile.jpg"
alt="profile"
/>

</div>

</div>


<div className="dashboardContainer">


<div className="sidebar">

<ul>

<li className="active">Overview</li>

<li>Availability</li>

<li>Call History</li>

<li>Reviews</li>

</ul>

</div>




<div className="mainContent">



<div className="profileHeader">

<img
className="avatar"
src="/profile.jpg"
/>

<div>

<h2>K. Raghavan</h2>
<p>Electrician • Kasaragod</p>

</div>

</div>


<div className="stats">

<div className="statBox">
<h3>482</h3>
<p>Total Calls</p>
</div>

<div className="statBox">
<h3>356</h3>
<p>Total Clients</p>
</div>

<div className="statBox">
<h3>124</h3>
<p>Reviews</p>
</div>

<div className="statBox">
<h3>4.8</h3>
<p>Rating</p>
</div>

</div>



<div className="profileCard">

<h3>Profile Information</h3>

<input placeholder="Full Name"/>
<input placeholder="Category"/>
<input placeholder="Experience"/>

<textarea placeholder="About Me"></textarea>

<button className="saveBtn">
Save Changes
</button>

</div>


<div className="availabilityCard">

<h3>Manage Availability</h3>

<div className="timeRow">

<input type="time"/>
<input type="time"/>

</div>

</div>

</div>

</div>

</div>

)

}