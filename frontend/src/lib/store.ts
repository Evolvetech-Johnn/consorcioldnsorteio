import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface Lead {
  id: string
  fullName: string
  whatsapp: string
  instagram?: string
  email?: string
  campaignId?: string
  consultantId?: string
  createdAt: string
}

export interface Campaign {
  id: string
  title: string
  eventName?: string
  active: boolean
  startDate?: string
  endDate?: string
  consultantId?: string
  createdAt: string
}

export interface Raffle {
  id: string
  title: string
  campaignId?: string
  winnerLeadId?: string
  createdAt: string
}

interface AppState {
  leads: Lead[]
  campaigns: Campaign[]
  raffles: Raffle[]
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void
  updateLead: (id: string, lead: Partial<Lead>) => void
  deleteLead: (id: string) => void
  addCampaign: (campaign: Omit<Campaign, 'id' | 'createdAt'>) => void
  updateCampaign: (id: string, campaign: Partial<Campaign>) => void
  deleteCampaign: (id: string) => void
  addRaffle: (raffle: Omit<Raffle, 'id' | 'createdAt'>) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      leads: [
        {
          id: '1',
          fullName: 'João Silva',
          whatsapp: '(11) 98765-4321',
          instagram: '@joaosilva',
          email: 'joao@email.com',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          fullName: 'Maria Santos',
          whatsapp: '(21) 99876-5432',
          instagram: '@mariasantos',
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          fullName: 'Pedro Oliveira',
          whatsapp: '(31) 91234-5678',
          email: 'pedro@email.com',
          createdAt: new Date().toISOString()
        }
      ],
      campaigns: [
        {
          id: '1',
          title: 'Sorteio Especial de Maio',
          eventName: 'Evento de Lançamento',
          active: true,
          createdAt: new Date().toISOString()
        }
      ],
      raffles: [],
      
      addLead: (lead) =>
        set((state) => ({
          leads: [
            ...state.leads,
            {
              ...lead,
              id: Date.now().toString(),
              createdAt: new Date().toISOString()
            }
          ]
        })),
        
      updateLead: (id, lead) =>
        set((state) => ({
          leads: state.leads.map((l) => (l.id === id ? { ...l, ...lead } : l))
        })),
        
      deleteLead: (id) =>
        set((state) => ({
          leads: state.leads.filter((l) => l.id !== id)
        })),
        
      addCampaign: (campaign) =>
        set((state) => ({
          campaigns: [
            ...state.campaigns,
            {
              ...campaign,
              id: Date.now().toString(),
              createdAt: new Date().toISOString()
            }
          ]
        })),
        
      updateCampaign: (id, campaign) =>
        set((state) => ({
          campaigns: state.campaigns.map((c) => (c.id === id ? { ...c, ...campaign } : c))
        })),
        
      deleteCampaign: (id) =>
        set((state) => ({
          campaigns: state.campaigns.filter((c) => c.id !== id)
        })),
        
      addRaffle: (raffle) =>
        set((state) => ({
          raffles: [
            ...state.raffles,
            {
              ...raffle,
              id: Date.now().toString(),
              createdAt: new Date().toISOString()
            }
          ]
        }))
    }),
    {
      name: 'consorcio-uniao-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
