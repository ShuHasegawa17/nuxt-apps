<template>
  <section class="flex items-center justify-between mb-10">
    <h1 class="text-4xl font-extrabold">Summary</h1>
    <div>
      <USelectMenu :options="transactionViewOptions" v-model="viewSelected" />
    </div>
  </section>
  <section
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10"
  >
    <Trend title="Income" :amount="4000" :last-amount="2500" :loading="false" />
    <Trend
      title="Expense"
      :amount="4000"
      :last-amount="3000"
      :loading="false"
    />
    <Trend
      title="Investiment"
      :amount="4000"
      :last-amount="4500"
      :loading="false"
    />
    <Trend title="Saving" :amount="4000" :last-amount="3000" :loading="false" />
  </section>
  <section>
    <Transaction
      v-for="transaction in transactions"
      :key="transaction.id"
      :transaction="transaction"
    />
  </section>
</template>
<script setup lang="ts">
import { transactionViewOptions } from '~/constants';
const viewSelected = ref(transactionViewOptions[1]);

const supabase = useSupabaseClient();
const transactions = ref<any>([]);

const { data, pending } = await useAsyncData('transactions', async () => {
  const { data, error } = await supabase.from('transactions').select();
  if (error) return [];
  return data;
});

console.log(data);

transactions.value = data.value;
</script>
