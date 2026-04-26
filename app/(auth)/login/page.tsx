import type { Metadata } from 'next'
import { LoginScreen } from '@/components/auth/LoginScreen'

export const metadata: Metadata = { title: 'Ingresar | Conexiones Ruta C' }

export default function LoginPage() {
  return <LoginScreen />
}
