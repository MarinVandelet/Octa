import { useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../store/cartStore";
import ProductViewer3D from "../components/ProductViewer3D";
import ImageSlider from "../components/ImageSlider";
import { ShieldCheck, Truck, RefreshCcw } from "lucide-react";

export default function Product() {
  const { id } = useParams();
  const nav = useNavigate();

  const product = useMemo(() => products.find((p) => p.id === id), [id]);
  const addItem = useCart((s) => s.addItem);

  const sizes = product?.sizes?.length ? product.sizes : ["XS", "S", "M", "L", "XL"];
  const colors = product?.colors?.length ? product.colors : ["Noir", "Gris", "Blanc"];

  const [size, setSize] = useState(sizes[0]);
  const [color, setColor] = useState(colors[0]);

  const [sex3D, setSex3D] = useState("homme");
  const [display3D, setDisplay3D] = useState("fixe");
  const [color3D, setColor3D] = useState("#ffffff");

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10">
        <p className="text-neutral-300">Produit introuvable.</p>
        <Link to="/" className="underline">Retour</Link>
      </div>
    );
  }

  const cover = product.images?.[0] || product.image;

  function addToCart() {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: cover,
      size,
      color,
    });
  }

  function buyNow() {
    addToCart();
    nav("/checkout");
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Breadcrumbs */}
      <div className="text-sm text-neutral-400 mb-6">
        <Link to="/" className="hover:text-white transition">Accueil</Link>
        <span className="mx-2">/</span>
        <Link to="/#shop" className="hover:text-white transition">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-200">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT */}
        <div className="space-y-4">
          <ImageSlider images={product.images || [cover]} alt={product.name} />

          {/* Viewer 3D : présent si tu veux, mais aucune mention */}
           <ProductViewer3D 
            sex={sex3D}
            display={display3D}
            color={color3D}
          />
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
            <p className="text-neutral-400 mt-2">{product.description}</p>
          </div>

          <div className="flex items-end justify-between gap-4">
            <div className="text-2xl font-semibold">{product.price} €</div>
            <div className="text-sm text-neutral-400">
              En stock • Expédition sous 24/48h
            </div>
          </div>

          {/* Color */}
          <div className="space-y-2">
            <div className="text-sm text-neutral-400">Couleur</div>
            <div className="flex gap-2 flex-wrap">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`px-3 py-2 rounded-2xl border transition ${
                    color === c
                      ? "border-white bg-white text-black"
                      : "border-neutral-800 bg-neutral-950 text-neutral-200 hover:bg-neutral-900"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="space-y-2">
            <div className="text-sm text-neutral-400">Taille</div>
            <div className="flex gap-2 flex-wrap">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-3 py-2 rounded-2xl border transition ${
                    size === s
                      ? "border-white bg-white text-black"
                      : "border-neutral-800 bg-neutral-950 text-neutral-200 hover:bg-neutral-900"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={addToCart}
              className="px-5 py-3 rounded-2xl border border-neutral-800 bg-neutral-950 hover:bg-neutral-900 transition font-semibold"
            >
              Ajouter au panier
            </button>

            <button
              onClick={buyNow}
              className="px-5 py-3 rounded-2xl bg-white text-black font-semibold hover:opacity-90 active:scale-[0.98] transition"
            >
              Acheter maintenant
            </button>
          </div>

          {/* Trust blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <InfoCard icon={<Truck size={18} />} title="Livraison rapide" desc="Expédition 24/48h." />
            <InfoCard icon={<RefreshCcw size={18} />} title="Retours faciles" desc="14 jours pour changer." />
            <InfoCard icon={<ShieldCheck size={18} />} title="Paiement sécurisé" desc="Transactions protégées." />
          </div>

          {/* Details */}
          <div className="pt-4 border-t border-neutral-800">
            <div className="text-sm font-semibold">Détails</div>
            <ul className="mt-3 text-sm text-neutral-400 space-y-2 list-disc pl-5">
              <li>Coupe moderne et finitions premium</li>
              <li>Matière confortable, tenue impeccable</li>
              <li>Conseil taille : prends ta taille habituelle</li>
            </ul>
          </div>

          {/* 3D Controls */}
          <div className="pt-4 border-t border-neutral-800 space-y-6">
            <div className="text-lg font-semibold">Visualisation 3D</div>

            {/* Sexe */}
            <div>
              <div className="text-sm text-neutral-400 mb-2">Sexe</div>
              <div className="flex gap-2">
                {["homme", "femme"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSex3D(s)}
                    className={`px-3 py-2 rounded-xl border transition ${
                      sex3D === s
                        ? "bg-white text-black border-white"
                        : "border-neutral-700 text-neutral-300"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Display */}
            <div>
              <div className="text-sm text-neutral-400 mb-2">Affichage</div>
              <div className="flex gap-2 flex-wrap">
                {["fixe", "mouvement", "seul"].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDisplay3D(d)}
                    className={`px-3 py-2 rounded-xl border transition ${
                      display3D === d
                        ? "bg-white text-black border-white"
                        : "border-neutral-700 text-neutral-300"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Couleur 3D */}
            <div>
              <div className="text-sm text-neutral-400 mb-3">Couleur du T-Shirt</div>
              <div className="flex flex-wrap gap-3">
                {[
                  "#ffffff",
                  "#ef4444",
                  "#22c55e",
                  "#3b82f6",
                  "#eab308",
                  "#a855f7",
                  "#f97316",
                  "#14b8a6",
                  "#ec4899",
                  "#111827",
                ].map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor3D(c)}
                    className={`w-8 h-8 rounded-full border-2 transition ${
                      color3D === c
                        ? "border-white scale-110"
                        : "border-neutral-700"
                    }`}
                    style={{ background: c }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, desc }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
      <div className="flex items-center gap-2 text-neutral-200">
        {icon}
        <div className="text-sm font-semibold">{title}</div>
      </div>
      <div className="mt-2 text-xs text-neutral-400">{desc}</div>
    </div>
  );
}
