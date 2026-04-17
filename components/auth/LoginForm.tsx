'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'

function createLoginSchema(
  t: (key: string, values?: Record<string, string | number | Date>) => string
) {
  return z.object({
    email: z.string().email(t('invalidEmail')),
    password: z.string().min(6, t('passwordMinLength', { min: 6 })),
  })
}

type LoginFormData = {
  email: string
  password: string
}

export function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null)
  const { signIn } = useAuth()
  const tAuth = useTranslations('auth')
  const tVal = useTranslations('validation')

  const loginSchema = useMemo(() => createLoginSchema(tVal), [tVal])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null)
    const { error } = await signIn(data.email, data.password)
    if (error) setServerError(error.message)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">{tAuth('signIn')}</CardTitle>
        <CardDescription>{tAuth('signInDescription')}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {serverError && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {serverError}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">{tAuth('email')}</Label>
            <Input
              id="email"
              type="email"
              placeholder={tAuth('emailPlaceholder')}
              {...register('email')}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{tAuth('password')}</Label>
            <Input
              id="password"
              type="password"
              placeholder={tAuth('passwordPlaceholder')}
              {...register('password')}
            />
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {tAuth('signIn')}
          </Button>
          <p className="text-sm text-muted-foreground">
            {tAuth('noAccount')}{' '}
            <Link href="/signup" className="text-primary underline-offset-4 hover:underline">
              {tAuth('signUpLink')}
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
