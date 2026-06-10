<script setup lang="ts"></script>

<template>
   <div class="page">
      <UError
         :error="{
            statusCode: 404,
            statusMessage: 'Página não encontrada',
            message: 'A página solicitada não foi encontrada.',
         }" />
   </div>
</template>
