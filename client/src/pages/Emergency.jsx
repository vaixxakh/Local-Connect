import { FaPhoneAlt, FaSearch } from "react-icons/fa";
import EmergencyCard from "../components/EmergencyCard";
import EmergencyNumber from "../components/EmergencyNumber";
import "./Emergency.css";

const Emergency = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Emergency Contacts – Quick Help in Kanhangad
        </h1>
        <p className="text-gray-500 mt-2">
          Immediate assistance for residents and visitors.
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <div className="flex items-center bg-white rounded-xl px-4 py-2 shadow w-full max-w-xl">
          <FaSearch className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Search for hospitals, police stations..."
            className="outline-none w-full text-sm"
          />
        </div>

        <div className="flex gap-3">
          <button className="bg-green-500 text-white px-4 py-2 rounded-full text-sm">
            All Services
          </button>
          <button className="bg-white px-4 py-2 rounded-full text-sm shadow">
            Police
          </button>
          <button className="bg-white px-4 py-2 rounded-full text-sm shadow">
            Ambulance
          </button>
          <button className="bg-white px-4 py-2 rounded-full text-sm shadow">
            Fire
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">

        <div className="col-span-2 space-y-8">

          <section>
            <h2 className="text-xl font-semibold mb-4">Police Stations</h2>

            <div className="grid grid-cols-2 gap-6">
              <EmergencyCard
                title="Kanhangad Town Police"
                location="Main Road, Kanhangad"
              />
              <EmergencyCard
                title="Hosdurg Police Station"
                location="Hosdurg, Kanhangad"
              />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              Ambulance Services
            </h2>

            <EmergencyCard
              title="Lifeline 24/7 Ambulance"
              location="South Kanhangad"
            />
          </section>

          {/* FIRE */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Fire & Rescue</h2>

            <EmergencyCard
              title="Kanhangad Fire Station"
              location="Near Railway Station"
            />
          </section>

        </div>

       
        <div>
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
            
            <h3 className="text-red-600 font-semibold mb-4">
              ⚠ Critical Help
            </h3>

            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-semibold shadow-md mb-6">
            <FaPhoneAlt className="ml-4 " />  GLOBAL EMERGENCY CALL

            </button>

            <div className="space-y-4">
              <EmergencyNumber label="Police" number="100" />
              <EmergencyNumber label="Ambulance" number="108" />
              <EmergencyNumber label="Fire" number="101" />
              <EmergencyNumber label="Women Helpline" number="1091" />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Emergency;