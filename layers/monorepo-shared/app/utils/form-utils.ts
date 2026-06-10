function getLabel(id: string | null, docs: any[]): string {
   if (!id) {
      return '-'
   }
   const found = docs.find((item) => {
      return item.id === id
   })
   return found?.name || found?.optionLabel || '-'
}

function setName(name: string) {
   const toCapital = setStringToCapital(name)
   const truncated = toCapital.slice(0, 50)
   return truncated
}

function setAddress(data: string): string {
   if (!data.length) {
      return ''
   }
   const address0 = data.split(',')
   const address1 = address0.map((item) => {
      return item.trim()
   })
   const address2 = address1.filter((item) => {
      const garbage = ['Jales - SP', 'Brazil']
      return !garbage.includes(item)
   })
   const address3 = address2.join(', ')
   const address4 = setStringToCapital(address3)
   const address5 = address4.replaceAll('n°', '')
   const address6 = address5.replaceAll('nº', '')
   const address7 = address6.replaceAll('Rua', 'R.')
   const pretty = address7.replaceAll(/\s+/g, ' ')
   return pretty
}

export { getLabel, setAddress, setName }
