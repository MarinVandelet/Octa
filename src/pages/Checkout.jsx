import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../store/cartStore";
import { ShieldCheck, Truck, RefreshCcw, Lock } from "lucide-react";
import { FaPaypal, FaApple, FaCcVisa, FaCcMastercard } from "react-icons/fa";


export default function Checkout() {
  const nav = useNavigate();
  const items = useCart((s) => s.items);
  const total = useCart((s) => s.total);
  const clearCart = useCart((s) => s.clearCart);

  const [method, setMethod] = useState("card");
  const canPay = useMemo(() => items.length > 0, [items.length]);

  function onPay(e) {
    e.preventDefault();
    if (!canPay) return;
    clearCart();
    nav("/success");
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Paiement</h1>
          <p className="text-neutral-400 mt-2">
            Finalise ta commande en quelques secondes.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs text-neutral-300 border border-neutral-800 bg-neutral-950 px-3 py-2 rounded-full">
          <Lock size={14} />
          Checkout sécurisé
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact */}
          <CardSection title="Informations" subtitle="Contact & livraison">
            <form onSubmit={onPay} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Prénom" placeholder="Yanis" />
                <Input label="Nom" placeholder="Octa" />
              </div>

              <Input label="Email" placeholder="yanis@octa.com" type="email" />

              <Input label="Adresse" placeholder="12 rue du style" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Ville" placeholder="Paris" />
                <Input label="Code postal" placeholder="75000" />
              </div>

              {/* Payment method */}
              <CardSection
                inner
                title="Méthode de paiement"
                subtitle="Choisis une option"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <PayOption
                      active={method === "card"}
                      onClick={() => setMethod("card")}
                      title="Carte"
                      badge={
                        <div className="flex items-center gap-2">
                          <FaCcVisa size={28} />
                          <FaCcMastercard size={28} />
                        </div>
                      }
                    />

                    <PayOption
                      active={method === "paypal"}
                      onClick={() => setMethod("paypal")}
                      title="PayPal"
                      badge={<FaPaypal size={34} />}
                    />

                    <PayOption
                      active={method === "apple"}
                      onClick={() => setMethod("apple")}
                      title="Apple Pay"
                      badge={
                        <div className="flex items-center gap-2">
                          <FaApple size={28} />
                          <span className="font-semibold">Pay</span>
                        </div>
                      }
                    />

                </div>

                {/* Card details only for card */}
                {method === "card" && (
                  <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Numéro de carte" placeholder="1234 5678 9012 3456" />
                    <Input label="Nom sur la carte" placeholder="YANIS OCTA" />
                    <Input label="Expiration" placeholder="MM/AA" />
                    <Input label="CVC" placeholder="123" />
                  </div>
                )}

                <div className="mt-4 flex items-center gap-2 text-xs text-neutral-400">
                  <ShieldCheck size={14} />
                  Paiement protégé • Données chiffrées
                </div>
              </CardSection>

              {/* Pay button */}
              <div className="pt-2">
                <button
                  disabled={!canPay}
                  className={`w-full md:w-auto px-6 py-3 rounded-2xl font-semibold transition
                    ${canPay
                      ? "bg-white text-black hover:opacity-90 active:scale-[0.98]"
                      : "bg-neutral-700 text-neutral-300 cursor-not-allowed"}`}
                >
                  Payer {total()}€
                </button>
              </div>
            </form>
          </CardSection>

          {/* Trust row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <InfoCard icon={<Truck size={18} />} title="Livraison rapide" desc="Expédition 24/48h." />
            <InfoCard icon={<RefreshCcw size={18} />} title="Retours faciles" desc="14 jours pour changer." />
            <InfoCard icon={<ShieldCheck size={18} />} title="Paiement sécurisé" desc="Transactions protégées." />
          </div>
        </div>

        {/* RIGHT: summary */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
            <div className="text-lg font-semibold">Résumé commande</div>

            <div className="mt-4 space-y-3">
              {items.map((i) => (
                <div key={`${i.id}_${i.size}_${i.color}`} className="flex items-center gap-3">
                  <img
                    src={i.image}
                    alt={i.name}
                    className="w-12 h-14 rounded-xl object-cover border border-neutral-800"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-semibold leading-tight">{i.name}</div>
                    <div className="text-xs text-neutral-400 mt-1">
                      {i.color} • {i.size} • x{i.qty}
                    </div>
                  </div>
                  <div className="text-sm font-semibold">{i.price * i.qty}€</div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-5 border-t border-neutral-800 space-y-2 text-sm text-neutral-300">
              <Row label="Sous-total" value={`${total()}€`} />
              <Row label="Livraison" value="Offerte" />
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-800 flex items-center justify-between font-semibold">
              <span>Total</span>
              <span>{total()}€</span>
            </div>

            <div className="mt-4 text-xs text-neutral-400 flex items-center gap-2">
              <Lock size={14} />
              Paiement et données sécurisés
            </div>
          </div>

          {/* Small trust badge */}
          <div className="mt-3 rounded-2xl border border-neutral-800 bg-neutral-950 p-4 text-xs text-neutral-400">
            En validant, tu acceptes nos conditions & politique de retours.
          </div>
        </div>
      </div>
    </div>
  );
}

function CardSection({ title, subtitle, children, inner = false }) {
  return (
    <div className={`${inner ? "" : "rounded-2xl border border-neutral-800 bg-neutral-950 p-6"}`}>
      <div className={`${inner ? "mb-4" : "mb-5"}`}>
        <div className="text-base font-semibold">{title}</div>
        {subtitle && <div className="text-sm text-neutral-400 mt-1">{subtitle}</div>}
      </div>
      {children}
    </div>
  );
}

function PayOption({ active, onClick, title, badge }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border p-4 text-left transition ${
        active
          ? "border-white bg-white text-black"
          : "border-neutral-800 bg-neutral-950 hover:bg-neutral-900 text-neutral-200"
      }`}
    >
      <div className="h-9 flex items-center">{badge}</div>
      <div className={`mt-3 text-sm font-semibold ${active ? "text-black" : "text-neutral-200"}`}>
        {title}
      </div>
      <div className={`text-xs mt-1 ${active ? "text-black/70" : "text-neutral-400"}`}>
        Recommandé
      </div>
    </button>
  );
}

function Input({ label, ...props }) {
  return (
    <label className="block">
      <div className="text-sm text-neutral-400 mb-2">{label}</div>
      <input
        {...props}
        className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-neutral-800 outline-none focus:border-neutral-300 transition"
      />
    </label>
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

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-neutral-400">{label}</span>
      <span className="text-neutral-200">{value}</span>
    </div>
  );
}
