<script setup> 
//   import TableCompany from '../components/TableCompany.vue';  
  import { useLocationStore } from '@/stores/location';
  import TableLocation from '../component/TableLocation.vue';
  import { ref } from 'vue';
import { useToast } from 'vue-toastification';
  // import { useLocationStore } from '@/stores/location';

  const showAddLocationModal = ref(false);
  const locationStore = useLocationStore()
  const toast = useToast();
  const searchTerm = ref('')

  const isloading = ref(false)
  const form = ref({
    name: '',
    poscode: '',
  })


  function openModal() {
    showAddLocationModal.value = true;
  }
  function closeModal() {
    showAddLocationModal.value = false;
  }

  async function handleSubmit(e){
    // prevent refresh page
    e.preventDefault();

    // create object for store data
    const payload = {
      name: form.value.name,
      poscode: form.value.poscode,
    }

    try{
      isloading.value = true
      // send that pbject tpo fuciton createLocation()
    await locationStore.createLocation(payload);
    await locationStore.fetchLocation();
    toast.success('Location was created')
    form.name = ''
    form.poscode = ''
    }catch(e){
      console.error(e)
    }finally{
      // close current modal
      closeModal();
      isloading.value = false
    }
  }

</script>

<template>
    <div class="py-4">

      <!-- ---------TITLE---------- -->
      <h1 class="text-2xl text-blue-900 font-bold my-2">គ្រប់គ្រងទីតាំងក្រុមហ៊ុន</h1>
      <p class="text-gray-500">អ្នកអាចបង្កើត និងគ្រប់គ្រងទីតាំងរបស់ក្រុមហ៊ុន</p>
      <!-- ---------TITLE---------- -->

      <!-- ---------Table and Modal Add---------- -->
      <div class="w-full mt-4">

        <div class="flex items-center justify-between w-full">
          <form action="" class="border border-gray-500 rounded-lg  pe-3">
            <input type="text" v-model="searchTerm" class="p-2 outline-0" placeholder="ស្វែងរក...">
            <button :tabindex="-1">
              <v-icon name="bi-search" />
            </button>
          </form>
          <div>
            <button @click="openModal" class="border p-2 rounded-lg border-blue-900 text-blue-900 hover:bg-blue-800 hover:text-white transition">
              បន្ថែមទីតាំង
            </button>
          </div>
        </div>
        
        
        <!-- <TableCompany/> -->
         <TableLocation :searchTerm="searchTerm"/>

        <!-- Add Job Modal -->
        <div
          v-if="showAddLocationModal"
          class="fixed inset-0 bg-[#00000034] flex items-center justify-center z-50"
        >
          <div class="bg-white rounded-lg w-auto p-8">
            <h2 class="text-xl font-bold mb-4 border-b pb-2 border-gray-400">បន្ថែមទីតាំង</h2>

            <form @submit="handleSubmit">

                <!-- location company -->
                <div class="flex justify-between mb-2">
                    <div class="mb-2 w-[400px] ">
                        <label class="text-gray-500">ទីតាំង</label>
                        <input v-model="form.name" type="text" class="w-full border mt-1 p-2 rounded outline-0" placeholder="បញូលប្រភេទការងាររបស់ក្រុមហ៊ុន"/>
                    </div>
                </div>
                <!-- location company -->

                <!-- location company -->
                <div class="flex justify-between mb-2">
                    <div class="mb-2 w-[400px] ">
                        <label class="text-gray-500">Post Code</label>
                        <input v-model="form.poscode" type="text" class="w-full border mt-1 p-2 rounded outline-0" placeholder="00000"/>
                    </div>
                </div>
                <!-- location company -->

        
              
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
        <!-- Add Job Modal -->
        
      </div>
      <!-- ---------Table and Modal Add---------- -->
  </div>
</template>