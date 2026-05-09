import { useState } from 'react'
import { motion } from 'framer-motion'

const mockLeads = [
  {
    id: '1',
    fullName: 'João da Silva',
    whatsapp: '(11) 98765-4321',
    instagram: '@joaosilva',
    email: 'joao@email.com',
    campaign: 'Sorteio Premium 2026',
    consultant: 'Carlos Pereira',
    createdAt: '2026-05-10 14:30:00',
    status: 'Novo',
  },
  {
    id: '2',
    fullName: 'Maria Santos',
    whatsapp: '(11) 91234-5678',
    instagram: '@mariasantos',
    email: 'maria@email.com',
    campaign: 'Sorteio de Verão',
    consultant: 'Ana Costa',
    createdAt: '2026-05-09 10:15:00',
    status: 'Contatado',
  },
  {
    id: '3',
    fullName: 'Pedro Costa',
    whatsapp: '(11) 99876-5432',
    instagram: '@pedrocosta',
    email: 'pedro@email.com',
    campaign: 'Sorteio Premium 2026',
    consultant: 'Carlos Pereira',
    createdAt: '2026-05-08 16:45:00',
    status: 'Novo',
  },
  {
    id: '4',
    fullName: 'Ana Oliveira',
    whatsapp: '(11) 94567-8901',
    instagram: '@anaoliveira',
    email: '',
    campaign: 'Sorteio Especial',
    consultant: 'Luiz Silva',
    createdAt: '2026-05-07 09:00:00',
    status: 'Convertido',
  },
  {
    id: '5',
    fullName: 'Lucas Almeida',
    whatsapp: '(11) 93456-7890',
    instagram: '',
    email: 'lucas@email.com',
    campaign: 'Sorteio Premium 2026',
    consultant: 'Ana Costa',
    createdAt: '2026-05-06 18:20:00',
    status: 'Contatado',
  },
]

export function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredLeads = mockLeads.filter((lead) => {
    const matchesSearch = 
      lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.whatsapp.includes(searchTerm) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !filterStatus || lead.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage)
  const currentLeads = filteredLeads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleExportCSV = () => {
    const headers = ['Nome', 'WhatsApp', 'Instagram', 'E-mail', 'Campanha', 'Consultor', 'Data', 'Status']
    const csvContent = [
      headers.join(','),
      ...filteredLeads.map(lead => [
        lead.fullName,
        lead.whatsapp,
        lead.instagram,
        lead.email,
        lead.campaign,
        lead.consultant,
        lead.createdAt,
        lead.status
      ].join(','))
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'leads.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
          <p className="text-slate-500">Gerencie todos os leads capturados</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Exportar CSV
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar por nome, WhatsApp ou e-mail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
          >
            <option value="">Todos os status</option>
            <option value="Novo">Novo</option>
            <option value="Contatado">Contatado</option>
            <option value="Convertido">Convertido</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Nome</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">WhatsApp</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600 hidden lg:table-cell">Campanha</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600 hidden md:table-cell">Data</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Status</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">Ações</th>
              </tr>
            </thead>
            <tbody>
              {currentLeads.map((lead, index) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                        {lead.fullName[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{lead.fullName}</p>
                        {lead.email && <p className="text-sm text-slate-500">{lead.email}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-700">{lead.whatsapp}</td>
                  <td className="py-4 px-4 text-slate-700 hidden lg:table-cell">{lead.campaign}</td>
                  <td className="py-4 px-4 text-slate-500 text-sm hidden md:table-cell">{lead.createdAt}</td>
                  <td className="py-4 px-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      lead.status === 'Novo' ? 'bg-blue-100 text-blue-700' :
                      lead.status === 'Contatado' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-slate-500">
            Mostrando {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, filteredLeads.length)} de {filteredLeads.length} leads
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Anterior
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
