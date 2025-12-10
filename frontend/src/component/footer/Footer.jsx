import React from "react";

const Footer = () => {
  return (
    <footer className="bg-card-light dark:bg-card-dark border-border-light dark:border-border-dark hidden border-t md:block">
      <div className="l:py-16 mx-auto max-w-7xl py-4 pt-2 lg:pt-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-4 lg:grid-cols-5 lg:gap-8">
          <div className="col-span-1 hidden lg:col-span-2 lg:block">
            <h3 className="text-lg font-bold">ShoeShop</h3>
            <p className="text-text-light/70 dark:text-text-dark/70 mt-2 text-sm">
              The best place to find your perfect pair of shoes. High-quality, stylish, and comfortable footwear for
              everyone.
            </p>
            <div className="mt-4 flex gap-4">
              <a
                className="text-text-light/70 dark:text-text-dark/70 hover:text-primary dark:hover:text-primary transition-colors"
                href="#">
                <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    clip-rule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    fill-rule="evenodd"></path>
                </svg>
              </a>
              <a
                className="text-text-light/70 dark:text-text-dark/70 hover:text-primary dark:hover:text-primary transition-colors"
                href="#">
                <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a
                className="text-text-light/70 dark:text-text-dark/70 hover:text-primary dark:hover:text-primary transition-colors"
                href="#">
                <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    clip-rule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.793 2.013 10.147 2 12.315 2zm-1.002 6.363a4.158 4.158 0 11-5.88 5.88 4.158 4.158 0 015.88-5.88zM12 15.428a3.428 3.428 0 100-6.857 3.428 3.428 0 000 6.857zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"
                    fill-rule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="col-span-1 md:col-start-2 lg:col-start-auto">
            <h3 className="text-sm font-semibold tracking-wider uppercase">Shop</h3>
            <ul className="mt-4 space-y-2 md:mt-2 md:space-y-1">
              <li>
                <a
                  className="text-text-light/70 dark:text-text-dark/70 hover:text-primary dark:hover:text-primary text-sm transition-colors"
                  href="#">
                  Men's
                </a>
              </li>
              <li>
                <a
                  className="text-text-light/70 dark:text-text-dark/70 hover:text-primary dark:hover:text-primary text-sm transition-colors"
                  href="#">
                  Women's
                </a>
              </li>
              <li>
                <a
                  className="text-text-light/70 dark:text-text-dark/70 hover:text-primary dark:hover:text-primary text-sm transition-colors"
                  href="#">
                  Kids'
                </a>
              </li>
              <li>
                <a
                  className="text-text-light/70 dark:text-text-dark/70 hover:text-primary dark:hover:text-primary text-sm transition-colors"
                  href="#">
                  New Arrivals
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="text-sm font-semibold tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2 md:mt-2 md:space-y-1">
              <li>
                <a
                  className="text-text-light/70 dark:text-text-dark/70 hover:text-primary dark:hover:text-primary text-sm transition-colors"
                  href="#">
                  About Us
                </a>
              </li>
              <li>
                <a
                  className="text-text-light/70 dark:text-text-dark/70 hover:text-primary dark:hover:text-primary text-sm transition-colors"
                  href="#">
                  Contact
                </a>
              </li>
              <li>
                <a
                  className="text-text-light/70 dark:text-text-dark/70 hover:text-primary dark:hover:text-primary text-sm transition-colors"
                  href="#">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="text-sm font-semibold tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-2 md:mt-2 md:space-y-1">
              <li>
                <a
                  className="text-text-light/70 dark:text-text-dark/70 hover:text-primary dark:hover:text-primary text-sm transition-colors"
                  href="#">
                  FAQs
                </a>
              </li>
              <li>
                <a
                  className="text-text-light/70 dark:text-text-dark/70 hover:text-primary dark:hover:text-primary text-sm transition-colors"
                  href="#">
                  Shipping
                </a>
              </li>
              <li>
                <a
                  className="text-text-light/70 dark:text-text-dark/70 hover:text-primary dark:hover:text-primary text-sm transition-colors"
                  href="#">
                  Returns
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
