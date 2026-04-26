'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

const loginSchema = z.object({
  email: z.string().email('Ingresa un correo válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginScreen() {
  const [serverError, setServerError] = useState<string | null>(null)
  const { signIn } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null)
    const { error } = await signIn(data.email, data.password)
    if (error) setServerError('Correo o contraseña incorrectos. Inténtalo de nuevo.')
  }

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] min-h-screen font-['Inter'] font-sans selection:bg-[#00685f] selection:text-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="flex items-center justify-center px-4 h-16 w-full max-w-2xl mx-auto">
          <h1 className="font-['Inter'] text-2xl font-black tracking-tight text-slate-900">
            Conexiones Ruta C
          </h1>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col px-4 pb-10 w-full max-w-2xl mx-auto">
        {/* Hero */}
        <div className="mt-10 mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00685f] mb-2">
            Bienvenido
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#131b2e] tracking-tight leading-tight mb-3">
            Conecta tu negocio.<br />Crece con tu comunidad.
          </h2>
          <p className="text-base text-[#6d7a77] font-medium leading-relaxed">
            Ingresa para acceder a tus conexiones, sugerencias y oportunidades.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-[#bcc9c6] rounded-2xl shadow-sm p-5 sm:p-10">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {serverError && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <span className="material-symbols-outlined text-[#ba1a1a] text-xl shrink-0 mt-0.5">error</span>
                <p className="text-sm text-[#ba1a1a] font-medium">{serverError}</p>
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#131b2e]" htmlFor="email">
                Correo electrónico
              </label>
              <input
                {...register('email')}
                className={`w-full h-12 px-4 text-base rounded-xl border ${errors.email ? 'border-[#ba1a1a]' : 'border-[#bcc9c6]'} focus:border-[#00685f] focus:ring-4 focus:ring-[#00685f]/10 transition-all bg-slate-50/30 outline-none`}
                id="email"
                placeholder="Ej: tunegocio@correo.com"
                type="email"
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-xs text-[#ba1a1a] font-medium">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#131b2e]" htmlFor="password">
                Contraseña
              </label>
              <input
                {...register('password')}
                className={`w-full h-12 px-4 text-base rounded-xl border ${errors.password ? 'border-[#ba1a1a]' : 'border-[#bcc9c6]'} focus:border-[#00685f] focus:ring-4 focus:ring-[#00685f]/10 transition-all bg-slate-50/30 outline-none`}
                id="password"
                placeholder="Tu contraseña"
                type="password"
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="text-xs text-[#ba1a1a] font-medium">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                className="w-full h-14 bg-[#fd761a] text-white text-base font-bold rounded-xl shadow-sm hover:shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined text-xl animate-spin">progress_activity</span>
                    Ingresando...
                  </>
                ) : (
                  <>
                    Ingresar
                    <span className="material-symbols-outlined text-xl">arrow_forward</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Register CTA */}
        <Link
          href="/onboarding"
          className="mt-6 w-full flex flex-col items-center gap-1 bg-white border border-[#bcc9c6] rounded-2xl px-6 py-5 text-center hover:border-[#00685f] transition-colors"
        >
          <p className="text-base text-[#6d7a77]">¿Aún no tienes una cuenta?</p>
          <span className="text-base text-[#00685f] underline underline-offset-4 decoration-[#00685f]/40">
            Regístrate aquí
          </span>
        </Link>

        {/* Help */}
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
