/** Inline SVG flags — reliable on every device (emoji flags are not). */
export function Flag({ code, size = 20 }: { code: "fr" | "ma" | "amz" | "gb" | "es" | "it"; size?: number }) {
  const h = Math.round(size * 0.72);
  const common = { width: size, height: h, viewBox: "0 0 25 18", className: "flag-svg", "aria-hidden": true as const };
  switch (code) {
    case "fr":
      return <svg {...common}><rect width="8.33" height="18" fill="#0055A4"/><rect x="8.33" width="8.34" height="18" fill="#fff"/><rect x="16.67" width="8.33" height="18" fill="#EF4135"/></svg>;
    case "it":
      return <svg {...common}><rect width="8.33" height="18" fill="#009246"/><rect x="8.33" width="8.34" height="18" fill="#fff"/><rect x="16.67" width="8.33" height="18" fill="#CE2B37"/></svg>;
    case "es":
      return <svg {...common}><rect width="25" height="18" fill="#AA151B"/><rect y="4.5" width="25" height="9" fill="#F1BF00"/></svg>;
    case "ma":
      return <svg {...common}><rect width="25" height="18" fill="#C1272D"/><path d="M12.5 4.2l1.35 4.15h4.36l-3.53 2.57 1.35 4.15-3.53-2.57-3.53 2.57 1.35-4.15-3.53-2.57h4.36z" fill="none" stroke="#006233" strokeWidth="1.1"/></svg>;
    case "amz":
      return <svg {...common}><rect width="25" height="6" fill="#0072C6"/><rect y="6" width="25" height="6" fill="#3A9927"/><rect y="12" width="25" height="6" fill="#FED600"/><text x="12.5" y="14.5" textAnchor="middle" fontSize="15" fontWeight="700" fill="#E3000F">ⵣ</text></svg>;
    case "gb":
      return <svg {...common}><rect width="25" height="18" fill="#012169"/><path d="M0 0l25 18M25 0L0 18" stroke="#fff" strokeWidth="3.4"/><path d="M0 0l25 18M25 0L0 18" stroke="#C8102E" strokeWidth="1.5"/><path d="M12.5 0v18M0 9h25" stroke="#fff" strokeWidth="5.6"/><path d="M12.5 0v18M0 9h25" stroke="#C8102E" strokeWidth="3"/></svg>;
  }
}
