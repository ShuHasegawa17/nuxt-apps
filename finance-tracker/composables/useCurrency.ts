export const useCurrency = (amount: number | Ref<number>) => {
  const currency = computed(() => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(isRef(amount) ? amount.value : amount);
  });

  return {
    currency,
  };
};
