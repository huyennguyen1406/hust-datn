import React from "react";

const DeliverInfomation = () => {
  return (
    <div className="space-y-4 p-4 sm:p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Name"
          className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 focus:ring-2 focus:ring-blue-500/40 focus:outline-none"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 focus:ring-2 focus:ring-blue-500/40 focus:outline-none"
        />
      </div>

      <input
        type="email"
        placeholder="Email"
        className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 focus:ring-2 focus:ring-blue-500/40 focus:outline-none"
      />

      <input
        type="text"
        placeholder="Address"
        className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 focus:ring-2 focus:ring-blue-500/40 focus:outline-none"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <select className="h-11 rounded-lg border border-gray-200 bg-gray-50 px-4">
          <option>Province/City</option>
        </select>
        <select className="h-11 rounded-lg border border-gray-200 bg-gray-50 px-4">
          <option>District</option>
        </select>
        <select className="h-11 rounded-lg border border-gray-200 bg-gray-50 px-4">
          <option>Ward/Commune</option>
        </select>
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-600">
        <input type="checkbox" className="h-4 w-4 rounded text-blue-600" />
        Store delivery information for next purchase
      </label>
    </div>
  );
};

export default DeliverInfomation;
