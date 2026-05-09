import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { leadFormSchema, type LeadFormData } from '../lib/validations'

export function RaffleFormPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

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
    },
  })

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true)
    
    setTimeout(() => {
      console.log('Dados do formulário:', data)
      setIsSubmitting(false)
      setIsSuccess(true)
      reset()
      
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-500/30">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Sorteio Especial</h1>
          <p className="text-xl text-emerald-400 font-semibold mb-2">Data: 09 de Maio de 2026</p>
          <p className="text-slate-400">Preencha o formulário para participar</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl">
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
                Você já está participando do nosso sorteio de hoje!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
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

              <div>
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
        </div>
      </motion.div>
    </div>
  )
}
