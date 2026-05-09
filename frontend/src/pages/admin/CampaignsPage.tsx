import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore, type AppState, type Lead, type Campaign } from '../../lib/store'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const campaignSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  eventName: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

type CampaignFormData = z.infer<typeof campaignSchema>

export function CampaignsPage() {
  const campaigns = useAppStore((state: AppState) => state.campaigns)
  const leads = useAppStore((state: AppState) => state.leads)
  const addCampaign = useAppStore((state: AppState) => state.addCampaign)
  const updateCampaign = useAppStore((state: AppState) => state.updateCampaign)
  const deleteCampaign = useAppStore((state: AppState) => state.deleteCampaign)
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCampaign, setEditingCampaign] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
  })

  const getLeadsCount = (campaignId: string) => {
    return leads.filter((l: Lead) => l.campaignId === campaignId).length
  }

  const onSubmit = (data: CampaignFormData) => {
    if (editingCampaign) {
      updateCampaign(editingCampaign, { ...data, active: true })
    } else {
      addCampaign({ ...data, active: true })
    }
    setIsModalOpen(false)
    setEditingCampaign(null)
    reset()
  }

  const handleEdit = (campaignId: string) => {
    const campaign = campaigns.find((c: Campaign) => c.id === campaignId)
    if (campaign) {
      setEditingCampaign(campaignId)
      reset({
        title: campaign.title,
        eventName: campaign.eventName,
        startDate: campaign.startDate,
        endDate: campaign.endDate,
      })
      setIsModalOpen(true)
    }
  }

  const toggleActive = (campaignId: string) => {
    const campaign = campaigns.find((c: Campaign) => c.id === campaignId)
    if (campaign) {
      updateCampaign(campaignId, { active: !campaign.active })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Campanhas</h1>
          <p className="text-slate-500">Gerencie todas as campanhas de sorteio</p>
        </div>
        <button 
          onClick={() => {
            setEditingCampaign(null)
            reset()
            setIsModalOpen(true)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nova Campanha
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign: Campaign, index: number) => (
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
                  {campaign.eventName && <p className="text-sm text-slate-500">{campaign.eventName}</p>}
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${
                  campaign.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  {campaign.active ? 'Ativa' : 'Inativa'}
                </span>
              </div>
              <div className="space-y-3 mb-6">
                {(campaign.startDate || campaign.endDate) && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Período</span>
                    <span className="text-slate-700 font-medium">
                      {campaign.startDate || '-'} a {campaign.endDate || '-'}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Leads Capturados</span>
                  <span className="text-slate-700 font-bold text-lg">{getLeadsCount(campaign.id)}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => toggleActive(campaign.id)}
                  className="flex-1 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-all text-sm font-medium"
                >
                  {campaign.active ? 'Desativar' : 'Ativar'}
                </button>
                <button 
                  onClick={() => handleEdit(campaign.id)}
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  title="Editar"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button 
                  onClick={() => deleteCampaign(campaign.id)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  title="Excluir"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
          >
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">
                  {editingCampaign ? 'Editar Campanha' : 'Nova Campanha'}
                </h2>
                <button 
                  onClick={() => {
                    setIsModalOpen(false)
                    setEditingCampaign(null)
                    reset()
                  }}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Título *</label>
                <input
                  type="text"
                  {...register('title')}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
                  placeholder="Título da campanha"
                />
                {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Nome do Evento</label>
                <input
                  type="text"
                  {...register('eventName')}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
                  placeholder="Nome do evento"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Data Início</label>
                  <input
                    type="date"
                    {...register('startDate')}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Data Fim</label>
                  <input
                    type="date"
                    {...register('endDate')}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false)
                    setEditingCampaign(null)
                    reset()
                  }}
                  className="flex-1 py-2 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all font-semibold"
                >
                  {editingCampaign ? 'Salvar' : 'Criar'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
