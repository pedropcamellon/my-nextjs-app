import Link from "next/link";
import { BsFillSendFill } from "react-icons/bs";

const Header = () => {
  return (
    <footer className="mt-16">
      <div className="container mx-auto px-4">
        <Link
          href="/"
          className="font-black text-tertiary-dark"
        >
          Golden Coast
        </Link>

        <h4 className="font-semibold text-[40px] py-6">Contact</h4>

        <div className="flex flex-wrap gap-16 items-center justify-between">
          <div className="flex-1">
            <p>123 Main Street, Anytown, USA</p>
            <div className="flex items-center py-4">
              <BsFillSendFill />
              <p className="ml-2">email@example.com</p>
            </div>
          </div>

          <div className="flex-1">
            <p className="pb-4">Our Story</p>
            <p className="pb-4">Get In Touch</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Header;
