import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { categories, products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [searchParams] = useSearchParams();
  const urlCat = searchParams.get("cat") || "all";
  const [activeCat, setActiveCat] = useState(urlCat);

  const filtered = useMemo(() => {
    if (activeCat === "all") return products;
    return products.filter((p) => p.category === activeCat);
  }, [activeCat]);

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* HERO */}
      <section className="pt-10 md:pt-14">
  <div className="relative overflow-hidden rounded-[2rem] border border-neutral-800 bg-neutral-950">
    {/* Background textures */}
    <div className="absolute inset-0 opacity-70">
      <div className="absolute -top-28 -left-28 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-28 -right-28 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.10),transparent_55%)]" />
    </div>

    <div className="relative p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 text-xs text-neutral-200 border border-neutral-800 bg-black/40 px-3 py-2 rounded-full">
          <span className="w-2 h-2 rounded-full bg-white" />
          Nouvelle collection — Drop Void
        </div>

        <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight leading-[1.02]">
          Essentials premium.
          <span className="block text-neutral-300">Style minimal, impact maximal.</span>
        </h1>

        <p className="mt-4 text-neutral-400 max-w-xl">
          Des pièces conçues pour durer : matières lourdes, coupes modernes,
          finitions nettes. Découvre la sélection et compose ton outfit.
        </p>

        <div className="mt-7 flex gap-3 flex-wrap">
          <a
            href="#shop"
            className="px-5 py-3 rounded-2xl bg-white text-black font-semibold hover:opacity-90 active:scale-[0.98] transition"
          >
            Découvrir la collection
          </a>
          <button
            onClick={() => setActiveCat("hoodies")}
            className="px-5 py-3 rounded-2xl border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800 transition"
          >
            Hoodies
          </button>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-3 text-sm text-neutral-300">
          <Stat label="Livraison" value="24/48h" />
          <Stat label="Retours" value="14 jours" />
          <Stat label="Paiement" value="Sécurisé" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative"
      >
        <div className="aspect-[4/5] rounded-[2rem] border border-neutral-800 overflow-hidden bg-neutral-900">
          <img
            src="/images/hero.webp"
            alt="Nouvelle collection"
            className="w-full h-full object-cover opacity-95"
          />
        </div>

        <div className="absolute -bottom-4 left-6 right-6 p-4 rounded-2xl bg-black/70 backdrop-blur border border-neutral-800">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-semibold">Best-seller du moment</div>
              <div className="text-xs text-neutral-400 mt-1">Pièces limitées • Restock rapide</div>
            </div>
            <a href="#shop" className="text-xs underline text-neutral-200 hover:text-white transition">
              Voir
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</section>


      {/* CATEGORIES */}
      <section id="shop" className="pt-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Shop</h2>
            <p className="text-neutral-400 mt-1">Choisis une catégorie comme sur un vrai site.</p>
          </div>
        </div>

        <div className="mt-6 flex gap-2 flex-wrap">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCat(c.id)}
              className={`px-4 py-2 rounded-2xl border transition ${
                activeCat === c.id ? "border-white bg-white text-black" : "border-neutral-800 bg-neutral-950 text-neutral-200 hover:bg-neutral-900"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </section>

      {/* GRID */}
      <section className="py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950/70 px-4 py-3">
      <div className="text-xs text-neutral-500">{label}</div>
      <div className="text-base font-semibold">{value}</div>
    </div>
  );
}
