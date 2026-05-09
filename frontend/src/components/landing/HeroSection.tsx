import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute top-60 -left-40 w-80 h-80 bg-emerald-500 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-blue-200 text-sm font-medium">Sorteio de hoje!</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                SORTEIO ESPECIAL
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Participe do nosso sorteio de hoje e tenha a chance de ganhar:
            </p>

            <div className="mb-8 space-y-3">
              <div className="flex items-center gap-3 text-white text-lg">
                <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                <span>1 Voucher de R$150 em combustível</span>
              </div>
              <div className="flex items-center gap-3 text-white text-lg">
                <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                <span>2 Garrafas térmicas de 500ml</span>
              </div>
              <div className="flex items-center gap-3 text-white text-lg">
                <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                <span>1 Bolsa térmica de 5 litros</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/participar"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all"
                >
                  Participar Agora
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center shadow-xl shadow-blue-500/30">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-3xl font-bold text-white mb-2">Prêmios Incríveis</p>
                <p className="text-slate-300 text-lg">Não perca essa chance!</p>
                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-sm text-slate-400">Data do sorteio</p>
                  <p className="text-xl font-semibold text-white">09 de Maio de 2026</p>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 w-20 h-20 bg-emerald-500/20 rounded-2xl rotate-12 blur-xl" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-500/20 rounded-2xl -rotate-12 blur-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
