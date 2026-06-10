import i18next from 'i18next'
import { z } from 'zod'
import { zodI18nMap } from 'zod-i18n-map'

import translation from '../collections/zod-ptbr.json'

export function useTranslateErrorForm() {
   i18next.init({
      lng: 'pt',
      resources: {
         pt: { zod: translation },
      },
   })
   z.setErrorMap(zodI18nMap)
}
