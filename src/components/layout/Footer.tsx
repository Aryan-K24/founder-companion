import React from "react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200/80 bg-white py-8 text-center text-xs text-slate-500">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
        <p className="font-medium text-slate-600">© 2026 Founder Companion · Built by Aryan Kulkarni</p>
        <div>
          <a
            href="https://internship.flyrank.ai/verify?id=54445055-3088-4FF5-B87F-05376AC8D638&amp;first_name=Aryan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Verify Aryan K's FlyRank AI Internship credential"
            style={{
              boxSizing: "border-box",
              margin: 0,
              padding: "6px 14px 6px 11px",
              border: "1px solid #DDE4E7",
              background: "#FFFFFF",
              textDecoration: "none",
              borderRadius: "9999px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              verticalAlign: "middle",
              whiteSpace: "nowrap",
            }}
          >
            <svg
              width="11"
              height="15"
              viewBox="26 18 44 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              style={{ display: "block", flex: "none" }}
            >
              <path
                d="M28.2354 74.2202V67.9039C29.6419 68.4369 31.3724 68.7055 33.4311 68.7055C35.3235 68.7055 36.8153 68.2396 37.8979 67.3079C38.9805 66.3762 39.9566 64.8695 40.8218 62.792L42.6887 58.3139L29.8976 29.2879C35.0038 29.2879 39.6028 32.3307 41.5294 36.9893L47.0746 50.3985L56.0126 28.6038C57.9221 23.9452 62.5168 20.894 67.6187 20.894L50.0795 63.5936C48.4556 67.5933 46.5205 70.5102 44.2743 72.3484C42.0281 74.1867 39.1169 75.1058 35.5451 75.1058C32.6212 75.1058 30.1875 74.812 28.2354 74.2244V74.2202Z"
                fill="#1A7A4A"
              />
            </svg>
            <span
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#051F21",
                fontFamily:
                  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
              }}
            >
              FlyRank verified
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              style={{ display: "block", flex: "none" }}
            >
              <circle cx="12" cy="12" r="10" stroke="#1A7A4A" strokeWidth="1.5" />
              <path
                d="M7.9 12.3l2.8 2.8 5.4-5.8"
                stroke="#1A7A4A"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
