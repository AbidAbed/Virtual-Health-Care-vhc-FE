import React from 'react';
import doctor1 from "../doctor.jpg";
import doctor2 from "../doctor2.jpg";
import doctor3 from "../doctor3.jpg";

function Home() {
  return (
    <div className="home-container flex justify-center items-center h-screen bg-gray-100 pt-42">
      <div className="text-center">
        <h1 className="text-4xl text-gray-800 font-bold mb-4">Welcome to Virtual Healthcare</h1>
        <p className="text-lg text-gray-600 mb-8">Your Health, Our Priority</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="home-card bg-white p-6 rounded-lg shadow-md">
            <img src={doctor1} alt="Doctor" className="home-image w-16 h-16 mx-auto mb-4 rounded-full" />
            <h2 className="text-xl text-gray-800 font-bold mb-2">Find Available Doctors</h2>
            <p className="text-gray-600">
              Explore a diverse range of experienced doctors. Browse through their profiles to learn about their education,
              specialties, and patient reviews. Find the right healthcare professional that fits your needs.
            </p>
          </div>

          <div className="home-card bg-white p-6 rounded-lg shadow-md">
            <img src={doctor2} alt="Doctor" className="home-image w-16 h-16 mx-auto mb-4 rounded-full" />
            <h2 className="text-xl text-gray-800 font-bold mb-2">Book an Appointment</h2>
            <p className="text-gray-600">
              Easily schedule appointments with your chosen doctors. Select a date and time that suits your schedule.
              Receive reminders for upcoming appointments, ensuring you never miss an important consultation.
            </p>
          </div>

          <div className="home-card bg-white p-6 rounded-lg shadow-md">
            <img src={doctor3} alt="Doctor" className="home-image w-16 h-16 mx-auto mb-4 rounded-full" />
            <h2 className="text-xl text-gray-800 font-bold mb-2">Chat with Your Doctor</h2>
            <p className="text-gray-600">
              Connect with your doctor through secure and convenient chat features. Discuss your health concerns, share
              medical information, and receive prompt advice from the comfort of your home.
            </p>
          </div>
        </div>

        <button className="mt-8 bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-600 transition duration-300">Get Started</button>
      </div>
    </div>
  );
}

export default Home;
