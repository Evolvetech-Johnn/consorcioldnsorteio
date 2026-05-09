import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore, type AppState, type Lead, type Campaign, type LeadStatus } from '../../lib/store'

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: 'Novo',
  contacted: 'Contatado',
  converted: 'Convertido',
  spam: 'Spam'
}

const STATUS_COLORS: Record<LeadStatus, string> = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  converted: 'bg-green-100 text-green-700',
  spam: 'bg-red-100 text-red-700'
}

export function LeadsPage() {
  const leads = useAppStore((state: AppState) => state.leads)
  const campaigns = useAppStore((state: AppState) => state.campaigns)
  const deleteLead = useAppStore((state: AppState) => state.deleteLead)
  const updateLead = useAppStore((state: AppState) => state.updateLead)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCampaign, setFilterCampaign] = useState('')
  const [filterStatus, setFilterStatus] = useState<LeadStatus | ''>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [editForm, setEditForm] = useState({
    fullName: '',
    whatsapp: '',
    instagram: '',
    email: '',
    status: 'new' as LeadStatus
  })
  
  const itemsPerPage = 10

  const getCampaignTitle = (campaignId?: string) => {
    if (!campaignId) return '-'
    const campaign = campaigns.find((c: Campaign) => c.id === campaignId)
    return campaign?.title || '-'
  }

  const filteredLeads = leads.filter((lead: Lead) => {
    const matchesSearch = 
      lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.whatsapp.includes(searchTerm) ||
      (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCampaign = !filterCampaign || lead.campaignId === filterCampaign
    const matchesStatus = !filterStatus || lead.status === filterStatus
    return matchesSearch && matchesCampaign && matchesStatus
  })

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage)
  const currentLeads = filteredLeads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleExportCSV = () => {
    const headers = ['Nome', 'WhatsApp', 'Instagram', 'E-mail', 'Status', 'Campanha', 'Data']
    const csvContent = [
      headers.join(','),
      ...filteredLeads.map((lead: Lead) => [
        `"${lead.fullName}"`,
        lead.whatsapp,
        lead.instagram || '',
        lead.email || '',
        STATUS_LABELS[lead.status],
        `"${getCampaignTitle(lead.campaignId)}"`,
        formatDate(lead.createdAt)
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

  const handleWhatsApp = (lead: Lead) => {
    const message = encodeURIComponent(`Olá ${lead.fullName}! Gostaríamos de entrar em contato com você sobre o consórcio.`)
    const whatsappUrl = `https://wa.me/${lead.whatsapp.replace(/\D/g, '')}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  const handleEmail = (lead: Lead) => {
    if (lead.email) {
      const subject = encodeURIComponent('Contato sobre Consórcio')
      const body = encodeURIComponent(`Olá ${lead.fullName},\n\nGostaríamos de entrar em contato com você sobre o consórcio.\n\nAtenciosamente,\nEquipe Consórcio União`)
      window.location.href = `mailto:${lead.email}?subject=${subject}&body=${body}`
    }
  }

  const handleViewDetails = (lead: Lead) => {
    setSelectedLead(lead)
    setShowDetailsModal(true)
  }

  const handleEdit = (lead: Lead) => {
    setSelectedLead(lead)
    setEditForm({
      fullName: lead.fullName,
      whatsapp: lead.whatsapp,
      instagram: lead.instagram || '',
      email: lead.email || '',
      status: lead.status
    })
    setShowEditModal(true)
  }

  const handleSaveEdit = () => {
    if (selectedLead) {
      updateLead(selectedLead.id, editForm)
      setShowEditModal(false)
      setSelectedLead(null)
    }
  }

  const handleStatusChange = (lead: Lead, status: LeadStatus) => {
    updateLead(lead.id, { status })
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
            value={filterCampaign}
            onChange={(e) => setFilterCampaign(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
          >
            <option value="">Todas as campanhas</option>
            {campaigns.map((campaign: Campaign) => (
              <option key={campaign.id} value={campaign.id}>
                {campaign.title}
              </option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as LeadStatus | '')}
            className="px-4 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
          >
            <option value="">Todos os status</option>
            {Object.entries(STATUS_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Nome</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">WhatsApp</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600 hidden md:table-cell">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600 hidden lg:table-cell">Campanha</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600 hidden xl:table-cell">Data</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">Ações</th>
              </tr>
            </thead>
            <tbody>
              {currentLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    Nenhum lead encontrado
                  </td>
                </tr>
              ) : (
                currentLeads.map((lead: Lead, index: number) => (
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
                    <td className="py-4 px-4 hidden md:table-cell">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[lead.status]}`}>
                        {STATUS_LABELS[lead.status]}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-700 hidden lg:table-cell">
                      {getCampaignTitle(lead.campaignId)}
                    </td>
                    <td className="py-4 px-4 text-slate-500 text-sm hidden xl:table-cell">
                      {formatDate(lead.createdAt)}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewDetails(lead)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Ver detalhes"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        
                        <button
                          onClick={() => handleWhatsApp(lead)}
                          className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                          title="Contatar via WhatsApp"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                        </button>
                        
                        {lead.email && (
                          <button
                            onClick={() => handleEmail(lead)}
                            className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                            title="Enviar e-mail"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </button>
                        )}
                        
                        <button
                          onClick={() => handleEdit(lead)}
                          className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                          title="Editar"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        
                        <div className="relative group">
                          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all" title="Alterar status">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                          </button>
                          <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-xl shadow-lg border border-slate-200 py-2 hidden group-hover:block z-50">
                            {(Object.entries(STATUS_LABELS) as [LeadStatus, string][]).map(([status, label]) => (
                              <button
                                key={status}
                                onClick={() => handleStatusChange(lead, status)}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${lead.status === status ? 'font-semibold text-blue-600' : 'text-slate-700'}`}
                              >
                                {label}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => deleteLead(lead.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Excluir"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
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
        )}
      </div>

      <AnimatePresence>
        {showDetailsModal && selectedLead && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
            >
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Detalhes do Lead</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {selectedLead.fullName[0]}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{selectedLead.fullName}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[selectedLead.status]}`}>
                      {STATUS_LABELS[selectedLead.status]}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-700">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{selectedLead.whatsapp}</span>
                  </div>
                  {selectedLead.email && (
                    <div className="flex items-center gap-3 text-slate-700">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>{selectedLead.email}</span>
                    </div>
                  )}
                  {selectedLead.instagram && (
                    <div className="flex items-center gap-3 text-slate-700">
                      <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      <span>{selectedLead.instagram}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-slate-700">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{formatDate(selectedLead.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span>{getCampaignTitle(selectedLead.campaignId)}</span>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Fechar
                </button>
                <button
                  onClick={() => {
                    setShowDetailsModal(false)
                    handleEdit(selectedLead)
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Editar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEditModal && selectedLead && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
            >
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Editar Lead</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nome completo</label>
                  <input
                    type="text"
                    value={editForm.fullName}
                    onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp</label>
                  <input
                    type="text"
                    value={editForm.whatsapp}
                    onChange={(e) => setEditForm({ ...editForm, whatsapp: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Instagram</label>
                  <input
                    type="text"
                    value={editForm.instagram}
                    onChange={(e) => setEditForm({ ...editForm, instagram: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value as LeadStatus })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
                  >
                    {(Object.entries(STATUS_LABELS) as [LeadStatus, string][]).map(([status, label]) => (
                      <option key={status} value={status}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Salvar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
