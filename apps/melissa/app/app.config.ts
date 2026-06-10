const hero = {
   title: 'Cada passo da infância com cor e cheirinho de Melissa',
   headline: 'A escolha para quem busca Mini Melissa infantil original.',
}

const faqItems = [
   {
      content:
         'Sim. Nossa loja física fica na Av João Flauzino Barbosa, 285 na cidade de Cândido Mota/SP.',
      label: 'Tem loja física?',
   },
   {
      content: 'Sim. Visite nossa loja virtual em https://miniclosetgattikids.com.',
      label: 'Posso comprar online?',
   },
   {
      content:
         'Não. Vendemos uma ampla linha de marcas e modelos de moda infantil. Petit Cherie, Cia da Meia, Baby Gut, etc.',
      label: 'Vende apenas produtos Melissa?',
   },
]

const newsletter = {
   eyebrow: 'Novidades no Mini Closet',
   headline:
      'Receba avisos de novas coleções, reposições queridinhas e escolhas especiais para a infância.',
   perks: [
      'Lançamentos Mini Melissa',
      'Curadoria de modelos por idade',
      'Condições especiais da loja',
   ],
   title: 'Newsletter em breve',
}

export default defineAppConfig({
   appSubtitle: 'Uma moda para se encantar',
   appTitle: 'Mini Closet Gatti Kids',
   landingDescription:
      'Descubra a nova coleção Mini Melissa infantil e garanta o par perfeito. Acesse nossa vitrine exclusiva Melissa e confira todos os modelos originais disponíveis.',
   landingTitle: 'Uma Moda para se encantar.',
   hero,
   faqItems,
   newsletter,
   icon: {
      mode: 'svg',
   },
   ui: {
      prefix: 'U',
      icons: { loading: 'lucide-loader' },
      colors: {
         primary: 'orange',
         secondary: 'purple',
      },
      badge: {
         slots: { base: 'min-w-5 justify-center' },
      },
      button: {
         base: [
            'justify-center duration-200 active:hover:scale-[0.98] disabled:active:hover:scale-none min-w-9',
         ],
         variants: {
            size: {
               lg: {
                  base: 'text-md h-11',
               },
               md: {
                  base: 'text-[13px] rounded-[7px] px-5 h-9 gap-x-2',
                  leadingIcon: 'size-4.5 mt-[-0.5px]',
               },
               sm: {
                  base: 'rounded-[5px]',
               },
            },
         },
         compoundVariants: [
            {
               class: 'min-w-28',
               size: 'lg',
               square: false,
            },
            {
               class: 'ring-default',
               color: 'neutral',
               variant: 'subtle',
            },
            {
               class: 'ring-neutral-400',
               color: 'neutral',
               variant: 'outline',
            },
            {
               class: 'disabled:bg-default disabled:ring-default disabled:ring disabled:ring-inset disabled:text-muted',
               color: 'primary',
               variant: 'solid',
            },
            {
               class: '',
               color: 'neutral',
               variant: 'subtle',
            },
            {
               class: 'light:bg-success-50',
               color: 'success',
               variant: 'subtle',
            },
         ],
         defaultVariants: {
            color: 'primary',
            size: 'lg',
            variant: 'solid',
         },
      },
      card: {
         slots: {
            root: 'onmobi:ring-0',
            body: 'border-none max-w-prose w-full mx-auto',
            footer: 'pb-4 justify-end pt-2.5 flex gap-x-3 w-full',
            header: 'border-none pb-0 min-h-none',
         },
      },
      pageCard: {
         slots: {
            root: 'onmobi:bg-default',
            container: 'max-w-full lg:flex',
            body: 'w-full',
            footer: 'pb-4 justify-end pt-2.5 flex gap-x-3 w-full',
         },
      },
      modal: {
         slots: {
            body: 'border-none',
            footer: 'pb-6 justify-end pt-2.5 flex gap-x-3',
            header: 'border-none pb-0 min-h-none pt-8',
            overlay: 'backdrop-blur-xs',
            title: 'text-xl font-semibold',
            close: 'top-1.5 inset-e-2.5',
         },
         variants: {
            fullscreen: {
               false: {
                  content: 'max-w-[96dvw] w-140',
               },
            },
         },
      },
      dashboardSidebar: {
         slots: {
            root: 'bg-default',
         },
      },
      formField: {
         slots: {
            error: 'text-xs ml-1',
            help: 'text-xs text-info ml-1',
         },
      },
      input: {
         slots: {
            base: 'w-full border-0 placeholder:text-(--ui-text-dimmed) focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 max-w-prose',
         },
         variants: {
            variant: {
               outline: 'ring-default',
            },
         },
         defaultVariants: {
            color: 'primary',
            size: 'xl',
            variant: 'outline',
         },
      },
      inputNumber: {
         slots: {
            base: 'w-full border-0 placeholder:text-(--ui-text-dimmed) focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 max-w-prose',
         },
         variants: {
            variant: {
               outline: 'ring-default',
            },
         },
         defaultVariants: {
            size: 'xl',
            color: 'primary',
            variant: 'outline',
         },
      },
      inputMenu: {
         slots: {
            base: 'w-full border-0 placeholder:text-(--ui-text-dimmed) focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 max-w-prose',
         },
         variants: {
            size: {
               xl: {
                  base: 'py-3 min-h-11',
               },
            },
         },
         defaultVariants: {
            color: 'primary',
            size: 'xl',
            variant: 'outline',
         },
      },
      inputTags: {
         slots: {
            base: 'w-full border-0 placeholder:text-(--ui-text-dimmed) focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 max-w-prose',
         },
         variants: {
            size: {
               xl: {
                  base: 'py-3 min-h-11',
               },
            },
         },
         defaultVariants: {
            color: 'primary',
            size: 'xl',
            variant: 'outline',
         },
      },
      page: {
         slots: {
            root: 'bg-default',
         },
      },
      pageSection: {
         slots: {
            container: 'lg:py-8 py-8 sm:py-8 sm:gap-8',
            root: 'bg-default ring ring-inset rounded-lg ring-default',
         },
      },
      select: {
         variants: {
            size: {
               xl: {
                  base: 'py-3 h-11',
               },
            },
         },
         defaultVariants: {
            color: 'primary',
            size: 'xl',
            variant: 'outline',
         },
      },
      stepper: {
         variants: {
            color: {
               neutral: {
                  trigger:
                     'bg-default group-data-[state=completed]:bg-primary group-data-[state=completed]:light:text-white group-data-[state=active]:light:text-white ring ring-accented group-data-[state=completed]:light:ring-primary group-data-[state=active]:light:ring-primary group-data-[state=active]:bg-primary',
               },
            },
         },
      },
      switch: {
         slots: {
            label: 'mt-[2px]',
         },
      },
      table: {
         slots: {
            root: 'onmobi:border-0 onmobi:px-0 scrollbar-thumb-primary-900 scrollbar-track-background/10 scrollbar-thumb-rounded-sm scrollbar-track-rounded-sm scrollbar-thin pb-4',
            th: 'truncate',
         },
      },
      tabs: {
         slots: {
            content: 'grid h-full',
            root: 'p-1 rounded-md gap-1',
         },
         variants: {
            variant: {
               pill: {
                  indicator: 'rounded-[8px] shadow-xs',
                  list: 'ring-[1px] ring-default ring-inset bg-default rounded-[8px]',
               },
            },
         },
      },
      textarea: {
         variants: {
            size: {
               md: {
                  base: 'py-3 min-h-11',
               },
            },
         },
         defaultVariants: {
            color: 'primary',
            size: 'xl',
            variant: 'outline',
         },
      },
   },
})
