import { motion } from 'framer-motion'

const mockCampaigns = [
  {
    id: '1',
    title: 'Sorteio Premium 2026',
    eventName: 'Sorteio de Consórcio',
    active: true,
    startDate: '2026-05-01',
    endDate: '2026-06-15',
    leadsCount: 854,
  },
  {
    id: '2',
    title: 'Sorteio de Verão',
    eventName: 'Verão 2026',
    active: true,
    startDate: '2026-01-15',
    endDate: '2026-03-31',
    leadsCount: 320,
  },
  {
    id: '3',
    title: 'Sorteio Especial',
    eventName: 'Aniversário da Empresa',
    active: false,
    startDate: '2025-10-01',
    endDate: '2025-12-15',
    leadsCount: 510,
  },
]

export function CampaignsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Campanhas</h1>
          <p className="text-slate-500">Gerencie todas as campanhas de sorteio</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nova Campanha
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCampaigns.map((campaign, index) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden"
          >
            <div className="h-2 bg-gradient-to-r from-blue-500 to-emerald-500"></div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{campaign.title}</h3>
                  <p className="text-sm text-slate-500">{campaign.eventName}</p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${
                  campaign.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  {campaign.active ? 'Ativa' : 'Inativa'}
                </span>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Período</span>
                  <span className="text-slate-700 font-medium">
                    {campaign.startDate} a {campaign.endDate}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Leads Capturados</span>
                  <span className="text-slate-700 font-bold text-lg">{campaign.leadsCount}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-all text-sm font-medium">
                  Ver Detalhes
                </button>
                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
