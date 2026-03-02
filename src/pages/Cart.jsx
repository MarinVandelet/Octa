import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../store/cartStore";
import { motion } from "framer-motion";

const keyOf = (i) => `${i.id}_${i.size}_${i.color}`;

export default function Cart() {
  const nav = useNavigate();
  const items = useCart((s) => s.items);
  const removeItem = useCart((s) => s.removeItem);
  const setQty = useCart((s) => s.setQty);
  const total = useCart((s) => s.total);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-3xl font-bold">Panier</h1>
        <Link to="/" className="text-neutral-300 underline">Continuer shopping</Link>
      </div>

      {items.length === 0 ? (
        <div className="mt-10 p-6 rounded-2xl border border-neutral-800 bg-neutral-900/40">
          <p className="text-neutral-300">Ton panier est vide.</p>
          <Link to="/" className="inline-block mt-4 px-4 py-2 rounded-xl bg-white text-black font-semibold">
            Voir la collection
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LIST */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((i) => {
              const k = keyOf(i);
              return (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4 p-4 rounded-2xl border border-neutral-800 bg-neutral-900/40"
                >
                  <img src={i.image} className="w-24 h-28 object-cover rounded-xl border border-neutral-800" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-semibold">{i.name}</div>
                        <div className="text-sm text-neutral-400 mt-1">
                          {i.color} • {i.size}
                        </div>
                      </div>
                      <div className="font-semibold">{i.price}€</div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setQty(k, i.qty - 1)}
                          className="w-9 h-9 rounded-xl border border-neutral-800 bg-neutral-950 hover:bg-neutral-800 transition"
                        >
                          -
                        </button>
                        <div className="w-10 text-center">{i.qty}</div>
                        <button
                          onClick={() => setQty(k, i.qty + 1)}
                          className="w-9 h-9 rounded-xl border border-neutral-800 bg-neutral-950 hover:bg-neutral-800 transition"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(k)}
                        className="text-sm text-neutral-300 hover:text-white underline"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* SUMMARY */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 h-fit">
            <div className="text-lg font-semibold">Récap</div>
            <div className="mt-4 flex items-center justify-between text-neutral-300">
              <span>Sous-total</span>
              <span>{total()}€</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-neutral-300">
              <span>Livraison</span>
              <span>Offerte</span>
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-800 flex items-center justify-between font-semibold">
              <span>Total</span>
              <span>{total()}€</span>
            </div>

            <button
              onClick={() => nav("/checkout")}
              className="mt-5 w-full px-5 py-3 rounded-2xl bg-white text-black font-semibold hover:opacity-90 active:scale-[0.98] transition"
            >
              Continuer vers paiement
            </button>

            <div className="mt-3 text-xs text-neutral-500">
              Checkout simulé (démo)
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
