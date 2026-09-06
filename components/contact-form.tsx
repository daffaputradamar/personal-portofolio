'use client'

import Link from 'next/link'
import { z } from 'zod'
import { toast } from 'sonner'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { ContactFormSchema } from '@/lib/schemas'
import { sendEmail } from '@/lib/actions'
import { cn } from '@/lib/utils'

type Inputs = z.infer<typeof ContactFormSchema>

/** Underlined fields rather than boxes — keeps the form in the editorial voice. */
const fieldClass =
  'w-full border-0 border-b border-line bg-transparent px-0 pb-3 pt-2 text-base transition-colors placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none'

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: { name: '', email: '', message: '' }
  })

  const processForm: SubmitHandler<Inputs> = async data => {
    const result = await sendEmail(data)

    if (result?.error) {
      toast.error('Something went wrong. Please try again, or email me directly.')
      return
    }

    toast.success('Message sent. I will get back to you shortly.')
    reset()
  }

  return (
    <form onSubmit={handleSubmit(processForm)} noValidate className='space-y-9'>
      <div className='grid gap-9 sm:grid-cols-2'>
        <div>
          <label htmlFor='name' className='eyebrow'>
            Your name
          </label>
          <input
            id='name'
            type='text'
            autoComplete='name'
            placeholder='Jane Cooper'
            aria-invalid={!!errors.name}
            className={cn(fieldClass, errors.name && 'border-destructive')}
            {...register('name')}
          />
          {errors.name?.message && (
            <p className='mt-2 text-xs text-destructive'>
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor='email' className='eyebrow'>
            Email
          </label>
          <input
            id='email'
            type='email'
            autoComplete='email'
            placeholder='jane@company.com'
            aria-invalid={!!errors.email}
            className={cn(fieldClass, errors.email && 'border-destructive')}
            {...register('email')}
          />
          {errors.email?.message && (
            <p className='mt-2 text-xs text-destructive'>
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor='message' className='eyebrow'>
          Message
        </label>
        <textarea
          id='message'
          rows={5}
          placeholder='A little about the project, the timeline, and what you need from me.'
          aria-invalid={!!errors.message}
          className={cn(fieldClass, 'resize-none', errors.message && 'border-destructive')}
          {...register('message')}
        />
        {errors.message?.message && (
          <p className='mt-2 text-xs text-destructive'>
            {errors.message.message}
          </p>
        )}
      </div>

      <div className='flex flex-wrap items-center gap-x-6 gap-y-4'>
        <button
          type='submit'
          disabled={isSubmitting}
          className='group inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-4 text-sm font-medium text-background transition-colors hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50'
        >
          {isSubmitting ? 'Sending' : 'Send message'}
          <svg
            aria-hidden
            viewBox='0 0 24 24'
            className={cn(
              'h-4 w-4 transition-transform duration-500',
              isSubmitting ? 'animate-pulse' : 'group-hover:translate-x-1'
            )}
            fill='none'
            stroke='currentColor'
            strokeWidth='1.75'
          >
            <path d='M5 12h14M13 6l6 6-6 6' strokeLinecap='round' />
          </svg>
        </button>

        <p className='text-xs text-muted-foreground'>
          By sending this you agree to the{' '}
          <Link href='/privacy' className='link-underline text-foreground'>
            privacy policy
          </Link>
          .
        </p>
      </div>
    </form>
  )
}
