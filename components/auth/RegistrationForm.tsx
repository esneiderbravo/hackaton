'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'

const onboardingSchema = z.object({
  contrasena: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  nombre_emprendedor: z.string().min(2, 'El nombre es muy corto'),
  correo_electronico: z.union([z.string().email('Ingresa un correo válido'), z.literal('')]).optional(),
  celular_contacto: z.union([z.string().min(10, 'El teléfono debe tener 10 dígitos'), z.literal('')]).optional(),
  nombre_negocio: z.string().min(2, 'El nombre del negocio es muy corto'),
  servicios_ofrecidos: z.string().min(5, 'Por favor describe tus servicios'),
  nit: z.string().optional(),
  ciudad: z.string().optional(),
  ubicacion: z.string().optional(),
  empleados: z.string().optional(),
}).refine(
  (data) => !!(data.correo_electronico || data.celular_contacto),
  {
    message: 'Ingresa al menos un correo o un celular',
    path: ['correo_electronico'],
  }
)

type OnboardingFormData = z.infer<typeof onboardingSchema>

export function RegistrationForm() {
  const [isAdditionalInfoOpen, setIsAdditionalInfoOpen] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
  })

  const onSubmit = (data: OnboardingFormData) => {
    console.log('Form data:', data)
    router.push('/home')
  }

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] min-h-screen font-['Inter'] font-sans selection:bg-[#00685f] selection:text-white">
      {/* TopAppBar */}
      <header className="bg-white border-b border-slate-200 shadow-sm fixed top-0 left-0 right-0 z-40">
        <div className="relative flex items-center px-3 h-16 w-full max-w-2xl mx-auto">
          <Link
            href="/login"
            className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 active:bg-slate-200 transition-colors z-10"
            aria-label="Volver al inicio"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="absolute inset-x-0 text-center font-['Inter'] text-2xl font-black tracking-tight text-slate-900 pointer-events-none">
            Conexiones Ruta C
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-10 px-4 w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="mt-8 mb-8 text-left">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#131b2e] mb-2 tracking-tight">
            Regístrate en un minuto
          </h2>
          <p className="text-base text-[#6d7a77] font-medium leading-relaxed">
            Solo necesitamos unos datos básicos para empezar a conectar tu negocio.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-[#bcc9c6] rounded-2xl shadow-sm p-5 sm:p-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              {/* Contact group: email OR phone */}
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-bold text-[#131b2e]">
                    Datos de la cuenta <span className="text-[#ba1a1a]">*</span>
                  </p>
                  <p className="text-xs text-[#6d7a77] mt-0.5">Ingresa al menos uno. Con esta información puedes acceder a tu cuenta.</p>
                </div>

                <div className={`border rounded-xl overflow-hidden ${errors.correo_electronico || errors.celular_contacto ? 'border-[#ba1a1a]' : 'border-[#bcc9c6]'}`}>
                  {/* Phone */}
                  <div className="px-4 pt-4 pb-3 bg-white">
                    <label className="block text-xs font-semibold text-[#6d7a77] mb-1.5" htmlFor="celular_contacto">
                      Celular
                    </label>
                    <input
                      {...register('celular_contacto')}
                      className="w-full h-11 px-3 text-base rounded-lg border border-[#e2e8f0] focus:border-[#00685f] focus:ring-4 focus:ring-[#00685f]/10 transition-all bg-slate-50/50 outline-none"
                      id="celular_contacto"
                      placeholder="Ej: 300 333 4444"
                      type="tel"
                    />
                  </div>

                  {/* Email */}
                  <div className="px-4 pt-0 pb-4 bg-white">
                    <label className="block text-xs font-semibold text-[#6d7a77] mb-1.5" htmlFor="correo_electronico">
                      Correo electrónico
                    </label>
                    <input
                      {...register('correo_electronico')}
                      className="w-full h-11 px-3 text-base rounded-lg border border-[#e2e8f0] focus:border-[#00685f] focus:ring-4 focus:ring-[#00685f]/10 transition-all bg-slate-50/50 outline-none"
                      id="correo_electronico"
                      placeholder="Ej: tunegocio@correo.com"
                      type="email"
                      autoComplete="email"
                    />
                  </div>
                </div>

                {errors.correo_electronico && (
                  <p className="text-xs text-[#ba1a1a] font-medium">{errors.correo_electronico.message}</p>
                )}
                {errors.celular_contacto && (
                  <p className="text-xs text-[#ba1a1a] font-medium">{errors.celular_contacto.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-[#131b2e]" htmlFor="contrasena">
                  Contraseña <span className="text-[#ba1a1a]">*</span>
                </label>
                <input
                  {...register('contrasena')}
                  className={`w-full h-12 px-4 text-base rounded-xl border ${errors.contrasena ? 'border-[#ba1a1a]' : 'border-[#bcc9c6]'} focus:border-[#00685f] focus:ring-4 focus:ring-[#00685f]/10 transition-all bg-slate-50/30 outline-none`}
                  id="contrasena"
                  placeholder="Mínimo 8 caracteres"
                  type="password"
                  autoComplete="new-password"
                />
                {errors.contrasena && (
                  <p className="text-xs text-[#ba1a1a] font-medium">{errors.contrasena.message}</p>
                )}
              </div>

              <div className="h-px bg-slate-100" />

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
                {errors.nombre_emprendedor && (
                  <p className="text-xs text-[#ba1a1a] font-medium">{errors.nombre_emprendedor.message}</p>
                )}
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
                {errors.nombre_negocio && (
                  <p className="text-xs text-[#ba1a1a] font-medium">{errors.nombre_negocio.message}</p>
                )}
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
                  placeholder="Ej: venta de artículos del hogar o servicio de transporte de materiales"
                />
                {errors.servicios_ofrecidos && (
                  <p className="text-xs text-[#ba1a1a] font-medium">{errors.servicios_ofrecidos.message}</p>
                )}
              </div>
            </div>

            {/* Accordion: Additional Info */}
            <details
              className="group border border-[#bcc9c6] rounded-xl overflow-hidden bg-slate-50/30"
              open={isAdditionalInfoOpen}
              onClick={(e) => {
                e.preventDefault()
                setIsAdditionalInfoOpen(!isAdditionalInfoOpen)
              }}
            >
              <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors min-h-[56px] outline-none">
                <span className="font-bold text-[#00685f] flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-xl">add_circle</span>
                  Información Adicional (Opcional)
                </span>
                <span className={`material-symbols-outlined transition-transform ${isAdditionalInfoOpen ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </summary>
              {isAdditionalInfoOpen && (
                <div className="p-4 pt-2 space-y-4 bg-white border-t border-[#bcc9c6]" onClick={(e) => e.stopPropagation()}>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#131b2e]" htmlFor="nit">NIT / Cédula</label>
                    <input {...register('nit')} className="w-full h-11 px-4 text-sm rounded-lg border border-[#bcc9c6] bg-white outline-none" id="nit" type="text" />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#131b2e]" htmlFor="ciudad">Ciudad</label>
                    <input {...register('ciudad')} className="w-full h-11 px-4 text-sm rounded-lg border border-[#bcc9c6] bg-white outline-none" id="ciudad" type="text" />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#131b2e]" htmlFor="ubicacion">Ubicación del negocio</label>
                    <input {...register('ubicacion')} className="w-full h-11 px-4 text-sm rounded-lg border border-[#bcc9c6] bg-white outline-none" id="ubicacion" placeholder="Ej. Calle 10 # 5-20" type="text" />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#131b2e]" htmlFor="empleados">Cantidad de empleados</label>
                    <input {...register('empleados')} className="w-full h-11 px-4 text-sm rounded-lg border border-[#bcc9c6] bg-white outline-none" id="empleados" min="0" placeholder="0" type="number" />
                  </div>
                </div>
              )}
            </details>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-4">
              <button
                className="w-full h-14 bg-[#fd761a] text-white text-base font-bold rounded-xl shadow-sm hover:shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                type="submit"
              >
                Continuar Registro
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </button>
            </div>
          </form>
        </div>

        {/* Help Section */}
        <button
          className="w-full mt-6 p-4 bg-[#f0fdfa] border border-[#ccfbf1] rounded-2xl flex gap-4 items-center text-left active:bg-[#ccfbf1] transition-colors"
          type="button"
        >
          <div className="bg-[#0d9488] w-10 h-10 shrink-0 rounded-full text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-xl">call</span>
          </div>
          <div className="flex-1">
            <p className="text-[#134e4a] font-bold text-sm">¿Necesitas ayuda?</p>
            <p className="text-[#0f766e] text-xs">
              Llámanos al <span className="font-black">01-8000-123456</span>
            </p>
          </div>
          <span className="material-symbols-outlined text-[#2dd4bf]">chevron_right</span>
        </button>
      </main>
    </div>
  )
}
