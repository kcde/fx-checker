import flagUS from "../assets/flags/flag-us.png";
import flagEU from "../assets/flags/flag-eu.png";
import flagGB from "../assets/flags/flag-gb.png";
import flagJP from "../assets/flags/flag-jp.svg";

const FLAGS = {
  USD: flagUS,
  EUR: flagEU,
  GBP: flagGB,
  JPY: flagJP,
};

export default function Flag({ code, size = 20 }) {
  const src = FLAGS[code];
  return (
    <img
      src={src}
      alt={code}
      width={size}
      height={size}
      style={{
        width: size,
        height: size,
        borderRadius: "var(--radius-full)",
        objectFit: "cover",
        display: "block",
        flexShrink: 0,
      }}
    />
  );
}
