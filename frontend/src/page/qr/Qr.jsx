import React from "react";
import { useEffect, useState } from "react";
import TimerIcon from "@mui/icons-material/Timer";

const mockData = {
  orderNumber: "SS123456789",
  accountNumber: "1234 5678 9012",
  bankName: "Techcombank",
  branchName: "Hoang Quoc Viet",
};

const Qr = ({ initialSeconds = 300, onExpire }) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onExpire?.();
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft, onExpire]);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="border-border-light bg-card-light mx-auto max-w-lg rounded-xl border shadow-lg">
        <div className="p-6 text-center sm:p-8">
          <h1 className="mb-2 text-2xl leading-tight font-bold tracking-tight sm:text-3xl">QR Code Payment</h1>

          <p className="text-text-light/80 mb-6">
            Please scan the QR code to complete the payment for your order{" "}
            <span className="text-primary font-bold">#{mockData.orderNumber}</span>
          </p>

          {/* QR Code */}
          <div className="mb-6 flex justify-center">
            <div className="border-border-light inline-block rounded-lg border bg-white p-4">
              <svg
                className="h-48 w-48 sm:h-64 sm:w-64"
                fill="none"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M50 50h33v33H50V50zm0 100h33v33H50v-33zm100-100h33v33h-33V50zm-17 83h17v17h-17v-17zM0 0v200h200V0H0zm183 183H17V17h166v166zM67 67h16V33H33v50h17V67H67zm66 66h34v17h16v33h-50v-50h34v17h-34v16zm17-66h16V33H83v34h17V50h50v17z"
                  fill="#0D121B"
                />
                <path
                  d="M50 117h33v16H50v-16zm67 0h16v16h-16v-16zm0-34h16v16h-16V83zm-34 0h17v16H83V83zm-33 0h16v16H50V83zm100 17h16v16h-16v-16zm-33-17h16v16h-16V83zm-17 34h17v16H83v-16zm33 0h17v16h-17v-16zm17 17h16v16h-16v-16z"
                  fill="#0D121B"
                />
              </svg>
            </div>
          </div>

          {/* Bank Info */}
          <div className="border-border-light space-y-4 border-t pt-6 text-left">
            <div className="flex items-center justify-between">
              <span className="text-text-light/70">Account Number:</span>
              <span className="text-lg font-semibold">{mockData.accountNumber}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-text-light/70">Bank Name:</span>
              <span className="text-lg font-semibold">{mockData.bankName}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-text-light/70">Branch:</span>
              <span className="text-lg font-semibold">{mockData.branchName}</span>
            </div>
          </div>

          {/* Timer */}
          <div className="bg-primary/10 mt-8 flex items-center justify-center gap-4 rounded-lg p-4">
            <TimerIcon fontSize="medium" className="text-primary" />

            <div>
              <p className="text-primary/80 text-sm">Time remaining to complete payment:</p>
              <p className="text-primary text-2xl font-bold tracking-widest">
                {minutes}:{seconds}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Qr;
