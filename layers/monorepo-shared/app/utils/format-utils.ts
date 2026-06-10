import { ptBR } from 'date-fns/locale'
import { format } from 'date-fns'

function textNormalize(param: string) {
   return param
      .normalize('NFD')
      .replaceAll(/[\u0300-\u036F]/g, '')
      .replaceAll(/[-_.,;:/\\]+/g, ' ')
      .replaceAll(/\s+/g, ' ')
      .trim()
      .toLowerCase()
}

function checkIsSkipped(param: string) {
   const skipPattern = /\b(sem|com|por|dos|das)\b/
   if (param.match(skipPattern)) {
      return true
   } else if (param.length < 3 && param.endsWith('.')) {
      return false
   } else if (param.length < 3) {
      return true
   } else {
      return false
   }
}

function checkIsUpper(param: string) {
   const upperPattern = /\b(rv|ip|sbr)\b/
   if (param.match(upperPattern)) {
      return true
   }
}

function capsFirst(param: string) {
   return param.charAt(0).toUpperCase() + param.slice(1)
}

function checkIsState(param: string) {
   const states =
      /^(?:AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)[.,]?$/i
   return states.test(param)
}

function checkIsRomanNumerals(param: string) {
   const romanNumerals = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/gi
   const match = param.match(romanNumerals)
   if (!match) {
      return false
   }
   return true
}

function setStringToCapital(param: string): string {
   if (!param) {
      return ''
   }
   if (param.length < 3) {
      return param.toUpperCase()
   }

   const toLowerCase = param.toLowerCase()
   const normalized = toLowerCase
      .replaceAll(/[^\w\u00C0-\u00FF\s[,.:;]\]/g, '')
      .replaceAll('\n', ' ')
      .replaceAll(/([A-Z])\s*&\s*([A-Z])/gi, '$1 & $2') // Garante que um espaço ANTES e/ou DEPOIS do & se ele estiver colado em um caractere que não seja espaço.
   const singleSpaceBetween = normalized.replaceAll(/\s+/g, ' ')
   let stringSplitted = singleSpaceBetween.split(' ')
   const handleStringSplitted = () => {
      return stringSplitted.map((word) => {
         const hasHyphen = word.includes('-')
         const isState = checkIsState(word)
         const isRomanNumerals = checkIsRomanNumerals(word)
         const isSkipped = checkIsSkipped(word)
         const isUpper = checkIsUpper(word)
         if (hasHyphen) {
            stringSplitted = word.split('-')
            const words = stringSplitted.map((item) => {
               return capsFirst(item)
            })
            word = words.join('-')
         } else if (isState) {
            word = word.toUpperCase()
         } else if (isRomanNumerals) {
            word = word.toUpperCase()
         } else if (isUpper) {
            word = word.toUpperCase()
         } else if (!isSkipped) {
            word = capsFirst(word)
         }
         return word
      })
   }

   const textSplitted = handleStringSplitted()

   return capsFirst(textSplitted.join(' '))
}

function setStringToLower(param: string) {
   return param.toLowerCase()
}

function setStringToUpper(param: string) {
   return param.toUpperCase()
}

function setStringToPhone(param?: string) {
   if (!param) {
      return ''
   }
   const digitsOnly = param.replaceAll(/\D/g, '')

   // if 0800
   if (digitsOnly.startsWith('0800')) {
      return digitsOnly.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3')
   }

   const length11 = digitsOnly.slice(-11)

   const phone = length11.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1)$2-$3')
   return phone
}

function setStringToWhatsApp(param?: string) {
   if (!param) {
      return ''
   }
   const digitsOnly = param.replaceAll(/\D/g, '')
   const length11 = digitsOnly.slice(-11)
   return `55${length11}`
}

function setStringToId(param: string): string | undefined {
   if (!param) {
      return
   }
   const noHyphens = param.replaceAll('-', ' ')
   const toLowerCase = noHyphens.toLowerCase()
   const noDots = toLowerCase.replaceAll('.', '')
   const slug = noDots
      .normalize('NFD')
      .replaceAll(/\s+/g, ' ')
      .replaceAll(/[\u0300-\u036F]/g, '')
      .replaceAll(/[-_.,;:/\\]+/g, '')
      .replaceAll(/[^a-z0-9]/g, '-')
      .replaceAll(/-+/g, '-')
      .replaceAll(/(^-|-$)/g, '')
      .trim()

   if (slug.length > 50) {
      const parts = slug.split('-')
      let truncated = (parts[0] ?? '').slice(0, 50) // Garante que a primeira parte não exceda 50

      for (let i = 1; i < parts.length; i++) {
         const nextPart = parts[i] ?? ''
         if (truncated.length + nextPart.length + 1 > 50) {
            break
         } // +1 para o hífen
         truncated += `-${nextPart}`
      }

      return truncated
   }

   return slug
}

function setNameToSlug(param: string) {
   if (!param) {
      return ''
   }
   const toLowerCase = param.toLowerCase()
   const noDots = toLowerCase.replaceAll('.', '')
   const slug = noDots
      .normalize('NFD')
      .replaceAll(/\s+/g, ' ')
      .replaceAll(/[\u0300-\u036F]/g, '')
      .replaceAll(/[-_.,;:/\\]+/g, '')
      .replaceAll(/[^a-z0-9]/g, '-')
      .replaceAll(/-+/g, '-')
      .replaceAll(/(^-|-$)/g, '')
      .trim()

   if (slug.length > 20) {
      const parts = slug.split('-')
      let truncated = (parts[0] ?? '').slice(0, 20) // Garante que a primeira parte não exceda 20

      for (let i = 1; i < parts.length; i++) {
         const nextPart = parts[i] ?? ''
         if (truncated.length + nextPart.length + 1 > 20) {
            break
         } // +1 para o hífen
         truncated += `-${nextPart}`
      }

      return truncated
   }

   return slug
}

function setStringToE164(param: string): string {
   if (!param?.trim()) return ''

   let digits = param.replace(/\D/g, '')

   // Ex: 0055...
   if (digits.startsWith('00')) {
      digits = digits.slice(2)
   }

   // Ex: 055...
   digits = digits.replace(/^0+/, '')

   // Já veio com DDI 55
   if (digits.startsWith('55')) {
      const national = digits.slice(2)
      if (national.length === 10 || national.length === 11) {
         return `+55${national}`
      }
      return ''
   }

   // Veio sem DDI
   if (digits.length === 10 || digits.length === 11) {
      return `+55${digits}`
   }

   return ''
}

function setAnyToMoney(param: string | number | null) {
   if (!param) {
      return ''
   }
   const string = param.toString()
   const handled = string.replaceAll(',', '.')
   const number = Number.parseFloat(handled)
   let fixed = number.toFixed(2)
   fixed = fixed.replaceAll('.', ',')
   return `R$${fixed}`
}

function superFormat(date: Date, formatStr: string) {
   return setStringToCapital(format(date, formatStr, { locale: ptBR }))
}

export {
   setAnyToMoney,
   setNameToSlug,
   setStringToE164,
   setStringToCapital,
   setStringToId,
   setStringToLower,
   setStringToPhone,
   setStringToUpper,
   setStringToWhatsApp,
   superFormat,
   textNormalize,
}
