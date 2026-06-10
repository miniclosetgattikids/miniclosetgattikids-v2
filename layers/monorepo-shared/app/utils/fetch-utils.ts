const handleError = (error: unknown): string => {
   if (typeof error === 'object' && error !== null) {
      const errorWithMessage = error as {
         data?: { error?: string; message?: string }
         message?: string
         statusMessage?: string
      }

      const message =
         errorWithMessage.data?.error ||
         errorWithMessage.data?.message ||
         errorWithMessage.message ||
         errorWithMessage.statusMessage

      if (typeof message === 'string' && message.trim().length > 0) {
         return message
      }
   }

   return 'Erro inesperado ao executar a ação.'
}

const buildErrorResponse = (
   error: unknown,
   isZeroDeleted?: true,
): DekbotResponse => {
   if (isZeroDeleted) {
      return {
         data: null,
         error: 'Nenhum documento excluído.',
      }
   } else {
      return {
         data: null,
         error: handleError(error),
      }
   }
}

const buildSuccessResponse = (data: any) => {
   return {
      data,
      error: null,
   }
}

const buildDekResponse = (
   res: DekbotResponse | SupabaseResponse | SupabaseDeleteResponse,
): DekbotResponse => {
   if ('count' in res && typeof res.count === 'number' && res.count === 0) {
      return buildErrorResponse(res.error, true)
   } else if (res.error) {
      return buildErrorResponse(res.error)
   } else {
      return buildSuccessResponse(res.data)
   }
}

export { buildErrorResponse, buildSuccessResponse, handleError, buildDekResponse }
