import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const mockData = [
  {
    title: "Purchase - Order - Lookup",
    questionList: [
      {
        question: "How can I track my order?",
        answer:
          "You can track your order status by visiting the 'Order Lookup' page and entering your order number and email address. You will also receive email notifications with tracking information once your order has shipped.",
      },
      {
        question: "Can I change or cancel my order?",
        answer:
          "Unfortunately, once an order is placed, we are unable to make changes or cancellations as it is immediately sent to our warehouse for processing. Please review your order carefully before confirming your purchase.",
      },
      {
        question: "What if I received a damaged item?",
        answer:
          "If you receive a damaged or defective item, please contact our customer service team within 7 days of delivery with your order number and a photo of the item. We will arrange for a replacement or a full refund.",
      },
      {
        question: "How do I know what size to order?",
        answer:
          "Each product page includes a detailed size guide. We recommend measuring your feet and comparing them to the chart for the best fit. If you're between sizes, we suggest sizing up.",
      },
      {
        question: "Do you offer international shipping?",
        answer:
          "Yes, we ship to most countries worldwide. International shipping costs and delivery times will be calculated at checkout based on your location. Please be aware that you may be responsible for customs duties and taxes.",
      },
      {
        question: "My order says delivered, but I haven't received it. What should I do?",
        answer:
          "Sometimes, carriers may mark a package as delivered before it has arrived. Please check with your neighbors and around your property. If you still haven't received it after 24 hours, contact our customer support team for assistance.",
      },
    ],
  },
  {
    title: "Payment methods",
    questionList: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and other secure payment gateways. All transactions are encrypted for your safety.",
      },
    ],
  },
  {
    title: "Promotions - Sales",
    questionList: [
      {
        question: "How do I use a promotion code?",
        answer:
          "To use a promotion code, enter it in the designated field at checkout and click 'Apply'. Please note that only one promotion code can be used per order, and some exclusions may apply.",
      },
    ],
  },
  {
    title: "Delivery - Shipping",
    questionList: [
      {
        question: "What shipping options are available?",
        answer:
          "We offer standard and expedited shipping options. Shipping costs and delivery times vary based on your location and the selected shipping method. You can view the estimated delivery date at checkout.",
      },
    ],
  },
  {
    title: "Product Warranty - Returns & Exchanges",
    questionList: [
      {
        question: "What is your return and exchange policy?",
        answer:
          "We offer a 30-day return and exchange policy for unworn items in their original packaging. All our products come with a 1-year warranty against manufacturing defects. For more details, please visit our Returns & Exchanges page.",
      },
    ],
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0); // default open first

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <h1 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">FREQUENTLY ASKED QUESTIONS</h1>

      <div className="mt-12 space-y-4">
        {mockData.map((section, sectionIndex) => {
          const isOpen = openIndex === sectionIndex;

          return (
            <div key={sectionIndex} className="border-b border-gray-200">
              {/* Header */}
              <button
                type="button"
                onClick={() => handleToggle(sectionIndex)}
                className="flex w-full cursor-pointer items-center justify-between py-5 text-left text-lg font-semibold uppercase hover:bg-gray-100">
                {section.title}
                <KeyboardArrowDownIcon
                  className={`transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"}`}
                />
              </button>

              {/* Collapsible content */}
              <div
                className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
                  isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                }`}>
                <div className="pb-5 text-gray-700">
                  <div className="max-h-[300px] space-y-4 overflow-y-auto pr-4">
                    {section.questionList.map((qa, qaIndex) => (
                      <div key={qaIndex}>
                        {qa.question && <h4 className="font-semibold">{qa.question}</h4>}
                        <p>{qa.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Faq;
