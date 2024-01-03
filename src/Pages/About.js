// About.js
import React from 'react';
import hospital from '../hospital.jpg';

function About() {
  return (
    <div className="bg-gray-100  flex items-center justify-center w-full pt-24">
      <div className="w-full  p-6 bg-white rounded-md shadow-lg">
        <h1 className="text-4xl text-gray-800 font-bold mb-8">About Virtual Healthcare</h1>

        <p className="text-lg text-gray-600 mb-4">
          Welcome to Virtual Healthcare, where cutting-edge technology meets compassionate care. Our platform is designed to redefine
          the way you experience healthcare, making it more accessible, convenient, and tailored to your needs.
        </p>

        <p className="text-lg text-gray-600 mb-4">
          <strong>Our Mission:</strong> At Virtual Healthcare, our mission is to break down the barriers to healthcare access.
          We strive to create a global healthcare community where patients can connect with skilled healthcare professionals
          seamlessly and receive personalized care regardless of geographical boundaries.
        </p>

        <p className="text-lg text-gray-600 mb-4">
          <strong>What Sets Us Apart:</strong> We understand that your health is unique, and so is your journey. That's why we offer
          a range of services, from finding the right doctor for your needs to booking appointments and engaging in secure,
          virtual consultations. Our platform empowers you to take control of your health on your terms.
        </p>

        <div className="mb-8">
          <img src={hospital} alt="Hospital" className="w-full h-64 object-cover rounded-md mb-4" />
        </div>

        <p className="text-lg text-gray-600 mb-4">
          <strong>Our Team:</strong> Behind Virtual Healthcare is a dedicated team of healthcare professionals, technologists, and
          designers committed to revolutionizing the healthcare experience. We combine expertise with innovation to deliver a
          platform that prioritizes your well-being.
        </p>

        <p className="text-lg text-gray-600 mb-4">
          <strong>Why Choose Virtual Healthcare:</strong> Choosing Virtual Healthcare means choosing a partner in your health journey.
          Experience the convenience of accessing healthcare from the comfort of your home, connect with a network of skilled
          professionals, and receive care that revolves around you.
        </p>

        <p className="text-lg text-gray-600 mb-4">
          Thank you for choosing Virtual Healthcare. We are honored to be part of your health and wellness story. Together, let's
          build a healthier future.
        </p>
      </div>
    </div>
  );
}

export default About;
