import { ref } from 'vue';

export function useSelectedCategory() {
  const selectedCategory = ref('');

  const setSelectedCategory = (category) => {
    selectedCategory.value = category;
  };

  return { selectedCategory, setSelectedCategory };
};
