import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-indigo-600 to-purple-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">About Us</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Your trusted destination for quality products, unbeatable prices, and a smooth shopping experience.
        </p>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto py-16 px-6 md:px-12">
        <h2 className="text-3xl font-bold text-indigo-600 mb-4">Our Story</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Founded in 2020, <span className="font-semibold">ShopSmart</span> started as a small online store built by a group
          of passionate creators and developers who believed online shopping could be better — faster, easier, and more personal.
          Over time, we’ve grown into a trusted ecommerce brand connecting thousands of customers with top-rated sellers across
          multiple categories. Even as we expand, our commitment to reliability and customer happiness stays at the heart of what we do.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Whether you’re upgrading your workspace, revamping your kitchen, or finding the perfect tech accessory, we’re here to
          make sure you get exceptional value with every purchase.
        </p>
      </section>

      {/* Values Section */}
      <section className="bg-white py-16 px-6 md:px-12 border-t border-gray-200">
        <h2 className="text-3xl font-bold text-indigo-600 mb-8 text-center">Our Core Values</h2>
        <div className="grid gap-10 md:grid-cols-3 text-center">
          <div className="p-6 shadow-md rounded-lg hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Customer First</h3>
            <p className="text-gray-600 leading-relaxed">
              We believe that every decision starts with you — our customer. Your satisfaction drives our design,
              product selection, and service excellence.
            </p>
          </div>

          <div className="p-6 shadow-md rounded-lg hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Quality & Transparency</h3>
            <p className="text-gray-600 leading-relaxed">
              We handpick products from trusted partners, ensuring every item meets strict quality standards.
              No hidden costs, no surprises — just honest pricing and dependable service.
            </p>
          </div>

          <div className="p-6 shadow-md rounded-lg hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Innovation & Growth</h3>
            <p className="text-gray-600 leading-relaxed">
              We continuously evolve — from adding smarter search tools to improving delivery speed — all to give
              you a better, more efficient shopping experience.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto py-16 px-6 md:px-12">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">Meet the Team</h2>
        <p className="text-gray-700 text-center max-w-3xl mx-auto mb-10">
          Behind every great product is a great team. Our group of designers, engineers, and customer service specialists
          work together to deliver seamless online shopping with a human touch.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex flex-col items-center bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition"
            >
              <img
                src={`https://via.placeholder.com/150?text=Team+${i}`}
                alt={`Team member ${i}`}
                className="rounded-full mb-4 w-32 h-32 object-cover"
              />
              <h4 className="font-semibold text-gray-800 mb-1">Team Member {i}</h4>
              <p className="text-gray-500 text-sm">Role / Department</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Note */}
      <section className="bg-indigo-600 text-white text-center py-10 px-6">
        <h3 className="text-2xl font-semibold mb-2">Join Our Journey</h3>
        <p className="max-w-2xl mx-auto text-lg leading-relaxed">
          We’re always looking for new ways to enhance your shopping experience. Whether you’re a customer, seller, or
          partner — together, we’re shaping the future of ecommerce.
        </p>
      </section>
    </div>
  );
};

export default About;
