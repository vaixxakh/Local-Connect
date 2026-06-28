import { FaStar, FaCheckCircle, FaUser, FaMapMarkerAlt, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Clock } from "lucide-react";
import "./ProviderCard.css";

const ProviderCard = ({ provider, onBookNow, user, onViewProfile }) => {
  const status = provider?.status || "offline";
  const isOnline = status === "online";
  const isBusy = status === "busy";
  const isOffline = status === "offline";

  return (
    <div className="provider-card font-[Figtree] flex flex-col justify-between bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 p-6">

      <div className="space-y-4">
        {/* Header section (Profile image, Name, Verification, Badge) */}
        <div className="flex gap-4 items-start justify-between">
          <div className="flex gap-4 items-center">
            {/* Image Wrapper with Online Ring */}
            <div className="relative">
              <div className={`w-16 h-16 rounded-full overflow-hidden border-2 p-0.5 shrink-0 transition-colors duration-300 ${
                isOnline ? "border-emerald-500" : isBusy ? "border-amber-500" : "border-slate-200"
              }`}>
                {provider?.profileImage ? (
                  <img
                    src={provider.profileImage}
                    alt={provider?.name || "Provider"}
                    className="w-full h-full object-cover rounded-full bg-slate-50"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 rounded-full">
                    <FaUser className="text-xl" />
                  </div>
                )}
              </div>
              
              {/* Pulsing online status indicator dot */}
              {isOnline && (
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full animate-pulse shadow-sm"></span>
              )}
            </div>

            {/* Title / Name details */}
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-bold text-slate-800 text-base truncate max-w-[150px] font-[Outfit]">
                  {provider?.name || "Unknown Provider"}
                </h3>
                {provider?.isVerified && (
                  <FaCheckCircle className="text-blue-500 shrink-0 text-xs" title="Verified Expert" />
                )}
              </div>
              <p className="text-xs text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                <FaBriefcase className="text-slate-350 text-[10px]" />
                {provider?.service || "General Pro"}
              </p>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="text-right shrink-0">
            <span className="block text-lg font-extrabold text-emerald-600 font-[Outfit]">
              ₹{provider?.basePrice || 0}
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              {provider?.pricingType === "hourly" ? "/ hour" : "/ fix"}
            </span>
          </div>
        </div>

        {/* Experience and Bio */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
              {provider?.experience || 0} Yrs Exp
            </span>
            <div className="flex items-center gap-1 text-slate-700">
              <FaStar className="text-yellow-400" />
              <span className="font-bold">{provider?.rating || 0}</span>
              <span className="text-slate-400">({provider?.totalReviews || 0} reviews)</span>
            </div>
          </div>

          {provider?.bio && (
            <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">
              {provider.bio}
            </p>
          )}
        </div>

        {/* Skills pill tags */}
        {provider?.skills?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {provider.skills.slice(0, 3).map((skill, index) => (
              <span key={index} className="bg-slate-50 border border-slate-100 rounded-lg px-2 py-1 text-[10px] text-slate-600 font-medium whitespace-nowrap">
                {skill}
              </span>
            ))}
            {provider.skills.length > 3 && (
              <span className="bg-slate-100 rounded-lg px-2 py-1 text-[10px] text-slate-500 font-bold whitespace-nowrap">
                +{provider.skills.length - 3} more
              </span>
            )}
          </div>
        )}

        <hr className="border-slate-100" />

        {/* Location & Status Badges */}
        <div className="flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 min-w-0">
            <FaMapMarkerAlt className="text-slate-350 shrink-0 text-sm" />
            <span className="truncate">
              {[provider?.city, provider?.district].filter(Boolean).join(", ") || "Kasargod"}
            </span>
          </div>

          {/* Availability Status Badge */}
          <div className="shrink-0">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
              isOnline
                ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                : isBusy
                ? "bg-amber-50 text-amber-700 border-amber-100"
                : "bg-slate-50 text-slate-500 border-slate-100"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                isOnline ? "bg-emerald-500" : isBusy ? "bg-amber-500" : "bg-slate-400"
              }`} />
              {isOnline ? "Available" : isBusy ? "Busy" : "Offline"}
            </span>
          </div>
        </div>
      </div>

      {/* Booking Validation Actions Footer */}
      <div className="space-y-2 pt-4">
        
        {/* Helper status text when provider is busy/offline */}
        {!isOnline && user?.role === "finder" && (
          <p className="text-center text-xs font-semibold text-rose-500 bg-rose-50 border border-rose-100 rounded-xl py-1 px-3">
            {isBusy ? "Provider is currently busy." : "Provider is offline."}
          </p>
        )}

        <div className="flex gap-3">
          {user?.role === "finder" && (
            <button
              onClick={() => isOnline && onBookNow(provider)}
              disabled={!isOnline}
              className={`flex-grow py-3 rounded-xl text-xs font-bold transition shadow-sm ${
                isOnline
                  ? "bg-[#16A34A] hover:bg-[#148F3F] text-white hover:shadow-emerald-100 hover:shadow-md"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              Book Now
            </button>
          )}

          <button
            onClick={() => onViewProfile && onViewProfile(provider)}
            className="flex-grow py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;