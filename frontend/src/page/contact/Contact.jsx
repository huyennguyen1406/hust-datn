import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationPinIcon from "@mui/icons-material/LocationPin";

const mockData = {
  phone: "024 3772 3801",
  email: "support@novashop.com",
  address: "Lô E6, Khu Đô Thị Mới Cầu Giấy, Yên Hòa, Hà Nội",
  mapLocation:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.354477820456!2d105.78325431540197!3d21.01691599398747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab5f25c2e1a1%3A0x4c5cbdc2b7f7e7d9!2sKeangnam%20Landmark%2072!5e0!3m2!1sen!2svn!4v1704090000002",
};

const Contact = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">Contact Us</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          We'd love to hear from you. Fill out the form below or use our contact details to get in touch.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-16">
        <div className="rounded-xl border border-gray-200 bg-white p-8">
          <h2 className="mb-6 text-2xl font-bold">Send us a message</h2>

          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your Name"
                className="focus:border-primary focus:ring-primary bg-background mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="focus:border-primary focus:ring-primary bg-background mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>

            <div>
              <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                placeholder="How can we help?"
                className="focus:border-primary focus:ring-primary bg-background mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>

            <div>
              <label htmlFor="message" className="text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Your message..."
                className="focus:border-primary focus:ring-primary bg-background mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>

            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 flex w-full justify-center rounded-lg px-4 py-3 text-base font-medium text-white transition-colors">
              Send Message
            </button>
          </form>
        </div>

        <div className="flex flex-col space-y-8">
          <div className="rounded-xl border border-gray-200 bg-white p-8">
            <h2 className="mb-6 text-2xl font-bold">Contact Information</h2>

            <div className="space-y-4 text-gray-600">
              <div className="flex items-start">
                <LocalPhoneIcon className="text-primary mt-1" />
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p>{mockData.phone}</p>
                </div>
              </div>

              <div className="flex items-start">
                <EmailIcon className="text-primary mt-1" />
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p>{mockData.email}</p>
                </div>
              </div>

              <div className="flex items-start">
                <LocationPinIcon className="text-primary mt-1" />
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p>{mockData.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-64 w-full overflow-hidden rounded-xl border border-gray-200">
            <iframe
              title="Google Map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={mockData.mapLocation}
              className="h-full w-full border-0"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
