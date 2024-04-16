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
    <Trend
      title="Income"
      :amount="incomeTotal"
      :last-amount="2500"
      :loading="isLoading"
    />
    <Trend
      title="Expense"
      :amount="expenseTotal"
      :last-amount="3000"
      :loading="isLoading"
    />
    <Trend
      title="Investiment"
      :amount="4000"
      :last-amount="4500"
      :loading="isLoading"
    />
    <Trend
      title="Saving"
      :amount="4000"
      :last-amount="3000"
      :loading="isLoading"
    />
  </section>
  <section class="flex justify-between mb-10">
    <div>
      <h2 class="text-2xl font-extrabold">Transactions</h2>
      <div class="text-gray-500 dark:text-gray-400">
        You have {{ incomeCount }} incomes and {{ expenseCount }} expense this
        period
      </div>
    </div>
    <div>
      <TransactionModal v-model="isOpen" @saved="refreshTransactions()" />

      <UButton
        icon="i-heroicons-plus-circle"
        color="white"
        variant="solid"
        label="Add"
        @click="isOpen = true"
      />
    </div>
  </section>
  <section v-if="!isLoading">
    <div
      v-for="(transactionOnDay, date) in transactionGroupedByDate"
      :key="date"
    >
      <DailyTransactionSummay
        :date="date + ''"
        :transactions="transactionOnDay"
      />
      <Transaction
        v-for="transaction in transactionOnDay"
        :key="transaction.id"
        :transaction="transaction"
        @deleted="refreshTransactions()"
      />
    </div>
  </section>
  <section v-else>
    <USkeleton class="h-8 w-full mb-2" v-for="i in 4" :key="i" />
  </section>
</template>
<script setup lang="ts">
import { transactionViewOptions } from '~/constants';
const viewSelected = ref(transactionViewOptions[1]);

const supabase = useSupabaseClient();
const transactions = ref<any>([]);
const isLoading = ref(false);

const isOpen = ref(false);

const income = computed(() =>
  transactions.value.filter((t: any) => t.type === 'Income')
);
const expense = computed(() =>
  transactions.value.filter((t: any) => t.type === 'Expense')
);

const incomeCount = computed(() => income.value.length);
const expenseCount = computed(() => expense.value.length);

const incomeTotal = computed(() =>
  income.value.reduce(
    (sum: any, transaction: any) => sum + transaction.amount,
    0
  )
);

const expenseTotal = computed(() =>
  expense.value.reduce(
    (sum: any, transaction: any) => sum + transaction.amount,
    0
  )
);

const fetchTransactions = async () => {
  isLoading.value = true;
  try {
    const { data } = await useAsyncData('transactions', async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select()
        .order('created_at', { ascending: false });
      if (error) return [];
      return data;
    });
    return data.value;
  } finally {
    isLoading.value = false;
  }
};

const refreshTransactions = async () =>
  (transactions.value = await fetchTransactions());

await refreshTransactions();

const transactionGroupedByDate = computed(() => {
  let grouped: any = {};
  for (const transaction of transactions.value) {
    const date = new Date(transaction.created_at).toISOString().split('T')[0];
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(transaction);
  }

  // const sortedKeys = Object.keys(grouped).sort().reverse();
  // const sortedGrouped: { [key: string]: any } = {};
  // for (const key of sortedKeys) {
  //   sortedGrouped[key] = grouped[key];
  // }

  // return sortedGrouped;
  return grouped;
});

console.log(transactionGroupedByDate.value);
</script>
