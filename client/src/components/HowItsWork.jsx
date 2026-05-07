import { Users, CheckCircle, Star } from "lucide-react";

const steps = [
  {
    icon: Users,
    title: "Browse Providers",
    desc: "Search and filter local service providers by category and availability",
  },
  {
    icon: CheckCircle,
    title: "Book Service",
    desc: "Choose your provider, select a time, and confirm your booking",
  },
  {
    icon: Star,
    title: "Get It Done",
    desc: "Track your provider in real-time and communicate directly",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] text-center mb-16 tracking-tight font-[Outfit]">
          How It Works
        </h2>

       
        <div className="grid md:grid-cols-3 gap-8">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className="bg-white p-8 rounded-xl border border-black/5 shadow-sm hover:shadow-md transition"
              >

            
                <div className="w-12 h-12 bg-[#2ecc71] rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-[#064E3B]" />
                </div>

               
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3 font-[Outfit]">
                  {step.title}
                </h3>

                <p className="text-[#4B5563] leading-relaxed font-[Figtree]">
                  {step.desc}
                </p>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;