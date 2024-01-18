<template>
  <div>
    <h1>test</h1>
  </div>
</template>

<script lang="ts" setup>
  const { $logger } = useNuxtApp();
  $logger.trace('trace');
  $logger.debug('debug');
  $logger.info('info');
  $logger.warn('warn');
  $logger.error('error');
  $logger.fatal('fatal');
  try {
    throw new Error('application error.');
  } catch (e) {
    $logger.error(e);
  }
</script>
