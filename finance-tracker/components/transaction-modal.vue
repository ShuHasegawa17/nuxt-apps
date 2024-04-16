<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header> Add Transaction </template>

      <UForm :state="state" :schema="schema" ref="form" @submit="save">
        <UFormGroup
          :required="true"
          label="Transaction Type"
          name="type"
          class="mb-4"
        >
          <USelect
            placeholder="select transactoin type"
            :options="types"
            v-model="state.type"
          />
        </UFormGroup>

        <UFormGroup label="Amount" :required="true" name="amount" class="mb-4">
          <UInput
            type="number"
            placeholder="Amount"
            v-model.number="state.amount"
          />
        </UFormGroup>

        <UFormGroup
          label="Transaction date"
          :required="true"
          name="created_at"
          class="mb-4"
        >
          <UInput
            type="date"
            icon="i-heroicons-calendar-20-solid"
            v-model="state.created_at"
          />
        </UFormGroup>

        <UFormGroup
          label="Description"
          name="description"
          hint="Optional"
          class="mb-4"
        >
          <UInput placeholder="description" v-model="state.description" />
        </UFormGroup>

        <UFormGroup
          :required="true"
          label="Category"
          name="category"
          class="mb-4"
          v-if="state.type === 'Expense'"
        >
          <USelect
            placeholder="Category"
            :options="categories"
            v-model="state.category"
          />
        </UFormGroup>

        <UButton
          type="submit"
          color="black"
          variant="solid"
          label="save"
          :loading="isLoading"
        />
      </UForm>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import { categories, types } from '~/constants';
import { z } from 'zod';
// defineProps<{
//   isOpen: boolean;
// }>();
const isOpen = defineModel<boolean>({ required: true });

const emit = defineEmits<{ saved: [] }>();

const defaultSchema = z.object({
  created_at: z.string(),
  description: z.string().optional(),
  amount: z.number().positive('0以上を入力してください。'),
});

const incomeShema = z.object({
  type: z.literal('Income'),
});

const expenseSchema = z.object({
  type: z.literal('Expense'),
  category: z.enum(categories as any),
});

const investimentShema = z.object({
  type: z.literal('Investiment'),
});

const savingShema = z.object({
  type: z.literal('Saving'),
});

const schema = z.intersection(
  z.discriminatedUnion('type', [
    incomeShema,
    expenseSchema,
    investimentShema,
    savingShema,
  ]),
  defaultSchema
);

const form = ref();
const isLoading = ref(false);
const supabase = useSupabaseClient();
const toast = useToast();
const save = async () => {
  // await form.value.validate();
  if (form.value.errors.length) return;
  isLoading.value = true;
  try {
    const { error } = await supabase
      .from('transactions')
      .upsert({ ...(state.value as any) });
    if (!error) {
      toast.add({
        title: 'Transaction saved',
        icon: 'i-heroicons-check-circle',
      });
      isOpen.value = false;
      emit('saved');
      return;
    }
    throw error;
  } catch (e: any) {
    toast.add({
      title: 'Transaction not saved',
      description: e.message,
      icon: 'i-heroicons-exclamation-circle',
      color: 'red',
    });
  } finally {
    isLoading.value = false;
  }
};

const initialState = {
  type: undefined,
  amount: 0,
  created_at: undefined,
  description: undefined,
  category: undefined,
};
const state = ref({
  ...initialState,
});
const resetForm = () => {
  Object.assign(state.value, initialState);
  form.value.clear();
};

watch(isOpen, (newVal) => {
  if (!newVal) resetForm();
});
</script>