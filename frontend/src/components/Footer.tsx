const Footer = () => {
  return (
    <footer className="mt-6 pt-10 pb-8 px-12 text-sm bg-core-white text-gray-500">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-12 xl:gap-32">
          <div>
            <h4>Customer Service</h4>
            <hr className="my-2" />
            <ul className="space-y-1">
              <li>Shipping Information</li>
              <li>Returns & Exchanges</li>
              <li>Warranty Information</li>
            </ul>
          </div>
          <div>
            <h4>Follow us on social media</h4>
            <hr className="my-2" />
            <ul className="space-y-1">
              <li>Facebook</li>
              <li>Instagram</li>
              <li>YouTube</li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <hr className="my-2" />
            <ul className="space-y-1">
              <li>Customer Service: 1-888-555-2468</li>
              <li>Email: support@core.com</li>
              <li>Address: 2234 Tech Plaza Drive, NY 94025</li>
            </ul>
          </div>
        </div>
        <p className="mt-8">
          Legal © 2025 Core Electronics. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
