import { FaExclamationCircle, FaTint, FaBolt, FaHospital, FaFire, FaKey, FaBell } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const emergencyServices = [

{
title:"Plumbing Emergency",
number:"911",
icon:<FaTint />,
bg:"bg-blue-500"
},

{
title:"Electrical Emergency",
number:"912",
icon:<FaBolt />,
bg:"bg-yellow-500"
},

{
title:"Medical Assistance",
number:"108",
icon:<FaHospital />,
bg:"bg-red-500"
},

{
title:"Fire Service",
number:"101",
icon:<FaFire />,
bg:"bg-orange-500"
},

{
title:"Lock & Key Emergency",
number:"913",
icon:<FaKey />,
bg:"bg-gray-500"
},

{
title:"General Emergency",
number:"100",
icon:<FaBell />,
bg:"bg-purple-500"
}

];

const Emergency = () => {
  const navigate = useNavigate();

  return (

<div className="min-h-screen bg-[#f5f5f5] px-5 sm:px-8 lg:px-12 py-12">

<div className="max-w-7xl mx-auto">


<div className="flex flex-col items-center text-center mb-14">

<div className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center text-white text-4xl shadow-lg mb-4">

<FaExclamationCircle />

</div>

<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">

Emergency Services

</h1>

<p className="mt-5 text-[#4B5576] text-base sm:text-lg leading-relaxed max-w-2xl">

Get immediate help for urgent situations.
Our emergency service providers are available 24/7.

</p>

</div>



<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">

{emergencyServices.map((service,index)=>(

<div
key={index}
className="bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between min-h-[210px]"
>

<div className="flex items-start gap-3">

<div className={`w-16 h-16 ${service.bg} rounded-2xl flex items-center justify-center text-white text-xl flex-shrink-0`}>

{service.icon}

</div>


<div>

<h2 className="text-lg font-bold text-gray-900">

{service.title}

</h2>

<p className="mt-2   text-gray-500 flex items-center gap-2">

<FiPhone className="text-gray-500 text-lg" />

{service.number}

</p>

</div>

</div>
<a
  href={`tel:${service.number}`}
  className="mb-8 py-2.5 px-8 bg-red-500 hover:bg-red-650 rounded-xl text-white font-bold transition-all text-center flex items-center justify-center gap-2 shadow-sm"
>
  <FiPhone className="text-white text-base" /> Call Now
</a>

</div>

))}

</div>




<div className="mt-20 max-w-5xl mx-auto bg-white rounded-[30px] shadow-md p-5 sm:p-10 lg:p-14 ">

<h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">

Need Regular Service?

</h1>

<p className="max-w-2xl  text-gray-500 text-base sm:text-lg leading-relaxed">

For non-emergency services, browse our regular service providers and connect with trusted local professionals.

</p>

<button
  onClick={() => navigate("/Services")}
  className="mt-8 px-8 py-4 bg-[#16A34A] hover:bg-[#148F3F] rounded-xl text-white font-bold transition-all shadow-sm shadow-green-150 hover:shadow-md"
>
  Browse Services
</button>

</div>


</div>

</div>

);

};

export default Emergency;