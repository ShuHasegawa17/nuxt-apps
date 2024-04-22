export const useAppToast = () => {
  const toast = useToast();

  return {
    toastSuccess: ({ title = '', description = '' }) => {
      toast.add({
        title,
        description,
        icon: 'i-heroicons-check-circle',
        color: 'green',
      });
    },
    toastError: ({ title = '', description = '' }) => {
      toast.add({
        title,
        description,
        icon: 'i-heroicons-exclamation-circle',
        color: 'red',
      });
    },
  };
};
