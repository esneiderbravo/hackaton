'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const onboardingSchema = z.object({
  nombre_emprendedor: z.string().min(2, 'El nombre es muy corto'),
  celular_contacto: z.string().min(10, 'El teléfono debe tener 10 dígitos'),
  nombre_negocio: z.string().min(2, 'El nombre del negocio es muy corto'),
  servicios_ofrecidos: z.string().min(5, 'Por favor describe tus servicios'),
  nit: z.string().optional(),
  ciudad: z.string().optional(),
  ubicacion: z.string().optional(),
  empleados: z.string().optional(),
})

type OnboardingFormData = z.infer<typeof onboardingSchema>

export function BusinessOnboardingForm() {
  const [isAdditionalInfoOpen, setIsAdditionalInfoOpen] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
  })

  const onSubmit = (data: OnboardingFormData) => {
    console.log('Form data:', data)
    alert('Continuando al paso 2...')
  }

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] min-h-screen font-['Inter'] font-sans selection:bg-[#00685f] selection:text-white pb-16 lg:pb-0 w-full flex flex-col absolute top-0 left-0 right-0 z-50">
      {/* TopAppBar */}
      <header className="bg-white border-b border-slate-200 shadow-sm top-0 z-40 fixed left-0 right-0">
        <div className="flex items-center justify-between px-4 h-16 w-full max-w-[1280px] mx-auto">
          <div className="flex items-center gap-3">
            <button className="text-slate-900 active:bg-slate-100 p-2 rounded-full transition-all lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h1 className="font-['Inter'] text-base font-bold tracking-tight text-slate-900 truncate max-w-[180px]">Conexiones Ruta C</h1>
          </div>
          <div className="flex items-center">
            <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
              <img alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0IuwcBXWV4BU3ocqqcIphbgnJzXUN8BWP_tS3nuTYa0hUQ3S_Moe4CKDkR9ltGsaDYQo_R_D1M-H_7G5KFHqV5inmuThJ9PiopmMJwLTnmCunuhdPB_-NsD56w7Qnqci98rw-Z7ZrzSIPi_YdlXYBBdEtPITjVGGU58QXBBphev7bM1C8Apq0OS32PMJGkOqE0aYYRZ4qTVEH-fGA3hgRSX6NPMjKNUv7FWODS6z5af6BnRRbwQFTy9N4nMuO0j0GGNKkrULobpTN"/>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex min-h-screen pt-16 relative">
        {/* NavigationDrawer (Hidden on mobile) */}
        <aside className="fixed left-0 top-0 hidden lg:flex flex-col h-full z-50 bg-white w-64 border-r border-slate-200">
          <div className="text-xl font-black text-[#0d9488] p-6 mt-16">Ruta C Dashboard</div>
          <nav className="flex-1 px-3 py-4 space-y-1">
            <a className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-[#0d9488] transition-colors duration-200 rounded-lg" href="#">
              <span className="material-symbols-outlined">home</span>
              <span className="font-['Inter'] text-sm font-medium">Inicio</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 bg-slate-50 text-[#0d9488] border-r-4 border-[#0d9488]" href="#">
              <span className="material-symbols-outlined">person</span>
              <span className="font-['Inter'] text-sm font-medium">Perfil</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-[#0d9488] transition-colors duration-200 rounded-lg" href="#">
              <span className="material-symbols-outlined">auto_awesome</span>
              <span className="font-['Inter'] text-sm font-medium">Sugerencias</span>
            </a>
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 w-full lg:ml-64 p-4 pb-24 md:p-12 relative z-0">
          <div className="max-w-2xl mx-auto">
            {/* Mobile Progress Indicator */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00685f]">Paso 1 de 2</span>
                <span className="text-xs text-[#6d7a77]">Datos Básicos</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#00685f] h-full w-1/2 rounded-full"></div>
              </div>
            </div>
            {/* Simplified Progress Header */}
            <div className="mb-8 text-left">
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#131b2e] mb-2 tracking-tight">Regístrate en un minuto</h2>
              <p className="text-base text-[#6d7a77] font-medium leading-relaxed">Solo necesitamos unos datos básicos para empezar a conectar tu negocio.</p>
            </div>
            
            {/* Simplified Form Card */}
            <div className="bg-white border border-[#bcc9c6] rounded-2xl shadow-sm p-5 md:p-10">
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {/* Main Fields */}
                <div className="space-y-6">
                  {/* Entrepreneur Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-[#131b2e]" htmlFor="nombre_emprendedor">
                      Nombre del emprendedor <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <input 
                      {...register('nombre_emprendedor')}
                      className={`w-full h-12 px-4 text-base rounded-xl border ${errors.nombre_emprendedor ? 'border-[#ba1a1a]' : 'border-[#bcc9c6]'} focus:border-[#00685f] focus:ring-4 focus:ring-[#00685f]/10 transition-all bg-slate-50/30 outline-none`} 
                      id="nombre_emprendedor" 
                      placeholder="Tu nombre completo" 
                      type="text"
                    />
                    {errors.nombre_emprendedor && <p className="text-xs text-[#ba1a1a] font-medium">{errors.nombre_emprendedor.message}</p>}
                  </div>
                  
                  {/* Contact Phone */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-[#131b2e]" htmlFor="celular_contacto">
                      Celular del contacto <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6d7a77] font-bold text-sm">+57</span>
                      <input 
                        {...register('celular_contacto')}
                        className={`w-full h-12 pl-12 pr-4 text-base rounded-xl border ${errors.celular_contacto ? 'border-[#ba1a1a]' : 'border-[#bcc9c6]'} focus:border-[#00685f] focus:ring-4 focus:ring-[#00685f]/10 transition-all bg-slate-50/30 outline-none`} 
                        id="celular_contacto" 
                        placeholder="300 123 4567" 
                        type="tel"
                      />
                    </div>
                    {errors.celular_contacto && <p className="text-xs text-[#ba1a1a] font-medium">{errors.celular_contacto.message}</p>}
                  </div>
                  
                  {/* Business Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-[#131b2e]" htmlFor="nombre_negocio">
                      Nombre del negocio <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <input 
                      {...register('nombre_negocio')}
                      className={`w-full h-12 px-4 text-base rounded-xl border ${errors.nombre_negocio ? 'border-[#ba1a1a]' : 'border-[#bcc9c6]'} focus:border-[#00685f] focus:ring-4 focus:ring-[#00685f]/10 transition-all bg-slate-50/30 outline-none`} 
                      id="nombre_negocio" 
                      placeholder="Ej. Panadería La Esperanza" 
                      type="text"
                    />
                    {errors.nombre_negocio && <p className="text-xs text-[#ba1a1a] font-medium">{errors.nombre_negocio.message}</p>}
                  </div>
                  
                  {/* Services/Products */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-[#131b2e]" htmlFor="servicios_ofrecidos">
                      ¿Qué servicios o productos ofrece? <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <textarea 
                      {...register('servicios_ofrecidos')}
                      className={`w-full px-4 py-3 text-base rounded-xl border ${errors.servicios_ofrecidos ? 'border-[#ba1a1a]' : 'border-[#bcc9c6]'} focus:border-[#00685f] focus:ring-4 focus:ring-[#00685f]/10 transition-all bg-slate-50/30 min-h-[100px] outline-none`} 
                      id="servicios_ofrecidos" 
                      placeholder="Cuéntanos qué vendes o qué haces..."
                    ></textarea>
                    {errors.servicios_ofrecidos && <p className="text-xs text-[#ba1a1a] font-medium">{errors.servicios_ofrecidos.message}</p>}
                  </div>
                </div>
                
                {/* Accordion: Additional Info */}
                <details 
                  className="group border border-[#bcc9c6] rounded-xl overflow-hidden bg-slate-50/30"
                  open={isAdditionalInfoOpen}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsAdditionalInfoOpen(!isAdditionalInfoOpen);
                  }}
                >
                  <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors min-h-[56px] outline-none">
                    <span className="font-bold text-[#00685f] flex items-center gap-2 text-sm">
                      <span className="material-symbols-outlined text-xl">add_circle</span>
                      Información Adicional (Opcional)
                    </span>
                    <span className={`material-symbols-outlined transition-transform ${isAdditionalInfoOpen ? 'rotate-180' : ''}`}>expand_more</span>
                  </summary>
                  {isAdditionalInfoOpen && (
                    <div className="p-4 pt-2 space-y-4 bg-white border-t border-[#bcc9c6]" onClick={(e) => e.stopPropagation()}>
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-[#131b2e]" htmlFor="nit">NIT / Cédula</label>
                        <input {...register('nit')} className="w-full h-11 px-4 text-sm rounded-lg border border-[#bcc9c6] bg-white outline-none" id="nit" type="text"/>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-[#131b2e]" htmlFor="ciudad">Ciudad</label>
                        <input {...register('ciudad')} className="w-full h-11 px-4 text-sm rounded-lg border border-[#bcc9c6] bg-white outline-none" id="ciudad" type="text"/>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-[#131b2e]" htmlFor="ubicacion">Ubicación del negocio</label>
                        <input {...register('ubicacion')} className="w-full h-11 px-4 text-sm rounded-lg border border-[#bcc9c6] bg-white outline-none" id="ubicacion" placeholder="Ej. Calle 10 # 5-20" type="text"/>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-[#131b2e]" htmlFor="empleados">Cantidad de empleados</label>
                        <input {...register('empleados')} className="w-full h-11 px-4 text-sm rounded-lg border border-[#bcc9c6] bg-white outline-none" id="empleados" min="0" placeholder="0" type="number"/>
                      </div>
                    </div>
                  )}
                </details>
                
                {/* Action Buttons */}
                <div className="flex flex-col gap-3 pt-4">
                  <button className="w-full h-14 bg-[#fd761a] text-white text-base font-bold rounded-xl shadow-sm hover:shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2" type="submit">
                    Continuar Registro
                    <span className="material-symbols-outlined text-xl">arrow_forward</span>
                  </button>
                  <button className="w-full h-12 bg-white text-[#00685f] border border-[#00685f] font-bold rounded-xl active:bg-slate-50 transition-all flex items-center justify-center gap-2 text-sm" type="button">
                    <span className="material-symbols-outlined text-lg">save</span>
                    Guardar para después
                  </button>
                </div>
              </form>
            </div>
            
            {/* Accessibility/Help Section - Mobile Optimized */}
            <button className="w-full mt-6 p-4 bg-[#f0fdfa] border border-[#ccfbf1] rounded-2xl flex gap-4 items-center text-left active:bg-[#ccfbf1] transition-colors" type="button">
              <div className="bg-[#0d9488] w-10 h-10 shrink-0 rounded-full text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">call</span>
              </div>
              <div className="flex-1">
                <p className="text-[#134e4a] font-bold text-sm">¿Necesitas ayuda?</p>
                <p className="text-[#0f766e] text-xs">Llámanos al <span className="font-black">01-8000-123456</span></p>
              </div>
              <span className="material-symbols-outlined text-[#2dd4bf]">chevron_right</span>
            </button>
          </div>
        </main>
      </div>
      
      {/* Bottom Navigation (Mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 px-2 py-1 flex justify-around items-center h-16 shadow-[0_-1px_10px_rgba(0,0,0,0.05)]">
        <button className="flex flex-col items-center justify-center flex-1 h-full text-slate-500 active:text-[#00685f] transition-colors">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-bold">Inicio</span>
        </button>
        <button className="flex flex-col items-center justify-center flex-1 h-full text-[#00685f]">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
          <span className="text-[10px] font-bold">Perfil</span>
        </button>
        <button className="flex flex-col items-center justify-center flex-1 h-full text-slate-500 active:text-[#00685f] transition-colors">
          <span className="material-symbols-outlined">auto_awesome</span>
          <span className="text-[10px] font-bold">Sugerencias</span>
        </button>
        <button className="flex flex-col items-center justify-center flex-1 h-full text-slate-500 active:text-[#00685f] transition-colors">
          <span className="material-symbols-outlined">help</span>
          <span className="text-[10px] font-bold">Ayuda</span>
        </button>
      </div>
    </div>
  )
}
