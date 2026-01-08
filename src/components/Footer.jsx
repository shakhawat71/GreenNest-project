import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-linear-to-b from-green-800 via-green-300 to-white mt-16 text-green-800">
      
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand / About */}
        <div>
          <h2 className="text-3xl font-bold tracking-wide text-green-800">
            GreenNest 🌿
          </h2>
          <p className="text-green-800 mt-4 leading-relaxed font-semibold">
            Your trusted place for indoor plants, care tips, and green living inspiration.
            Bring nature into your home and grow with confidence 💚
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h6 className="text-xl font-bold text-green-800 mb-4">Quick Links</h6>
          <ul className="space-y-2 font-semibold text-green-800">
            <li>
              <Link className="hover:text-green-950 transition">About</Link>
            </li>
            <li>
              <Link className="hover:text-green-950 transition">Contact</Link>
            </li>
            <li>
              <Link className="hover:text-green-950 transition">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h6 className="text-xl font-bold text-green-800 mb-4">Follow Us</h6>

          <div className="flex gap-4 mt-3">
            {/* Instagram */}
            <a
              href="#"
              className="w-12 h-12 rounded-full flex items-center justify-center bg-white/50 hover:bg-green-800 transition duration-300 hover:scale-110 shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                className="fill-current text-green-800 hover:text-white"
              >
                <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm9 2h-9A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4zm-4.5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.2-.8a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="#"
              className="w-12 h-12 rounded-full flex items-center justify-center bg-white/50 hover:bg-green-800 transition duration-300 hover:scale-110 shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                className="fill-current text-green-800 hover:text-white"
              >
                <path d="M9 8H7v4h2v12h5V12h3.642L18 8h-4V6c0-1 .2-1 1-1h3V0h-4c-3.314 0-5 1.686-5 5v3z" />
              </svg>
            </a>

            {/* Pinterest */}
            <a
              href="#"
              className="w-12 h-12 rounded-full flex items-center justify-center bg-white/50 hover:bg-green-800 transition duration-300 hover:scale-110 shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                className="fill-current text-green-800 hover:text-white"
              >
                <path d="M12 2C6.486 2 2 6.486 2 12c0 4.211 2.617 7.807 6.29 9.294-.087-.789-.166-2.002.035-2.862.182-.78 1.173-4.97 1.173-4.97s-.298-.597-.298-1.479c0-1.386.804-2.422 1.804-2.422.85 0 1.26.638 1.26 1.404 0 .855-.544 2.133-.825 3.316-.235.99.5 1.797 1.48 1.797 1.775 0 3.14-1.872 3.14-4.573 0-2.39-1.717-4.06-4.168-4.06-2.84 0-4.507 2.13-4.507 4.33 0 .855.33 1.774.74 2.273a.3.3 0 0 1 .07.287c-.076.316-.248.99-.282 1.127-.045.182-.147.221-.34.133-1.27-.59-2.06-2.44-2.06-3.93 0-3.19 2.318-6.12 6.682-6.12 3.51 0 6.24 2.504 6.24 5.85 0 3.488-2.2 6.29-5.26 6.29-1.03 0-1.998-.534-2.33-1.164l-.634 2.412c-.23.883-.853 1.99-1.27 2.664.96.296 1.98.456 3.04.456 5.514 0 10-4.486 10-10S17.514 2 12 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-800/30 py-5 text-center bg-white/20">
        <p className="text-sm font-semibold text-green-800">
          © 2025 GreenNest. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
