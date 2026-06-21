import { Link } from 'react-router-dom';

const Home = () => {
  // Service data with different images for each card
  const servicesData = [
    {
      id: 1,
      image: "/image/c4.jpg",
      title: "Custom Recipes",
      description: "Experience our bespoke menu, crafted with care and passion for a distinctive culinary journey."
    },
    {
      id: 2,
      image: "/image/c3.jpg",
      title: "Catering Services",
      description: "Perfect for events and gatherings with our delicious catering options."
    },
    {
      id: 3,
      image: "/image/c6.jpg",
      title: "Takeaway & Delivery",
      description: "Enjoy our mouthwatering chicken from the comfort of your home."
    }
  ];

  return (
    <>
      <header className="header" id="header">
        <div className="banner">
          <h2>Discover The Secret To Taste</h2>
          <h1>Chiken Fry</h1>
          <Link className="btn banner-btn" to="/menu">View More</Link>
        </div>
      </header>

      <div className="content-divider"></div>

      <section className="features clearfix" id="feature">
        <div className="feature">
          <span className="feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
              <path d="M640-440 474-602q-31-30-52.5-66.5T400-748q0-55 38.5-93.5T532-880q32 0 60 13.5t48 36.5q20-23 48-36.5t60-13.5q55 0 93.5 38.5T880-748q0 43-21 79.5T807-602L640-440Zm0-112 109-107q19-19 35-40.5t16-48.5q0-22-15-37t-37-15q-14 0-26.5 5.5T700-778l-60 72-60-72q-9-11-21.5-16.5T532-800q-22 0-37 15t-15 37q0 27 16 48.5t35 40.5l109 107ZM280-220l278 76 238-74q-5-9-14.5-15.5T760-240H558q-27 0-43-2t-33-8l-93-31 22-78 81 27q17 5 40 8t68 4q0-11-6.5-21T578-354l-234-86h-64v220ZM40-80v-440h304q7 0 14 1.5t13 3.5l235 87q33 12 53.5 42t20.5 66h80q50 0 85 33t35 87v40L560-60l-280-78v58H40Zm80-80h80v-280h-80v280Zm520-546Z" />
            </svg>
          </span>
          <h4 className="feature-title">Made with Love</h4>
          <p className="feature-text">Discover heartfelt hospitality in our cozy, lovingly accomodations.</p>
        </div>
        <div className="feature">
          <span className="feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M280-80v-366q-51-14-85.5-56T160-600v-280h80v280h40v-280h80v280h40v-280h80v280q0 56-34.5 98T360-446v366h-80Zm400 0v-320H560v-280q0-83 58.5-141.5T760-880v800h-80Z" /></svg>
          </span>
          <h4 className="feature-title">Taste</h4>
          <p className="feature-text">Savour love in every bite of our exquisite, crafted cuisine.</p>
        </div>
        <div className="feature">
          <span className="feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M160-120v-80h640v80H160Zm160-160q-66 0-113-47t-47-113v-400h640q33 0 56.5 23.5T880-760v120q0 33-23.5 56.5T800-560h-80v120q0 66-47 113t-113 47H320Zm0-80h240q33 0 56.5-23.5T640-440v-320H240v320q0 33 23.5 56.5T320-360Zm400-280h80v-120h-80v120ZM320-360h-80 400-320Z" /></svg>
          </span>
          <h4 className="feature-title">Energy</h4>
          <p className="feature-text">Feel the vibrant energy and warmth in our welcoming, lively atmosphere.</p>
        </div>
        <div className="feature">
          <span className="feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M400-160h160v-44l50-20q65-26 110.5-72.5T786-400H174q20 57 65 103.5T350-224l50 20v44Zm-80 80v-70q-107-42-173.5-130T80-480h80v-320l720-80v60l-460 52v68h460v60H420v160h460q0 112-66.5 200T640-150v70H320Zm0-620h40v-62l-40 5v57Zm-100 0h40v-50l-40 4v46Zm100 220h40v-160h-40v160Zm-100 0h40v-160h-40v160Zm260 80Z" /></svg>
          </span>
          <h4 className="feature-title">Family Recipe</h4>
          <p className="feature-text">Enjoy our family recipes, lovingly crafted for a taste of tradition.</p>
        </div>
      </section>

      <section className="about" id="about">
        <div className="section-center clearfix">
          <div className="about-img">
            <div className="about-picture-container">
              <img src="/image/about.jpg" alt="About Chicken Fry" className="about-picture" />
            </div>
          </div>
          <div className="about-info">
            <div className="section-title">
              <h3>About Us</h3>
              <h2>Chiken Fry</h2>
            </div>
            <p className="about-text">
              Welcome to Cluck'n Good Chicken, your ultimate destination for mouthwatering chicken dishes
              that satisfy every craving. We believe great food brings people together, and that's why
              we're dedicated to delivering the perfect blend of flavor, quality, and care in every bite.
            </p>
            <p className="about-text">
              <strong>Farm-Fresh Ingredients:</strong> We source only the best, ensuring every dish is made
              with the freshest chicken and premium spices.
            </p>
            <p className="about-text">
              <strong>Signature Recipes:</strong> Our secret blends and cooking methods create flavors you
              won't find anywhere else.
            </p>
            <p className="about-text">
              <strong>Wide Variety:</strong> From crispy fried chicken to smoky grilled options and hearty
              sandwiches, there's something for everyone.
            </p>
            <Link to="/menu" className="btn">Learn more</Link>
          </div>
        </div>
      </section>

      <section className="products" id="products">
        <div className="section-center clearfix">
          <div className="product-info">
            <div className="section-title">
              <h3>Check Out</h3>
              <h2>Our Recipe</h2>
            </div>
            <p className="product-text">
              Indulge in our culinary delights where every dish is meticulously prepared with passion and
              expertise, showcasing the finest ingredients and flavors. From comforting classics to
              innovative creations, our recipes embody a commitment to excellence.
            </p>
            <Link to="/menu" className="btn">View Full Menu</Link>
          </div>
          <div className="product-inventory clearfix">
            <div className="product">
              <img src="/image/banner.jpg" alt="Grill Chicken" className="product-img" />
              <h4 className="product-title">Grill Chicken</h4>
              <h4 className="product-price">₹200</h4>
            </div>
            <div className="product">
              <img src="/image/c2.jpg" alt="Fried Chicken" className="product-img" />
              <h4 className="product-title">Chicken Burger</h4>
              <h4 className="product-price">₹150</h4>
            </div>
            <div className="product">
              <img src="/image/c5.jpg" alt="Chicken Burger" className="product-img" />
              <h4 className="product-title">Fired Chicken</h4>
              <h4 className="product-price">₹180</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <div className="section-title services-title">
          <h3>Explore</h3>
          <h2>Our Services</h2>
        </div>
        <div className="section-center clearfix">
          {servicesData.map((service) => (
            <div className="service-card" key={service.id}>
              <div className="service-img-container">
                <img src={service.image} alt={service.title} className="service-image" />
                <span className="service-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                    <path d="M640-80q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170T640-80Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm-480 0q-33 0-56.5-23.5T80-240v-304q0-8 1.5-16t4.5-16l80-184h-6q-17 0-28.5-11.5T120-800v-40q0-17 11.5-28.5T160-880h280q17 0 28.5 11.5T480-840v40q0 17-11.5 28.5T440-760h-6l66 152q-19 10-36 21t-32 25l-84-198h-96l-92 216v304h170q5 21 13.5 41.5T364-160H160Zm480-440q-42 0-71-29t-29-71q0-42 29-71t71-29v200q0-42 29-71t71-29q42 0 71 29t29 71H640Z" />
                  </svg>
                </span>
              </div>
              <div className="service-info">
                <h4>{service.title}</h4>
                <p>{service.description}</p>
                <Link to="/menu" className="btn service-btn">Read More</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="contact" id="conduct">
        <div className="section-center clearfix">
          <div className="contact-info">
            <div className="contact-item">
              <h4 className="contact-title">
                <span className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" /></svg>
                </span>
                Address
              </h4>
              <div className="contact-text">123 Erode road,<br />Perundurai<br />Pincode-638052</div>
            </div>
            <div className="contact-item">
              <h4 className="contact-title">
                <span className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" /></svg>
                </span>
                Email
              </h4>
              <div className="contact-text">Chickenfry75@gmail.com</div>
            </div>
            <div className="contact-item">
              <h4 className="contact-title">
                <span className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" /></svg>
                </span>
                Telephone
              </h4>
              <div className="contact-text">+91 8887773322</div>
            </div>
          </div>
          <div className="contact-form">
            <h3>Contact Us</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <input type="text" id="name" name="name" className="form-control" required />
                <label htmlFor="name" className="form-label">Name</label>
              </div>
              <div className="form-group">
                <input type="email" id="email" name="email" className="form-control" required />
                <label htmlFor="email" className="form-label">Email</label>
              </div>
              <div className="form-group">
                <textarea id="message" name="message" className="form-control" required></textarea>
                <label htmlFor="message" className="form-label">Message</label>
              </div>
              <button className="btn submit-btn" type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;