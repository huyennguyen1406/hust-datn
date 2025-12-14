import React from "react";

const Deliver = () => {
  return (
    <div className="bg-card rounded-xl p-8 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold">Edit Delivery Information</h2>

      <form className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium" htmlFor="delivery-name">
              Name
            </label>
            <input
              id="delivery-name"
              name="delivery-name"
              type="text"
              placeholder="John Doe"
              className="bg-background focus:border-primary focus:ring-primary/20 mt-1 block w-full rounded-lg border transition-colors focus:ring"
            />
          </div>

          <div>
            <label className="text-sm font-medium" htmlFor="delivery-phone">
              Phone Number
            </label>
            <input
              id="delivery-phone"
              name="delivery-phone"
              type="tel"
              placeholder="+1 234 567 890"
              className="bg-background focus:border-primary focus:ring-primary/20 mt-1 block w-full rounded-lg border transition-colors focus:ring"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="delivery-email">
            Email
          </label>
          <input
            id="delivery-email"
            name="delivery-email"
            type="email"
            placeholder="you@example.com"
            className="bg-background focus:border-primary focus:ring-primary/20 mt-1 block w-full rounded-lg border transition-colors focus:ring"
          />
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="delivery-address">
            Address
          </label>
          <input
            id="delivery-address"
            name="delivery-address"
            type="text"
            placeholder="123 Main St"
            className="bg-background focus:border-primary focus:ring-primary/20 mt-1 block w-full rounded-lg border transition-colors focus:ring"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium" htmlFor="delivery-province">
              Province
            </label>
            <input
              id="delivery-province"
              name="delivery-province"
              type="text"
              placeholder="California"
              className="bg-background focus:border-primary focus:ring-primary/20 mt-1 block w-full rounded-lg border transition-colors focus:ring"
            />
          </div>

          <div>
            <label className="text-sm font-medium" htmlFor="delivery-district">
              District
            </label>
            <input
              id="delivery-district"
              name="delivery-district"
              type="text"
              placeholder="Los Angeles"
              className="bg-background focus:border-primary focus:ring-primary/20 mt-1 block w-full rounded-lg border transition-colors focus:ring"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 flex h-12 min-w-[84px] items-center justify-center rounded-lg px-5 text-base font-bold text-white transition-colors">
            Save Delivery Info
          </button>
        </div>
      </form>
    </div>
  );
};

export default Deliver;
