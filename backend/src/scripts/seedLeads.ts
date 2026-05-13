import {
  createCampaign,
  createLead,
  getCampaigns,
} from '../data/store'

const leadNames = [
  'Ana Clara Silva',
  'Bruno Souza',
  'Carla Pereira',
  'Diego Oliveira',
  'Eduarda Costa',
  'Felipe Martins',
  'Gabriela Lima',
  'Hugo Fernandes',
  'Isabela Rocha',
  'João Victor',
  'Karina Ribeiro',
  'Lucas Almeida',
  'Mariana Santos',
  'Nicolas Carvalho',
  'Olívia Nunes',
  'Pedro Azevedo',
  'Queila Barbosa',
  'Rafael Melo',
  'Sofia Duarte',
  'Thiago Gomes',
]

function randomWhatsapp() {
  const prefix = '11'
  const suffix = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('')
  return `${prefix}${suffix}`
}

function randomInstagram(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 10)
}

function randomEmail(name: string) {
  const clean = name.toLowerCase().replace(/[^a-z0-9]/g, '.')
  return `${clean}@example.com`
}

async function run() {
  const activeCampaign = getCampaigns(true)[0]

  const campaign = activeCampaign ?? createCampaign({
    name: 'Campanha para Sorteio',
    description: 'Campanha criada automaticamente para teste de leads e sorteio',
    isActive: true,
  })

  if (activeCampaign) {
    console.log('🔹 Campanha existente usada:', campaign.id)
  } else {
    console.log('🔹 Campanha criada:', campaign.id)
  }

  const inserted = leadNames.map((name) => createLead({
    fullName: name,
    whatsapp: randomWhatsapp(),
    instagram: `@${randomInstagram(name)}`,
    email: randomEmail(name),
    campaignId: campaign.id,
    status: 'new',
  }))

  console.log(`✅ Inseridos ${inserted.length} leads na campanha ${campaign.id}`)
}

run().catch((error) => {
  console.error('❌ Erro ao inserir leads:', error)
  process.exit(1)
})
