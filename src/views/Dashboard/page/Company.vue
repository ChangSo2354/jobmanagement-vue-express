<script setup> 
  import { ref } from 'vue';
  import TableCompany from '../component/TableCompany.vue';

  const showAddCompanyModal = ref(false);


  function openModal() {
    showAddCompanyModal.value = true;
  }
  function closeModal() {
    showAddCompanyModal.value = false;
  }

</script>

<template>
    <div class="py-4">

      <!-- ---------TITLE---------- -->
      <h1 class="text-2xl text-blue-900 font-bold my-2">គ្រប់គ្រងក្រុមហ៊ុនដែលជ្រើសរើសបុគ្គលិក</h1>
      <p class="text-gray-500">អ្នកអាចបង្កើត និងគ្រប់គ្រងក្រុមហ៊ុនដែលជ្រើសរើសបុគ្គលិក</p>
      <!-- ---------TITLE---------- -->

      <!-- ---------Table and Modal Add---------- -->
      <div class="w-full mt-4">

        <div class="flex items-center justify-between w-full">
          <form action="" class="border border-gray-500 rounded-lg  pe-3">
            <input type="text" name="" id="" class="p-2 outline-0" placeholder="ស្វែងរក...">
            <button :tabindex="-1">
              <v-icon name="bi-search" />
            </button>
          </form>
          <div>
            <button @click="openModal" class="border p-2 rounded-lg border-blue-900 text-blue-900 hover:bg-blue-800 hover:text-white transition">
              បន្ថែមក្រុមហ៊ុន
            </button>
          </div>
        </div>
        
        
        <!-- <TableCompany/> -->
         <TableCompany/>

        <!-- Add Job Modal -->
        <div
          v-if="showAddCompanyModal"
          class="fixed inset-0 bg-[#00000034] flex items-center justify-center z-50"
        >
          <div class="bg-white rounded-lg w-auto p-8">
            <h2 class="text-xl font-bold mb-4 border-b pb-2 border-gray-400">បន្ថែមក្រុមហ៊ុន</h2>

            <form>

                <!-- name company -->
                <div class="flex justify-between mb-2">
                    <div class="mb-2 w-[400px] ">
                        <label class="text-gray-500">ឈ្មោះក្រុមហ៊ុន</label>
                        <input type="text" class="w-full border mt-1 p-2 rounded outline-0" placeholder="បញូលប្រភេទការងាររបស់ក្រុមហ៊ុន"/>
                    </div>
                </div>
                <!-- name company -->

                <!-- location company -->
                <div class="flex justify-between ">
                    <div class="mb-2 w-[400px] ">
                        <label class="text-gray-500">ទីតាំង</label>
                        <select name="" id="" class="w-full border mt-1 rounded resize-none p-2 outline-0 appearance-none">
                            <option value="" selected disabled class="">ជ្រើសទីតាំង</option>
                            <option value="">Phnom Penh</option>
                            <option value="">Kompong Cham</option>
                        </select>
                    </div>
                </div>
                <!-- location company -->

        
              
              <!-- button group -->
              <div class="flex justify-end gap-2 mt-4">
                <button type="button" @click="closeModal" class="px-3 py-1 border rounded">Cancel</button>
                <button type="submit" class="px-3 py-1 border rounded bg-blue-900 text-white">Save</button>
              </div>
              <!-- button group -->
            </form>
          </div>
        </div>
        <!-- Add Job Modal -->
        
      </div>
      <!-- ---------Table and Modal Add---------- -->
  </div>


</template>