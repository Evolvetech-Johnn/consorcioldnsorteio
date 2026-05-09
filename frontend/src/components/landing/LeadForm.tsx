import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { leadFormSchema, type LeadFormData } from '../../lib/validations'
import { useAppStore, type AppState, type Campaign } from '../../lib/store'

export function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const addLead = useAppStore((state: AppState) => state.addLead)
  const campaigns = useAppStore((state: AppState) => state.campaigns)

  const getDefaultCampaignId = () => {
    return campaigns.length > 0 ? campaigns[0].id : ''
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      fullName: '',
      whatsapp: '',
      instagram: '',
      email: '',
      campaignId: getDefaultCampaignId(),
    },
  })

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true)
    
    setTimeout(() => {
      addLead(data)
      setIsSubmitting(false)
      setIsSuccess(true)
      reset({
        fullName: '',
        whatsapp: '',
        instagram: '',
        email: '',
        campaignId: getDefaultCampaignId(),
      })
      
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    }, 1500)
  }

  return (
    <section id="form" className="py-24 bg-gradient-to-br from-blue-900 to-slate-900">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-semibold mb-4">
            Participe agora
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Garanta a sua participação
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Preencha o formulário abaixo e concorra ao nosso sorteio. É rápido, seguro e só leva menos de 2 minutos.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl"
        >
          {isSuccess ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                Cadastro realizado com sucesso!
              </h3>
              <p className="text-slate-600 text-lg mb-8">
                Você já está participando do nosso sorteio. Em breve entraremos em contato com mais informações.
              </p>
            </div>
          ) : (
            <form key={campaigns.length} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {campaigns.length > 0 && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Campanha <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register('campaignId')}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
                    >
                      {campaigns.map((campaign: Campaign) => (
                        <option key={campaign.id} value={campaign.id}>
                          {campaign.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Nome completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('fullName')}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.fullName ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'
                    } focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all`}
                    placeholder="Digite seu nome completo"
                  />
                  {errors.fullName && (
                    <p className="mt-2 text-sm text-red-500">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    {...register('whatsapp')}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.whatsapp ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'
                    } focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all`}
                    placeholder="(00) 00000-0000"
                  />
                  {errors.whatsapp && (
                    <p className="mt-2 text-sm text-red-500">{errors.whatsapp.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Instagram <span className="text-slate-400 text-xs">(opcional)</span>
                  </label>
                  <input
                    type="text"
                    {...register('instagram')}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
                    placeholder="@seu_usuario"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    E-mail <span className="text-slate-400 text-xs">(opcional)</span>
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.email ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'
                    } focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all`}
                    placeholder="seu@email.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-lg rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processando...
                  </>
                ) : (
                  <>
                    Confirmar Participação
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </motion.button>

              <p className="text-center text-sm text-slate-500">
                Ao se cadastrar, você concorda com nossos{' '}
                <a href="#" className="text-blue-600 hover:underline">Termos de Uso</a> e{' '}
                <a href="#" className="text-blue-600 hover:underline">Política de Privacidade</a>.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
