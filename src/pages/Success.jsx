import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { CheckCircle2, Truck, ShieldCheck, Mail, ArrowRight, X } from "lucide-react";


export default function Success() {
  const [open, setOpen] = useState(false);

  // petit "order id" réaliste
  const orderId = useMemo(() => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let s = "OCTA-";
    for (let i = 0; i < 8; i++) s += chars[Math.floor(Math.random() * chars.length)];
    return s;
  }, []);

  const eta = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toLocaleDateString("fr-FR", { weekday: "long", day: "2-digit", month: "long" });
  }, []);

  return (
    <div className="min-h-[70vh]">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="relative overflow-hidden rounded-[2rem] border border-neutral-800 bg-neutral-950">
          {/* soft glow */}
          <div className="absolute inset-0 opacity-70 pointer-events-none">
            <div className="absolute -top-28 -left-28 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-28 -right-28 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.10),transparent_55%)]" />
          </div>

          <div className="relative p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="flex flex-col md:flex-row md:items-start md:justify-between gap-8"
            >
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs text-neutral-200 border border-neutral-800 bg-black/40 px-3 py-2 rounded-full">
                  <CheckCircle2 size={14} />
                  Paiement validé
                </div>

                <h1 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight leading-[1.05]">
                  Commande confirmée
                </h1>

                <p className="mt-4 text-neutral-400">
                  Merci pour ta commande. On te tiendra informé à chaque étape.
                </p>

                <DeliveryTruckAnimation />

                <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
                  <span className="px-3 py-2 rounded-2xl border border-neutral-800 bg-black/40 text-neutral-200">
                    N° {orderId}
                  </span>
                  <span className="px-3 py-2 rounded-2xl border border-neutral-800 bg-black/40 text-neutral-200">
                    Livraison estimée : <span className="text-white font-semibold">{eta}</span>
                  </span>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={() => setOpen(true)}
                    className="px-5 py-3 rounded-2xl bg-white text-black font-semibold hover:opacity-90 active:scale-[0.98] transition inline-flex items-center gap-2"
                  >
                    Suivre ma commande <ArrowRight size={18} />
                  </button>

                  <Link
                    to="/"
                    className="px-5 py-3 rounded-2xl border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-800 transition font-semibold"
                  >
                    Continuer shopping
                  </Link>
                </div>
              </div>

              {/* Mini cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-3 w-full md:w-[320px]">
                <MiniCard icon={<Truck size={18} />} title="Expédition" desc="Préparation sous 24/48h" />
                <MiniCard icon={<Mail size={18} />} title="Notifications" desc="Suivi envoyé par email" />
                <MiniCard icon={<ShieldCheck size={18} />} title="Sécurisé" desc="Données protégées" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Next steps */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Step
            n="01"
            title="Confirmation"
            desc="Tu reçois un email avec les détails."
            active
          />
          <Step
            n="02"
            title="Préparation"
            desc="On prépare ta commande avec soin."
          />
          <Step
            n="03"
            title="Expédition"
            desc="Numéro de suivi disponible dès l’envoi."
          />
        </motion.div>
      </div>

      {/* Modal Tracking */}
      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="absolute left-1/2 top-1/2 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-neutral-800 bg-neutral-950 p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-semibold">Suivi de commande</div>
                <div className="text-sm text-neutral-400 mt-1">N° {orderId}</div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-10 h-10 rounded-2xl border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-800 transition grid place-items-center"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 rounded-2xl border border-neutral-800 bg-black/30 p-4">
              <div className="text-sm font-semibold">Statut</div>
              <div className="text-sm text-neutral-300 mt-2">
                Paiement validé • Préparation en cours
              </div>
              <div className="text-xs text-neutral-500 mt-2">
                Livraison estimée : {eta}
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <TimelineItem strong="Commande confirmée" sub="Ton paiement a été accepté." done />
              <TimelineItem strong="Préparation" sub="Nous préparons ton colis." done />
              <TimelineItem strong="Expédition" sub="Le numéro de suivi apparaîtra ici." />
            </div>

            <div className="mt-6 flex gap-3">
              <Link
                to="/"
                className="flex-1 px-5 py-3 rounded-2xl border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-800 transition font-semibold text-center"
                onClick={() => setOpen(false)}
              >
                Retour boutique
              </Link>
              <button
                className="flex-1 px-5 py-3 rounded-2xl bg-white text-black font-semibold hover:opacity-90 active:scale-[0.98] transition"
                onClick={() => setOpen(false)}
              >
                OK
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function MiniCard({ icon, title, desc }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-black/30 p-4">
      <div className="flex items-center gap-2 text-neutral-200">
        {icon}
        <div className="text-sm font-semibold">{title}</div>
      </div>
      <div className="text-xs text-neutral-400 mt-2">{desc}</div>
    </div>
  );
}

function DeliveryTruckAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15 }}
      className="mt-6 rounded-2xl border border-neutral-800 bg-black/35 px-3 py-4"
      aria-hidden="true"
    >
      <div className="relative h-24 overflow-hidden rounded-xl bg-gradient-to-b from-neutral-900/70 via-neutral-900/35 to-black/40">
        <div className="absolute inset-x-0 bottom-3 h-[2px] bg-neutral-500/70" />
        <motion.div
          className="absolute inset-x-0 bottom-[6px] h-[3px] bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.7)_0_18px,transparent_18px_32px)]"
          animate={{ x: [0, -32] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        />

        <motion.div
          className="absolute bottom-4"
          style={{ left: "-112px" }}
          animate={{ left: ["-112px", "calc(100% + 112px)"] }}
          transition={{
            left: { repeat: Infinity, duration: 4.5, ease: "linear" },
          }}
        >
          <img
            src="/camion.png"
            alt="Camion de livraison"
            className="h-16 w-28 object-contain drop-shadow-[0_10px_16px_rgba(0,0,0,0.55)] select-none pointer-events-none"
            draggable="false"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
function Step({ n, title, desc, active }) {
  return (
    <div className={`rounded-2xl border p-5 ${
      active ? "border-white/40 bg-white/5" : "border-neutral-800 bg-neutral-950"
    }`}>
      <div className="text-xs text-neutral-500">{n}</div>
      <div className="mt-2 text-base font-semibold">{title}</div>
      <div className="mt-2 text-sm text-neutral-400">{desc}</div>
    </div>
  );
}

function TimelineItem({ strong, sub, done }) {
  return (
    <div className="flex items-start gap-3">
      <div className={`mt-1 w-3 h-3 rounded-full ${done ? "bg-white" : "bg-neutral-700"}`} />
      <div>
        <div className="text-sm font-semibold">{strong}</div>
        <div className="text-xs text-neutral-400 mt-1">{sub}</div>
      </div>
    </div>
  );
}



