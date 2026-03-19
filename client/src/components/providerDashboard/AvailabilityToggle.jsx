import { useState } from "react";
import { updateProviderStatus } from "../../service/providerService";

const AvailabilityToggle = ({ currentStatus = "online", onStatusChange }) => {
  const [status, setStatus] = useState(currentStatus);

  const handleStatusChange = async (newStatus) => {
    try {
      await updateProviderStatus(newStatus);
      setStatus(newStatus);
      if (onStatusChange) onStatusChange(newStatus);
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

  return (
    <div className="flex gap-2">
      {["online", "busy", "offline"].map((item) => (
        <button
          key={item}
          onClick={() => handleStatusChange(item)}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            status === item
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default AvailabilityToggle;