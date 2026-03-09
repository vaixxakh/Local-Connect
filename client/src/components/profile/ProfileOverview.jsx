import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import axios from "axios";

const ProfileOverview = () => {

const [user,setUser] = useState(null);
const [imagePreview,setImagePreview] = useState(null);

const userData = JSON.parse(localStorage.getItem("user"));

/* fetch user profile */

useEffect(()=>{

const fetchProfile = async ()=>{

try{

const res = await axios.get(`/api/users/${userData._id}`);

setUser(res.data);

}catch(err){
console.log(err);
}

};

fetchProfile();

},[]);

const uploadImage = async (e)=>{

const file = e.target.files[0];

setImagePreview(URL.createObjectURL(file));

const formData = new FormData();

formData.append("avatar",file);

try{

const res = await axios.put(
`/api/users/upload-avatar/${userData._id}`,
formData
);

setUser(res.data);

}catch(err){
console.log(err);
}

};

if(!user) return <p>Loading...</p>;

return (

<section id="overview" className="dashboard-card">

<div className="profile-overview flex items-center gap-6">

<div className="profile-image relative">

<label className="camera-btn">
<img
src={
imagePreview ||
user.profileImage ||
"https://cdn-icons-png.flaticon.com/512/149/149071.png"
}
alt="profile"
className="w-24 h-24 rounded-full object-cover"
/>


<input
type="file"
hidden
onChange={uploadImage}
/>

</label>

</div>

<div className="flex-1">

<h2 className="text-xl font-semibold">
{user.name}
</h2>

<p className="text-gray-600">
{user.phone}
</p>

<p className="text-gray-500 text-sm">
{user.email}
</p>

</div>

<button className="edit-btn">
Edit Profile
</button>

</div>

</section>

);

};

export default ProfileOverview;