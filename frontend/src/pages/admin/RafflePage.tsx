import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore, type Lead } from '../../lib/store'

export function RafflePage() {
  const [selectedCampaign, setSelectedCampaign] = useState('')
  const [isRaffling, setIsRaffling] = useState(false)
  const [winner, setWinner] = useState<Lead | null>(null)
  const [currentName, setCurrentName] = useState('')
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  const campaigns = useAppStore((state) => state.campaigns)
  const leads = useAppStore((state) => state.leads)
  const raffles = useAppStore((state) => state.raffles)
  const addRaffle = useAppStore((state) => state.addRaffle)

  const getLeadsForCampaign = (campaignId: string) => {
    if (!campaignId) return leads
    return leads.filter((l) => l.campaignId === campaignId)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getCampaignTitle = (campaignId?: string) => {
    if (!campaignId) return '-'
    const campaign = campaigns.find((c) => c.id === campaignId)
    return campaign?.title || '-'
  }

  const getWinnerName = (winnerLeadId?: string) => {
    if (!winnerLeadId) return '-'
    const lead = leads.find((l) => l.id === winnerLeadId)
    return lead?.fullName || '-'
  }

  const getWinnerWhatsapp = (winnerLeadId?: string) => {
    if (!winnerLeadId) return '-'
    const lead = leads.find((l) => l.id === winnerLeadId)
    return lead?.whatsapp || '-'
  }

  const startRaffle = () => {
    const candidates = getLeadsForCampaign(selectedCampaign)
    if (!selectedCampaign || candidates.length === 0) return
    
    setIsRaffling(true)
    setWinner(null)
    
    let count = 0
    const maxIterations = 30
    
    intervalRef.current = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * candidates.length)
      setCurrentName(candidates[randomIndex].fullName)
      count++
      
      if (count >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        
        const finalIndex = Math.floor(Math.random() * candidates.length)
        const finalWinner = candidates[finalIndex]
        setWinner(finalWinner)
        setCurrentName(finalWinner.fullName)
        setIsRaffling(false)
        
        addRaffle({
          title: `Sorteio - ${new Date().toLocaleDateString('pt-BR')}`,
          campaignId: selectedCampaign,
          winnerLeadId: finalWinner.id
        })
      }
    }, 100)
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const candidates = getLeadsForCampaign(selectedCampaign)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Sorteio</h1>
          <p className="text-slate-500">Realize sorteios transparentes e justos</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-700 mb-3">Selecione a Campanha</label>
              <select
                value={selectedCampaign}
                onChange={(e) => setSelectedCampaign(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
                disabled={isRaffling}
              >
                <option value="">Escolha uma campanha</option>
                {campaigns.map(campaign => (
                  <option key={campaign.id} value={campaign.id}>
                    {campaign.title} ({getLeadsForCampaign(campaign.id).length} leads)
                  </option>
                ))}
              </select>
            </div>

            <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-2xl p-12 mb-8 overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
                <div className="absolute bottom-0 -left-20 w-48 h-48 bg-emerald-500 rounded-full blur-3xl" />
              </div>

              <div className="relative text-center">
                <AnimatePresence mode="wait">
                  {isRaffling || winner ? (
                    <motion.div
                      key={currentName}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 1.2, y: -20 }}
                      transition={{ duration: 0.1 }}
                      className="mb-4"
                    >
                      <h2 className="text-4xl lg:text-6xl font-bold text-white">
                        {currentName}
                      </h2>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mb-4"
                    >
                      <h2 className="text-4xl lg:text-6xl font-bold text-slate-400">
                        Clique em Sortear
                      </h2>
                    </motion.div>
                  )}
                </AnimatePresence>

                {winner && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2"
                  >
                    <p className="text-xl text-emerald-400 font-semibold">🎉 Vencedor!</p>
                    <p className="text-lg text-slate-300">{winner.whatsapp}</p>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={startRaffle}
                disabled={!selectedCampaign || isRaffling || candidates.length === 0}
                className={`px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all ${
                  !selectedCampaign || isRaffling || candidates.length === 0
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105'
                }`}
              >
                {isRaffling ? (
                  <>
                    <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sorteando...
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Iniciar Sorteio
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Histórico de Sorteios</h3>
            
            {raffles.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <svg className="w-12 h-12 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>Nenhum sorteio realizado ainda</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {[...raffles].sort((a, b) => 
                  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                ).map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 bg-slate-50 rounded-xl border border-slate-100"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-semibold px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                        Vencedor
                      </span>
                    </div>
                    <p className="font-semibold text-slate-900">{getWinnerName(item.winnerLeadId)}</p>
                    <p className="text-sm text-slate-500">{getCampaignTitle(item.campaignId)}</p>
                    <p className="text-xs text-slate-400 mt-1">{formatDate(item.createdAt)}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
