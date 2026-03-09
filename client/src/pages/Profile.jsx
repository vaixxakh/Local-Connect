import { useEffect, useRef } from "react";
import ProfileSideBar from "../components/profile/ProfileSideBar";
import ProfileOverview from "../components/profile/ProfileOverview";
import PersonalInfo from "../components/profile/PersonalInfo";
import BookingHistory from "../components/profile/BookingHistory";
import SavedServices from "../components/profile/SavedServices";
import Reviews from "../components/profile/Reviews";

import "./Profile.css";

const ProfilePage = () => {

  const sectionsRef = useRef([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    const sections = sectionsRef.current;
    const navLinks = document.querySelectorAll(".sidebar-menu li");

    const handleScroll = () => {

      let currentSection = "";

      sections.forEach((section) => {

        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {
          currentSection = section.getAttribute("id");
        }

      });

      navLinks.forEach((link) => {

        link.classList.remove("active");

        if (link.dataset.section === currentSection) {
          link.classList.add("active");
        }

      });

    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);

  return (

    <div className="profile-layout flex bg-gray-100 min-h-screen">

      <ProfileSideBar />

      <main className="profile-content flex-1 p-6 space-y-6">

        <section id="overview" ref={(el) => sectionsRef.current[0] = el}>
          <ProfileOverview />
        </section>

        <section id="info" ref={(el) => sectionsRef.current[1] = el}>
          <PersonalInfo />
        </section>

        <section id="bookings" ref={(el) => sectionsRef.current[2] = el}>
          <BookingHistory userId={user?._id} />
        </section>

        <section id="saved" ref={(el) => sectionsRef.current[3] = el}>
          <SavedServices />
        </section>

        <section id="reviews" ref={(el) => sectionsRef.current[4] = el}>
          <Reviews />
        </section>

      </main>

    </div>

  );

};

export default ProfilePage;