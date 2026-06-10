#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

import { createClient } from '@supabase/supabase-js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function parseArgs(argv) {
   const args = {}
   for (let i = 2; i < argv.length; i++) {
      const cur = argv[i]
      if (!cur.startsWith('--')) continue
      const key = cur.slice(2)
      const value = argv[i + 1]
      if (!value || value.startsWith('--')) {
         args[key] = true
      } else {
         args[key] = value
         i++
      }
   }
   return args
}

function getRepoRoot() {
   // .agents/tools -> repo root
   return path.resolve(__dirname, '..', '..')
}

function extractDekbotLogTypesFromModel(modelTsPath) {
   const src = fs.readFileSync(modelTsPath, 'utf8')
   const match = src.match(
      /const\s+dekbotLogTypeEnum\s*=\s*z\.enum\(\s*\[([\s\S]*?)\]\s*\)/m,
   )
   if (!match) {
      throw new Error('Não encontrei `dekbotLogTypeEnum = z.enum([...])` no model.')
   }

   const inner = match[1]
   const values = []
   const re = /'([^']+)'/g
   let m
   while ((m = re.exec(inner))) {
      values.push(m[1])
   }

   if (values.length === 0) {
      throw new Error('Enum `dekbotLogTypeEnum` encontrado, mas sem valores.')
   }

   return values
}

function requireEnv(name) {
   const value = process.env[name]
   if (!value || !value.trim()) {
      throw new Error(`Env obrigatória ausente: ${name}`)
   }
   return value
}

function printHelp({ allowedTypes }) {
   const typeList = allowedTypes.map((t) => `'${t}'`).join(', ')
   const text = [
      'Uso:',
      '  node .agents/tools/dekbot-logs-read.mjs --type <tipo>',
      '',
      'Env necessárias:',
      '  SUPABASE_URL',
      '  SUPABASE_SERVICE_ROLE_KEY',
      '',
      'Opções:',
      `  --type   Obrigatório. Um de: ${typeList}`,
      '  --json   Opcional. Força JSON (default: true)',
      '  --help   Mostra esta ajuda',
      '',
      'Retorno:',
      '  JSON em stdout com { ok, type, limit, data } ou { ok:false, error }',
   ].join('\n')
   console.info(text)
}

async function main() {
   const args = parseArgs(process.argv)

   const repoRoot = getRepoRoot()
   const modelPath = path.join(repoRoot, 'shared/models/base/dekbot-logs-model.ts')
   const allowedTypes = extractDekbotLogTypesFromModel(modelPath)

   if (args.help) {
      printHelp({ allowedTypes })
      return
   }

   const type = args.type
   if (typeof type !== 'string' || !type.trim()) {
      printHelp({ allowedTypes })
      throw new Error('Parâmetro obrigatório `--type` não informado.')
   }

   if (!allowedTypes.includes(type)) {
      throw new Error(
         `Tipo inválido: '${type}'. Permitidos: ${allowedTypes.map((t) => `'${t}'`).join(', ')}`,
      )
   }

   const supabaseUrl = requireEnv('SUPABASE_URL')
   const supabaseServiceRoleKey = requireEnv('SUPABASE_SERVICE_ROLE_KEY')

   const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
   })

   const limit = 100

   const res = await supabase
      .from('dekbot_logs')
      .select('*')
      .eq('type', type)
      .order('id', { ascending: false })
      .limit(limit)

   if (res.error) {
      console.log(
         JSON.stringify(
            {
               ok: false,
               error: res.error.message || 'Erro ao consultar Supabase.',
               details: res.error,
            },
            null,
            2,
         ),
      )
      process.exitCode = 1
      return
   }

   console.log(
      JSON.stringify(
         {
            ok: true,
            type,
            limit,
            data: res.data ?? [],
         },
         null,
         2,
      ),
   )
}

main().catch((err) => {
   const message = err instanceof Error ? err.message : String(err)
   console.log(JSON.stringify({ ok: false, error: message }, null, 2))
   process.exitCode = 1
})
