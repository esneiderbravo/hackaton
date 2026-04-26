'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

const CATEGORIES = ['Todos', 'Alimentos', 'Transporte', 'Comercio', 'Servicios', 'Manufactura', 'Tecnología']

const MOCK_BUSINESSES = [
  {
    id: 1,
    nombre_negocio: 'Panadería El Trigal',
    servicios_ofrecidos: 'Fabricación y venta de pan artesanal, tortas personalizadas y repostería para eventos empresariales',
    ciudad: 'Cali',
    categoria: 'Alimentos',
    sinergias: ['En tu ciudad', 'Sector complementario'],
  },
  {
    id: 2,
    nombre_negocio: 'Transportes Veloz',
    servicios_ofrecidos: 'Servicio de transporte de carga ligera y mensajería a domicilio en toda la ciudad',
    ciudad: 'Cali',
    categoria: 'Transporte',
    sinergias: ['En tu ciudad', 'Alianza logística'],
  },
  {
    id: 3,
    nombre_negocio: 'Costurero La Moda',
    servicios_ofrecidos: 'Confección de ropa a medida, arreglos y uniformes corporativos para empresas locales',
    ciudad: 'Cali',
    categoria: 'Manufactura',
    sinergias: ['En tu ciudad', 'Sector complementario'],
  },
  {
    id: 4,
    nombre_negocio: 'Verduras y Frutas Fresh',
    servicios_ofrecidos: 'Distribución mayorista y minorista de frutas y verduras frescas directamente de agricultores',
    ciudad: 'Cali',
    categoria: 'Alimentos',
    sinergias: ['En tu ciudad', 'Cadena de valor'],
  },
  {
    id: 5,
    nombre_negocio: 'Ferretería Los Maestros',
    servicios_ofrecidos: 'Venta de materiales de construcción, herramientas y acabados para obras civiles y residenciales',
    ciudad: 'Cali',
    categoria: 'Comercio',
    sinergias: ['En tu ciudad', 'Sector complementario'],
  },
  {
    id: 6,
    nombre_negocio: 'Estudio Creativo Digital',
    servicios_ofrecidos: 'Diseño de logos, branding, material publicitario y presencia digital para pequeños negocios',
    ciudad: 'Cali',
    categoria: 'Tecnología',
    sinergias: ['En tu ciudad', 'Potencia tu marca'],
  },
  {
    id: 7,
    nombre_negocio: 'Cafetería Central',
    servicios_ofrecidos: 'Venta de café de origen, desayunos y almuerzos ejecutivos para empresas y negocios del sector',
    ciudad: 'Cali',
    categoria: 'Alimentos',
    sinergias: ['En tu ciudad', 'Beneficio para empleados'],
  },
  {
    id: 8,
    nombre_negocio: 'Servicios Contables SAS',
    servicios_ofrecidos: 'Contabilidad, declaración de renta y asesoría financiera para emprendedores y pequeñas empresas',
    ciudad: 'Cali',
    categoria: 'Servicios',
    sinergias: ['En tu ciudad', 'Fortalece tu negocio'],
  },
]

export function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [searchQuery, setSearchQuery] = useState('')
  const [connectedIds, setConnectedIds] = useState<Set<number>>(new Set())
  const { user, signOut } = useAuth()

  const handleConnect = (id: number) => {
    setConnectedIds(prev => new Set([...prev, id]))
  }

  const filteredBusinesses = MOCK_BUSINESSES.filter(b => {
    const matchesCategory = selectedCategory === 'Todos' || b.categoria === selectedCategory
    const matchesSearch =
      searchQuery === '' ||
      b.nombre_negocio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.servicios_ofrecidos.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const activeAlliances = MOCK_BUSINESSES.filter(b => connectedIds.has(b.id))

  const userName =
    user?.user_metadata?.nombre_emprendedor ??
    user?.email?.split('@')[0] ??
    'Emprendedor'

  const businessName = user?.user_metadata?.nombre_negocio ?? 'Tu negocio'

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] min-h-screen font-['Inter'] font-sans selection:bg-[#00685f] selection:text-white">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm fixed top-0 left-0 right-0 z-40">
        <div className="relative flex items-center px-3 h-16 w-full max-w-2xl mx-auto">
          <div className="shrink-0 w-10 h-10" />
          <h1 className="absolute inset-x-0 text-center font-['Inter'] text-2xl font-black tracking-tight text-slate-900 pointer-events-none">
            Conexiones Ruta C
          </h1>
          <Link
            href="/profile"
            className="ml-auto shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-[#00685f]/10 text-[#00685f] hover:bg-[#00685f]/20 active:bg-[#00685f]/30 transition-colors z-10"
            aria-label="Mi perfil"
          >
            <span className="material-symbols-outlined text-xl">person</span>
          </Link>
        </div>
      </header>

      <main className="pt-16 pb-12 w-full max-w-2xl mx-auto">
        {/* Welcome Banner — edge to edge */}
        <div className="bg-gradient-to-br from-[#00685f] to-[#00897b] text-white px-5 pt-7 pb-6">
          <p className="text-xs font-semibold uppercase tracking-widest opacity-70 mb-1">Bienvenido de vuelta</p>
          <h2 className="text-2xl font-extrabold tracking-tight leading-tight">
            Hola, {userName} 👋
          </h2>
          <p className="text-sm opacity-70 mt-1 font-medium">{businessName}</p>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <div className="bg-white/15 rounded-xl p-3 text-center">
              <p className="text-2xl font-black">{MOCK_BUSINESSES.length}</p>
              <p className="text-xs opacity-80 mt-0.5 leading-tight">Negocios<br />disponibles</p>
            </div>
            <div className="bg-white/15 rounded-xl p-3 text-center">
              <p className="text-2xl font-black">{activeAlliances.length}</p>
              <p className="text-xs opacity-80 mt-0.5 leading-tight">Alianzas<br />activas</p>
            </div>
            <div className="bg-white/15 rounded-xl p-3 text-center">
              <p className="text-2xl font-black">0</p>
              <p className="text-xs opacity-80 mt-0.5 leading-tight">Solicitudes<br />pendientes</p>
            </div>
          </div>
        </div>

        <div className="px-4 space-y-6 mt-6">
          {/* Search */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6d7a77] text-xl select-none pointer-events-none">
              search
            </span>
            <input
              type="search"
              placeholder="Buscar por nombre o servicio..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-11 pr-4 text-sm rounded-xl border border-[#bcc9c6] bg-white focus:border-[#00685f] focus:ring-4 focus:ring-[#00685f]/10 transition-all outline-none"
            />
          </div>

          {/* Category chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 h-8 px-4 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#00685f] text-white shadow-sm'
                    : 'bg-white border border-[#bcc9c6] text-[#6d7a77] hover:border-[#00685f] hover:text-[#00685f]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Suggested connections */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-extrabold text-[#131b2e]">Conexiones sugeridas</h3>
              <span className="text-xs text-[#6d7a77]">{filteredBusinesses.length} negocios</span>
            </div>

            {filteredBusinesses.length === 0 ? (
              <div className="bg-white border border-[#bcc9c6] rounded-2xl p-8 text-center">
                <span className="material-symbols-outlined text-4xl text-[#bcc9c6]">search_off</span>
                <p className="mt-2 text-sm text-[#6d7a77]">No se encontraron negocios con ese criterio</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredBusinesses.map(business => (
                  <BusinessCard
                    key={business.id}
                    business={business}
                    isConnected={connectedIds.has(business.id)}
                    onConnect={() => handleConnect(business.id)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Active alliances */}
          {activeAlliances.length > 0 && (
            <section>
              <h3 className="text-base font-extrabold text-[#131b2e] mb-3">Mis alianzas activas</h3>
              <div className="space-y-2">
                {activeAlliances.map(business => (
                  <div
                    key={business.id}
                    className="bg-white border border-[#00685f]/30 rounded-2xl p-4 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#00685f]/10 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[#00685f] text-xl">handshake</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-[#131b2e] truncate">{business.nombre_negocio}</p>
                      <p className="text-xs text-[#6d7a77]">Alianza activa · {business.ciudad}</p>
                    </div>
                    <span className="material-symbols-outlined text-[#00685f] text-xl">check_circle</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* How alliances work */}
          <section className="bg-white border border-[#bcc9c6] rounded-2xl p-5">
            <h3 className="font-extrabold text-sm text-[#131b2e] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00685f] text-xl">info</span>
              ¿Cómo funciona una alianza?
            </h3>
            <div className="space-y-3">
              {[
                { icon: 'search', label: 'Explora', text: 'Encuentra negocios complementarios al tuyo' },
                { icon: 'handshake', label: 'Conecta', text: 'Envía una solicitud de conexión' },
                { icon: 'trending_up', label: 'Crece', text: 'Colaboren para mejorar su competitividad' },
              ].map(({ icon, label, text }) => (
                <div key={icon} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#00685f]/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[#00685f] text-base">{icon}</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#131b2e]">{label}</p>
                    <p className="text-xs text-[#6d7a77]">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Invite CTA */}
          <button
            className="w-full p-4 bg-[#f0fdfa] border border-[#ccfbf1] rounded-2xl flex gap-4 items-center text-left active:bg-[#ccfbf1] transition-colors"
            type="button"
          >
            <div className="bg-[#0d9488] w-10 h-10 shrink-0 rounded-full text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">person_add</span>
            </div>
            <div className="flex-1">
              <p className="text-[#134e4a] font-bold text-sm">¿Conoces un negocio que debería estar aquí?</p>
              <p className="text-[#0f766e] text-xs">Invítalo a Conexiones Ruta C</p>
            </div>
            <span className="material-symbols-outlined text-[#2dd4bf]">chevron_right</span>
          </button>

          {/* Sign out */}
          <button
            onClick={signOut}
            className="w-full h-11 rounded-xl border border-[#bcc9c6] text-[#6d7a77] text-sm font-medium hover:border-[#ba1a1a] hover:text-[#ba1a1a] transition-colors"
            type="button"
          >
            Cerrar sesión
          </button>
        </div>
      </main>
    </div>
  )
}

type Business = (typeof MOCK_BUSINESSES)[0]

function BusinessCard({
  business,
  isConnected,
  onConnect,
}: {
  business: Business
  isConnected: boolean
  onConnect: () => void
}) {
  return (
    <div
      className={`bg-white border rounded-2xl p-4 shadow-sm transition-all ${
        isConnected ? 'border-[#00685f]/40 shadow-[#00685f]/10' : 'border-[#bcc9c6]'
      }`}
    >
      <div className="flex items-start gap-3 mb-2">
        <div className="w-11 h-11 rounded-full bg-[#00685f]/10 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[#00685f] text-xl">storefront</span>
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <p className="font-extrabold text-sm text-[#131b2e] truncate">{business.nombre_negocio}</p>
          <p className="text-xs text-[#6d7a77]">{business.ciudad} · {business.categoria}</p>
        </div>
        {isConnected && (
          <span className="shrink-0 flex items-center gap-1 text-xs font-semibold text-[#00685f] bg-[#00685f]/10 px-2 py-1 rounded-full">
            <span className="material-symbols-outlined text-sm">check</span>
            Conectado
          </span>
        )}
      </div>

      <p className="text-sm text-[#6d7a77] line-clamp-2 mb-3">{business.servicios_ofrecidos}</p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {business.sinergias.map(tag => (
          <span
            key={tag}
            className="text-xs bg-[#f0fdfa] text-[#00685f] border border-[#ccfbf1] px-2.5 py-0.5 rounded-full font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {isConnected ? (
        <button className="w-full h-10 rounded-xl border border-[#00685f]/30 text-[#00685f] text-sm font-bold hover:bg-[#00685f]/5 transition-colors">
          Ver perfil
        </button>
      ) : (
        <div className="flex gap-2">
          <button className="flex-1 h-10 rounded-xl border border-[#00685f] text-[#00685f] text-sm font-bold hover:bg-[#00685f]/5 transition-colors">
            Ver perfil
          </button>
          <button
            onClick={onConnect}
            className="flex-1 h-10 rounded-xl bg-[#fd761a] text-white text-sm font-bold hover:bg-[#e86a15] active:scale-[0.98] transition-all shadow-sm"
          >
            Conectar
          </button>
        </div>
      )}
    </div>
  )
}
