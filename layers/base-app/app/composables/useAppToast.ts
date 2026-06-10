type ToastOptions = Parameters<ReturnType<typeof useToast>['add']>[0]

export type AppToastAction = NonNullable<ToastOptions['actions']>[number]

export type AppToastOptions = ToastOptions

export type AppToast = {
   add: (options: AppToastOptions) => void
   showSuccess: (message?: string | { title?: string; description?: string }) => void
   showInfo: (message: string | { title?: string; description?: string }) => void
   showError: (
      error?: any,
      message?: string | { title?: string; description?: string },
   ) => void
   showProgress: (
      iteration: number,
      options?: { title?: string; description?: string },
   ) => void
}

export function useAppToast(): AppToast {
   const toast = useToast()
   const add = (options: ToastOptions) => {
      return toast.add(options)
   }

   return {
      add,
      showError: (error, message) => {
         let err = error
         let msg = message

         if (
            msg === undefined &&
            error &&
            typeof error === 'object' &&
            !(error instanceof Error) &&
            ('title' in error || 'description' in error)
         ) {
            msg = error as { title?: string; description?: string }
            err = undefined
         }

         const title =
            typeof msg === 'string' ? 'Aviso' : msg?.title || 'Ops, algo deu errado'

         const errorIsString = typeof err === 'string'

         let errorMessage = 'Erro desconhecido'
         if (errorIsString) {
            errorMessage = `${err.slice(0, 40)}`
         } else if (err?.message) {
            errorMessage = `${err.message.slice(0, 40)}`
         }

         const description =
            typeof msg === 'object' &&
            msg?.description != null &&
            msg.description !== ''
               ? msg.description
               : errorMessage

         add({
            color: 'error',
            description,
            duration: 15000,
            icon: 'i-lucide-circle-alert',
            title,
         })
      },
      showSuccess: (message) => {
         const description =
            typeof message === 'string' ? message : message?.description
         const title =
            typeof message === 'string' ? 'Sucesso!' : message?.title || 'Sucesso!'

         add({
            color: 'success',
            description: description || 'Tudo certo.',
            title,
         })
      },
      showInfo: (message) => {
         const description =
            typeof message === 'string' ? message : (message.description ?? '')
         const title =
            typeof message === 'string' ? 'Aviso' : message.title || 'Aviso'

         add({
            color: 'info',
            description,
            duration: 15000,
            icon: 'i-lucide-info',
            title,
         })
      },
      showProgress: (iteration: number, options) => {
         add({
            color: 'info',
            description: options?.description ?? `${iteration}`,
            icon: 'i-lucide-info',
            title: options?.title ?? 'Progresso',
         })
      },
   }
}
