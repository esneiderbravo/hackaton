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

function createSignupSchema(
  t: (key: string, values?: Record<string, string | number | Date>) => string
) {
  return z
    .object({
      fullName: z.string().min(2, t('nameMinLength', { min: 2 })),
      email: z.string().email(t('invalidEmail')),
      password: z.string().min(8, t('passwordMinLength', { min: 8 })),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('passwordsNoMatch'),
      path: ['confirmPassword'],
    })
}

type SignupFormData = {
  fullName: string
  email: string
  password: string
  confirmPassword: string
}

export function SignupForm() {
  const [serverError, setServerError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const { signUp } = useAuth()
  const tAuth = useTranslations('auth')
  const tVal = useTranslations('validation')

  const signupSchema = useMemo(() => createSignupSchema(tVal), [tVal])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({ resolver: zodResolver(signupSchema) })

  const onSubmit = async (data: SignupFormData) => {
    setServerError(null)
    const { error } = await signUp(data.email, data.password, data.fullName)
    if (error) {
      setServerError(error.message)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 text-center">
          <div className="mb-4 text-4xl">📧</div>
          <h2 className="text-xl font-semibold">{tAuth('checkEmail')}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{tAuth('confirmationSent')}</p>
          <Link href="/login" className="mt-4 block text-sm text-primary hover:underline">
            {tAuth('backToLogin')}
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">{tAuth('signUp')}</CardTitle>
        <CardDescription>{tAuth('signUpDescription')}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {serverError && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {serverError}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="fullName">{tAuth('fullName')}</Label>
            <Input
              id="fullName"
              placeholder={tAuth('fullNamePlaceholder')}
              {...register('fullName')}
            />
            {errors.fullName && (
              <p className="text-xs text-destructive">{errors.fullName.message}</p>
            )}
          </div>
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
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{tAuth('confirmPassword')}</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder={tAuth('passwordPlaceholder')}
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {tAuth('signUp')}
          </Button>
          <p className="text-sm text-muted-foreground">
            {tAuth('alreadyHaveAccount')}{' '}
            <Link href="/login" className="text-primary underline-offset-4 hover:underline">
              {tAuth('signInLink')}
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
