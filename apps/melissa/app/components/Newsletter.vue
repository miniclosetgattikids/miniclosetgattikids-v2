<script setup lang="ts">
type McResponse = {
   msg?: string
   result?: 'error' | 'success'
}

/** Mailchimp exige JSONP no browser (sem CORS no post-json). */
const MC = {
   endpoint: 'https://online.us19.list-manage.com/subscribe/post-json',
   f_id: '0026d1e4f0',
   honeypot: 'b_a7b02790c3363c4783c5a5806_b8f7144d47',
   id: 'b8f7144d47',
   u: 'a7b02790c3363c4783c5a5806',
} as const

const email = ref('')
const pending = ref(false)
const message = ref('')
const success = ref(false)

function subscribe(emailAddress: string) {
   return new Promise<McResponse>((resolve, reject) => {
      const callback = `_mc_${Date.now()}`
      const script = document.createElement('script')
      const params = new URLSearchParams({
         c: callback,
         EMAIL: emailAddress,
         f_id: MC.f_id,
         id: MC.id,
         [MC.honeypot]: '',
         u: MC.u,
      })

      const cleanup = () => {
         clearTimeout(timeout)
         Reflect.deleteProperty(window, callback)
         script.remove()
      }

      const timeout = setTimeout(() => {
         cleanup()
         reject(new Error('timeout'))
      }, 10_000)

      Reflect.set(window, callback, (response: McResponse) => {
         cleanup()
         resolve(response)
      })

      script.onerror = () => {
         cleanup()
         reject(new Error('mailchimp'))
      }

      script.src = `${MC.endpoint}?${params}`
      document.body.appendChild(script)
   })
}

async function onSubmit() {
   if (pending.value) {
      return
   }

   pending.value = true
   message.value = ''

   try {
      const { msg, result } = await subscribe(email.value)
      const alreadyInList = msg?.toLowerCase().includes('already subscribed')

      if (result === 'success' || alreadyInList) {
         success.value = true
         message.value = 'Inscrito com sucesso.'
         email.value = ''
         return
      }

      success.value = false
      message.value =
         'Não foi possível concluir a inscrição. Confira o email e tente novamente.'
   } catch {
      success.value = false
      message.value =
         'Não foi possível concluir a inscrição. Tente novamente em instantes.'
   } finally {
      pending.value = false
   }
}
</script>

<template>
   <div class="ondesk:mt-16 z-10 mt-8 pb-16">
      <UContainer class="flex justify-center">
         <UCard
            class="w-full max-w-4xl"
            :ui="{ body: 'max-w-none ondesk:py-8! onmobi:px-0' }">
            <form class="form onmobi:px-2" @submit.prevent="onSubmit">
               <div class="onmobi:flex-col col-span-12 flex w-full gap-x-4 gap-y-2">
                  <UInput
                     v-model="email"
                     name="EMAIL"
                     type="email"
                     autocomplete="email"
                     icon="i-lucide-mail"
                     placeholder="seuemail@exemplo.com"
                     required
                     :disabled="pending"
                     class="col-span-12 w-full"
                     :ui="{
                        base: 'py-4 max-w-none',
                        leadingIcon: 'text-secondary',
                     }" />

                  <UButton
                     class="ondesk:h-full h-12.25"
                     icon="i-lucide-send"
                     label="Quero receber novidades"
                     size="xl"
                     type="submit"
                     :disabled="pending"
                     :loading="pending"
                     block />
               </div>

               <div aria-hidden="true" class="absolute left-[-5000px]">
                  <input :name="MC.honeypot" tabindex="-1" type="text" value="" />
               </div>

               <div v-if="message" class="flex gap-x-1 px-2 py-3">
                  <UIcon
                     v-if="success"
                     name="i-lucide-party-popper"
                     class="text-purple-500" />
                  <span
                     class="col-span-12 text-sm font-medium"
                     :class="success ? 'text-success' : 'text-error'">
                     {{ message }}
                  </span>
               </div>
            </form>
         </UCard>
      </UContainer>
   </div>
</template>
