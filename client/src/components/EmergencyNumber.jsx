const EmergencyNumber = ({ label, number }) => {
  return (
    <div className="flex justify-between items-center bg-gray-100 p-3 rounded-xl hover:bg-gray-200 transition">
      <span className="text-sm font-medium text-gray-700">
        {label}
      </span>
      <span className="font-bold text-gray-800">
        {number}
      </span>
    </div>
  );
};

export default EmergencyNumber;