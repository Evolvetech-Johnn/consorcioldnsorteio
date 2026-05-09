import { motion } from 'framer-motion'
import { useAppStore, type AppState } from '../../lib/store'
import { Link } from 'react-router-dom'

export function DashboardOverview() {
  const leads = useAppStore((state: AppState) => state.leads)
  const campaigns = useAppStore((state: AppState) => state.campaigns)
  const raffles = useAppStore((state: AppState) => state.raffles)

  const stats = [
    {
      label: 'Total de Leads',
      value: leads.length.toString(),
      change: '+12%',
      positive: true,
      color: 'from-blue-500 to-blue-600',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      label: 'Campanhas Ativas',
      value: campaigns.filter((c) => c.active).length.toString(),
      change: '+1',
      positive: true,
      color: 'from-emerald-500 to-emerald-600',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      label: 'Consultores',
      value: '1',
      change: '0',
      positive: true,
      color: 'from-purple-500 to-purple-600',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 3 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      label: 'Sorteios Realizados',
      value: raffles.length.toString(),
      change: `+${raffles.length}`,
      positive: true,
      color: 'from-orange-500 to-orange-600',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ]

  const recentLeads = [...leads].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 3)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-white`}>
                {stat.icon}
              </div>
              <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                stat.positive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
            <p className="text-slate-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Leads Recentes</h3>
            <Link to="/admin/leads" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              Ver todos
            </Link>
          </div>
          <div className="space-y-4">
            {recentLeads.length === 0 ? (
              <p className="text-center text-slate-500 py-8">Nenhum lead cadastrado ainda</p>
            ) : (
              recentLeads.map((lead, index) => (
                <div key={lead.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                      {lead.fullName[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{lead.fullName}</p>
                      <p className="text-sm text-slate-500">{lead.whatsapp}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                      Novo
                    </span>
                    <p className="text-xs text-slate-400 mt-1">{formatDate(lead.createdAt)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Visão Geral</h3>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">Leads por Campanha</span>
                <span className="font-semibold text-slate-900">{leads.length}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{ width: `${Math.min(100, (leads.length / 50) * 100)}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">Campanhas Ativas</span>
                <span className="font-semibold text-slate-900">{campaigns.filter(c => c.active).length}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full" style={{ width: '70%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">Sorteios Realizados</span>
                <span className="font-semibold text-slate-900">{raffles.length}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full" style={{ width: `${Math.min(100, (raffles.length / 10) * 100)}%` }} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
