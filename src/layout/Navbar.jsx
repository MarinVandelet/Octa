import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingBag, User2, Search } from "lucide-react";
import { useCart } from "../store/cartStore";

export default function Navbar() {
  const items = useCart((s) => s.items);
  const nav = useNavigate();

  const count = items.reduce((acc, i) => acc + i.qty, 0);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-black/70 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl border border-neutral-800 bg-neutral-950 grid place-items-center">
            <span className="font-bold tracking-widest">O</span>
          </div>
          <div className="leading-tight">
            <div className="font-bold tracking-[0.2em]">OCTA</div>
            <div className="text-xs text-neutral-400">3D Wear Studio</div>
          </div>
        </Link>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-300">
          <NavLink
            to="/?cat=hoodies"
            className={({ isActive }) =>
              `hover:text-white transition ${isActive ? "text-white" : ""}`
            }
          >
            Hoodies
          </NavLink>
          <NavLink to="/?cat=tshirts" className="hover:text-white transition">
            T-Shirts
          </NavLink>
          <NavLink to="/?cat=jackets" className="hover:text-white transition">
            Jackets
          </NavLink>
          <NavLink to="/?cat=accessories" className="hover:text-white transition">
            Accessories
          </NavLink>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("Recherche (démo)")}
            className="w-11 h-11 rounded-2xl border border-neutral-800 bg-neutral-950 hover:bg-neutral-900 transition grid place-items-center"
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          <button
            onClick={() => alert("Compte en mode démo (pas de connexion)")}
            className="w-11 h-11 rounded-2xl border border-neutral-800 bg-neutral-950 hover:bg-neutral-900 transition grid place-items-center"
            aria-label="Account"
          >
            <User2 size={18} />
          </button>

          <button
            onClick={() => nav("/cart")}
            className="relative w-11 h-11 rounded-2xl border border-neutral-800 bg-neutral-950 hover:bg-neutral-900 transition grid place-items-center"
            aria-label="Cart"
          >
            <ShoppingBag size={18} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white text-black text-xs grid place-items-center font-semibold">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
