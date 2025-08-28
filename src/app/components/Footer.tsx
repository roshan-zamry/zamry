"use client";

import ThreeScene from "./ThreeScene";

const PersonalFooter = () => {
  const name = "Roshan Zamry";
  const title = "Web Developer";
  const email = "roshan.zamry7@gmail.com";
  const phone = "0522583846";

  return (
    <footer
      id="con-foot"
      className="relative bg-gradient-to-br from-slate-900 to-slate-950 overflow-hidden py-16 px-4 md:px-8 border-t border-slate-800"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
          <div className="flex flex-col items-center">
            <div
              className="w-40 h-40 rounded-xl flex items-center justify-center mb-4 overflow-hidden relative"
              style={{
                border: "1.5px solid rgba(59,130,246,0.5)",
                boxShadow: "0 0 10px rgba(59,130,246,0.8)",
              }}
            >
              <ThreeScene scaleFactor={0.8} height="100%" />
            </div>

            <h2 className="text-xl font-bold text-white">{name}</h2>
            <p className="text-sm text-slate-400">{title}</p>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                Contact
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a
                    href={`mailto:${email}`}
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <a
                    href={`tel:${phone.replace(/\D/g, "")}`}
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {phone}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                Connect
              </h3>
              <div className="flex gap-4">
                {[
                  {
                    name: "Facebook",
                    url: "https://www.facebook.com/roshan.zamry/",
                    short: "FB",
                  },
                  {
                    name: "Linkedin",
                    url: "https://www.linkedin.com/in/roshan-zamry/",
                    short: "LI",
                  },
                  {
                    name: "Instagram",
                    url: "https://www.instagram.com/roshan_zamry/",
                    short: "IG",
                  },
                  {
                    name: "Discord",
                    url: "https://x.com/roshanzamry7",
                    short: "x",
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-slate-800/50 hover:bg-slate-800/80 transition-colors flex items-center justify-center border border-slate-700/50"
                    aria-label={social.name}
                  >
                    <span className="text-slate-300 text-sm">
                      {social.short}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/50 mt-12 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} {name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default PersonalFooter;
