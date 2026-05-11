function BrowseAllService() {
  return (
    <section className="w-full bg-[#29B664] py-20 px-6 sm:px-8 lg:px-12">

      <div className="max-w-4xl mx-auto text-center">

        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#064E3B] tracking-tight leading-tight"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          Ready to Get Started?
        </h2>

        <p
          className="mt-5 text-base sm:text-lg text-[#0C4E3B] leading-relaxed max-w-2xl mx-auto"
          style={{ fontFamily: "Figtree, sans-serif" }}
        >
          Join thousands of satisfied customers finding quality local services
        </p>

    
        <div className="mt-8">

          <button
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl
            bg-[#064E3B] text-[#24CC71] text-base sm:text-lg font-medium
            hover:bg-[#053b2d] transition duration-300 shadow-sm"
            style={{ fontFamily: "Figtree, sans-serif" }}
          >
            Browse All Services
          </button>

        </div>

      </div>

    </section>
  );
}

export default BrowseAllService;