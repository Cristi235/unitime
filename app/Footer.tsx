import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
            <footer className="text-center text-gray-400 py-6 bg-gray-800">
          <div className="mb-4">
            <p>&copy; 2025 UniTime. Toate drepturile rezervate.</p>
          </div>
          <div className="flex justify-center gap-6 mb-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-gray-400 hover:text-white transition"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-gray-400 hover:text-white transition"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-400 hover:text-white transition"
            >
              <FaInstagram size={24} />
            </a>
          </div>
          <div>
            <a
              href="/privacy-policy"
              className="text-gray-400 hover:text-white transition"
            >
              Politica de confidențialitate
            </a>{" "}
            |{" "}
            <a
              href="/terms-of-service"
              className="text-gray-400 hover:text-white transition"
            >
              Termeni și condiții
            </a>
          </div>
        </footer>
    </div>
  )
}

export default Footer
