import type { Metadata } from 'next'
import { RegistrationForm } from '@/components/auth/RegistrationForm'

export const metadata: Metadata = {
  title: 'Registro de Negocio | Conexiones Ruta C',
  description: 'Completa tu perfil para empezar a conectar tu negocio.',
}

export default function OnboardingPage() {
  return <RegistrationForm />
}
