import Image from "next/image"

export default function FooterSection() {
  return (
    <div className="w-full flex flex-col justify-start items-start bg-[#2A2520]">
      {/* Main Footer Content */}
      <div className="w-full px-6 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 md:py-20 flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16">
        {/* Left Section - Brand */}
        <div className="flex-1 flex flex-col justify-start items-start gap-6">
          {/* Logo and Brand Name */}
          <div className="flex flex-col justify-start items-start gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/codemypixel-logo.png"
                alt="CodeMyPixel"
                width={64}
                height={64}
                className="w-16 h-16 sm:w-20 sm:h-20"
              />
              <div className="flex flex-col justify-start items-start">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-sans">CodemyPixel</h2>
              </div>
            </div>
          </div>

          {/* Brand Description */}
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-sm font-sans">
            Your imagination,our code,
            <br />
            pixel-perfect reality
          </p>
        </div>

        {/* Right Section - Get In Touch */}
        <div className="flex-1 flex flex-col justify-start items-start gap-8 lg:ml-[730px]">
          <div className="flex flex-col justify-start items-start gap-6 w-full">
            <h3 className="text-lg sm:text-xl font-semibold text-white font-sans">Get In Touch</h3>

            {/* Contact Information */}
            <div className="flex flex-col justify-start items-start gap-4 w-full">
              {/* Office */}
              <div className="flex flex-col justify-start items-start gap-2">
                <p className="text-xs sm:text-sm font-medium text-gray-400 font-sans">Office</p>
                <p className="text-sm sm:text-base text-gray-300 font-sans">1421 Narayanganj, Bangladesh</p>
              </div>

              {/* Email */}
              <div className="flex flex-col justify-start items-start gap-2">
                <p className="text-xs sm:text-sm font-medium text-gray-400 font-sans">Email</p>
                <a
                  href="mailto:Admin@codemypixel.com"
                  className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors font-sans"
                >
                  Admin@codemypixel.com
                </a>
              </div>

              {/* WhatsApp */}
              <div className="flex flex-col justify-start items-start gap-2">
                <p className="text-xs sm:text-sm font-medium text-gray-400 font-sans">WhatsApp</p>
                <a
                  href="https://wa.me/8801406575730"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors font-sans"
                >
                  +880 1406 575730
                </a>
              </div>

              {/* Terms & Conditions */}
              <div className="flex flex-col justify-start items-start gap-2 pt-2">
                <a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors font-sans">
                  Terms & Conditions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright and Social */}
      <div className="w-full px-6 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-4">
        {/* Left - Copyright */}
        <div className="text-xs sm:text-sm text-gray-400 font-sans">©2025 TEAM CodeMyPixel All Right Reserved</div>

        {/* Right - Social Media */}
        <div className="flex justify-start items-center gap-4">
          <span className="text-xs sm:text-sm text-gray-400 font-sans">Follow us</span>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/codemypixelai"
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
            aria-label="Facebook"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>

          {/* YouTube */}
          <a
            href="https://www.youtube.com/channel/UCvtwb2wkN7ctLFjHdSfwW_A"
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
            aria-label="YouTube"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/codemypixeldotcom"
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
