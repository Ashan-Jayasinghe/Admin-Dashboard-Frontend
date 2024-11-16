import React from "react";
import "./Home.css"; // Import the CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Govinena Project</h1>
      <p>
        Govinena is an innovative platform dedicated to supporting home
        gardeners and enthusiasts by connecting them with trusted sellers,
        offering agricultural products, tools, and more.
      </p>

      <section className="section about">
        <h2>About the Project</h2>
        <p>
          Our platform is designed to help people grow their gardens by
          providing access to the right products. Whether you're a beginner or
          an experienced gardener, Govinena offers a range of products from
          seeds, fertilizers, gardening tools, and more.
        </p>
        <p>
          With a user-friendly interface, the platform lets users browse various
          advertisements, contact sellers, and manage their listings all in one
          place. Our vision is to make gardening accessible to everyone and
          provide a seamless experience for both buyers and sellers.
        </p>
      </section>

      <section className="section features">
        <h2>Key Features</h2>
        <ul>
          <li>
            Browse a variety of agricultural products in categories like seeds,
            fertilizers, and gardening tools.
          </li>
          <li>
            Manage your own advertisements for products or services related to
            gardening.
          </li>
          <li>
            Contact sellers directly through the platform for more details and
            inquiries.
          </li>
          <li>
            Get real-time updates on product availability and expiration dates.
          </li>
        </ul>
      </section>

      <section className="section getting-started">
        <h2>Getting Started</h2>
        <p>
          To get started with Govinena, simply create an account and log in to
          explore the platform. Once you're logged in, you can browse various
          advertisements, view details about products, and contact sellers
          directly.
        </p>
        <p>
          If you have gardening products or services to sell, you can create and
          manage your own advertisements, making it easy for others to find your
          offerings.
        </p>
      </section>

      <footer>
        <p>&copy; 2024 Govinena. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
