<script setup>

  import { ref } from 'vue';
  import TableCategory from '../component/TableCategory.vue';
  import { useCategoryStore } from '@/stores/category';
  import { useToast } from 'vue-toastification';

  const showAddCategoryModal = ref(false);

  const category = ref('');
  const categoryStore = useCategoryStore();
  const toast = useToast();
  const isloading = ref(false)
  const searchTerm = ref('')


  function openModal() {
    showAddCategoryModal.value = true;
  }
  function closeModal() {
    showAddCategoryModal.value = false;
  }

  const handleSubmit = async () => {
    try{
      isloading.value = true
      await categoryStore.createCategory(category.value);
      closeModal();
      category.value = ''
      toast.success("Category added successfully");
    }catch(e){
      alert('Message error:', e);
    }finally {
      isloading.value = false;
    }
  }


</script>
<template>
  <div class="py-4">
      <h1 class="text-2xl text-blue-900 font-bold my-2">Type Job</h1>
      <p class="text-gray-500">Create and controll of type Job Comapny</p>
      <div class="w-full mt-4">

        <div class="flex items-center justify-between w-full">
          <form action="" class="border border-gray-500 rounded-lg  pe-3">
            <input v-model="searchTerm" type="text" name="" id="" class="p-2 outline-0" placeholder="ស្វែងរក...">
            <button :tabindex="-1">
              <v-icon name="bi-search" />
            </button>
          </form>
          <div>
            <button @click="openModal" class="border p-2 rounded-lg border-blue-900 text-blue-900 hover:bg-blue-800 hover:text-white transition">
              Add Job
            </button>
          </div>
        </div>
        
        <!-- <TableJobs/> -->
         <TableCategory :searchTerm="searchTerm"/>

        <!-- Add Job Modal -->
        <div
          v-if="showAddCategoryModal"
          class="fixed inset-0 bg-[#00000034] flex items-center justify-center z-50"
        >
          <div class="bg-white rounded-lg w-auto p-8">
            <h2 class="text-xl font-bold mb-4 border-b pb-2 border-gray-400">Add Job</h2>

            <form @submit.prevent="handleSubmit()">

              <!-- name / salary-range -->
              <div class="flex justify-between ">
                <div class="mb-2 w-[400px] me-2">
                  <label class="text-gray-500">Type of Job</label>
                  <input v-model="category" type="text" class="w-full border mt-1 p-2 rounded outline-0" placeholder="Add Type Job of Company"/>
                </div>
              </div>
              <!-- name / salary-range -->

        
              
              <!-- button group -->
              <div class="flex justify-end gap-2 mt-4">
                <button type="button" @click="closeModal" class="px-3 py-1 border rounded">Cancel</button>
                <button  :disabled="isloading" :class="['px-3 py-1 border rounded text-white transition',isloading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-900 hover:bg-blue-800']">
                  {{ isloading ? 'ចាំតិចប្រូកំពុង Send ហើយ': 'Save' }}
                </button>
              </div>
              <!-- button group -->
            </form>
          </div>
        </div>

      </div>
  </div>
</template>