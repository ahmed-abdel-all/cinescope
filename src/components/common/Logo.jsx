import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 text-red-200">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500 text-sm font-black text-white shadow-lg shadow-red-950/30">
        C
      </span>
      <span className="text-2xl font-extrabold tracking-normal">CineScope</span>
    </Link>
  );
}

export default Logo;
