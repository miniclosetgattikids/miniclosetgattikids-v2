<script setup lang="ts"></script>

<template>
   <div class="page">
      <UError
         :error="{
            statusCode: 400,
            statusMessage: 'Resolução de tela incompatível',
            message:
               'Este aplicativo é otimizado para telas com largura mínima de 1080 pixels. Por favor, utilize um dispositivo com tela maior.',
         }" />
   </div>
</template>
