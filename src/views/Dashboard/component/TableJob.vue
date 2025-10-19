<script setup>
    import { ref, computed } from "vue";

    // Total fake items and pagination settings
    const totalItems = 50; // total rows
    const perPage = 5;
    const currentPage = ref(1);

    // Total pages
    const totalPages = computed(() => Math.ceil(totalItems / perPage));

    // Generate rows for the current page
    const pageItems = computed(() => {
        const start = (currentPage.value - 1) * perPage + 1;
        const end = Math.min(start + perPage - 1, totalItems);
        const items = [];
        for (let i = start; i <= end; i++) {
            items.push(i);
        }
        return items;
    });

    function goToPage(page) {
        currentPage.value = page;
    }


    // for modal delete
    const showDeleteJobModal = ref(false);
    const deleteId = ref(null);

    function openModalDelete(id) {
      deleteId.value = id;
      showDeleteJobModal.value = true;
    }

    function closeModalDelete() {
      deleteId.value = null;
      showDeleteJobModal.value = false;
    }

    function confirmDelete() {
      console.log("Delete job with ID:", deleteId.value);
      // TODO: call your API delete function here
      closeModalDelete();
   }


    // --- Modal Update ---
    const showUpdateJobModal = ref(false);

    const updateJob = ref({
      id: null,
      name: "",
      salary: "",
      desc: "",
      type: "",
      company: "",
      location: "",
      link: ""
    });

    function openModalUpdate(id) {
      updateJob.value = id; // clone object so editing won't affect original
      showUpdateJobModal.value = true;
    }

    function closeModalUpdate() {
      showUpdateJobModal.value = false;
      updateJob.value = {};
    }

    function saveUpdate() {
      console.log("Update job:", updateJob.value);
      // TODO: Call API update
      // Example: await axios.put(`/api/jobs/${updateJob.value.id}`, updateJob.value)

      showUpdateJobModal.value = false;
    }
</script>

<template>
  <div>
    <div class="mt-3 h-[55vh] overflow-hidden">
        <table class="w-full border border-blue-900">
        <thead>
            <tr class="bg-white">
            <td class="text-gray-500 p-2 border w-[4%] text-center">#</td>
            <td class="text-gray-500 p-2 border w-[20%]">ឈ្មោះការងារ / អំពីការងារ</td>
            <td class="text-gray-500 p-2 border">ប្រាក់ខែ</td>
            <td class="text-gray-500 p-2 border w-[13%]">ប្រភេទការងារ</td>
            <td class="text-gray-500 p-2 border w-[30%]">ក្រុមហ៊ុន/ដំណរលីង</td>
            <td class="text-gray-500 p-2 border w-[12%]">ទីតាំង</td>
            <td class="text-gray-500 p-2 border">អ្នកផុស</td>
            <td class="text-gray-500 p-2 border w-[15%] text-center">ថ្ងៃផុស</td>
            <td class="text-gray-500 p-2 border text-center">Action</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="i in pageItems" :key="i">
            <td class="p-2 border border-gray-500 text-blue-900 text-center">{{ i }}</td>
            <td class="p-2 border border-gray-500 text-blue-900">
                <p>Frond-End-Developer</p>
                <span class="line-clamp-1 text-gray-500">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit vitae.
                </span>
            </td>
            <td class="p-2 border border-gray-500 text-blue-900">
                <span class="font-bold">400$-500$</span>
            </td>
            <td class="p-2 border border-gray-500 text-blue-900">
                Junior Level
            </td>
            <td class="p-2 border border-gray-500 text-blue-900">
                <p class="line-clamp-1">Jing Hub Company CO.LTD</p>
                <router-link to="#" class="text-blue-500">
                <span class="line-clamp-1">
                    Apply Link: https://oh-vue-icons.js.org/
                </span>
                </router-link>
            </td>
            <td class="p-2 border border-gray-500 text-blue-900">
                Phnom Penh
            </td>
            <td class="p-2 border border-gray-500 text-blue-900">
                Pujork
            </td>
            <td class="p-2 border border-gray-500 text-blue-900 text-center">
                <span class="bg-gray-200 text-gray-700 px-1 rounded-lg">2025-08-23</span>
            </td>
            <td class="p-2 border border-gray-500 text-blue-900">
                <div class="flex">
                <button class="mx-1 border p-1 rounded-lg">
                    <v-icon name="bi-eye" />
                </button>
                <button @click="openModalUpdate" class="mx-1 border p-1 rounded-lg border-amber-600 text-amber-600">
                    <v-icon name="bi-pen-fill" />
                </button>
                <button @click="openModalDelete" class="mx-1 border p-1 rounded-lg border-red-600 text-red-600">
                    <v-icon name="bi-trash" />
                </button>
                </div>
            </td>
            </tr>
        </tbody>
        </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-end mt-3 gap-2">
        <button
        class="px-3 py-1 border rounded"
        :disabled="currentPage === 1"
        @click="currentPage--"
        >
        Prev
        </button>

        <button
        v-for="page in totalPages"
        :key="page"
        class="px-3 py-1 border rounded"
        :class="{ 'bg-blue-500 text-white': currentPage === page }"
        @click="goToPage(page)"
        >
        {{ page }}
        </button>

        <button
        class="px-3 py-1 border rounded"
        :disabled="currentPage === totalPages"
        @click="currentPage++"
        >
        Next
        </button>
    </div>

             <!-- Modal delete -->
  <div
    v-if="showDeleteJobModal"
    class="fixed inset-0 flex items-center justify-center bg-[#00000034]"
  >
    <div class="bg-white p-5 rounded-lg shadow-lg w-96">
      
      <h2 class="text-lg font-bold mb-3 text-red-600 border-b border-gray-500 pb-2">លុប</h2>
      <form action="" class="flex items-center justify-between">
        <div>
          <p class="mb-4">Are you sure that you want delete</p>
        </div>

        <div class="flex justify-end gap-2 mb-4">
          <button @click="closeModalDelete" class="px-3 py-1 border rounded">No</button>
          <button
            @click="confirmDelete"
            class="px-3 py-1 border rounded bg-red-600 text-white"
          >
            Yes
          </button>
        </div>
      </form>
      
    </div>
  </div>
  <!-- Modal delete -->

  <!-- Modal Update -->
  <div
    v-if="showUpdateJobModal"
    class="fixed inset-0 bg-[#00000034] flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg w-auto p-8">
      <h2 class="text-xl font-bold mb-4 border-b pb-2">កែប្រែទិន្នន័យ</h2>

      <form>

        <!-- name / salary-range -->
        <div class="flex justify-between ">
          <div class="mb-2 w-1/2 me-2">
            <label class="text-gray-500">ឈ្មោះការងារ</label>
            <input type="text" class="w-full border mt-1 p-2 rounded outline-0" placeholder="បញូលឈ្មោះការងារ"/>
          </div>
          <div class="mb-2 w-1/2">
            <label class="text-gray-500">ប្រាក់ខែ</label>
            <input type="text" class="w-full border mt-1 p-2 rounded outline-0" placeholder="e.g: 400$ - 500$"/>
          </div>
        </div>
        <!-- name / salary-range -->

        
        <!-- description -->
        <div class="mb-2">
          <label class="text-gray-500">Description</label>
          <textarea rows="5" class="w-full border mt-1 rounded resize-none p-2 outline-0" placeholder="Job Descriptions"></textarea>
        </div>
        <!-- description -->

        <!-- job type -->
        <div class="mb-2 border-t border-gray-400 pt-2">
          <label class="text-gray-500">ប្រភេទការងារ</label>
          <select name="" id="" class="w-full border mt-1 rounded resize-none p-2 outline-0 appearance-none">
            <option value="" selected disabled class="">ជ្រើសប្រភេទការងារ</option>
            <option value="">Junior</option>
            <option value="">Senior</option>
            <option value="">Employee</option>
          </select>
        </div>
        <!-- job type -->

        <!-- company and location -->
        <div class="flex justify-between ">
          <div class="mb-2 w-1/2 me-2">
            <label class="text-gray-500">ក្រុមហ៊ុន</label>
            <select name="" id="" class="w-full border mt-1 rounded resize-none p-2 outline-0 appearance-none">
              <option value="" selected disabled class="">ជ្រើសរើសក្រុមហ៊ុន</option>
              <option value="">Jing Hub</option>
              <option value="">Jab Hing</option>
              <option value="">Jab Tea</option>
            </select>
          </div>
          <div class="mb-2 w-1/2">
            <label class="text-gray-500">ទីតាំង</label>
            <select name="" id="" class="w-full border mt-1 rounded resize-none p-2 outline-0 appearance-none">
              <option value="" selected disabled class="">ជ្រើសរើសទីតាំង</option>
              <option value="">Phnom Penh</option>
              <option value="">Kandal</option>
              <option value="">Kompong Cham</option>
            </select>
          </div>
        </div>
        <!-- company and location -->

        <!-- apply link -->
        <div class="mb-2">
          <label class="text-gray-500">ដំណរលីង</label>
          <input rows="5" class="w-full border mt-1 rounded p-2 outline-0" placeholder="Apply Link" />
        </div>
        <!-- apply link -->
        
        <!-- button group -->
        <div class="flex justify-end gap-2 mt-4">
          <button type="button" @click="closeModalUpdate" class="px-3 py-1 border rounded">Cancel</button>
          <button type="submit" @click="saveUpdate" class="px-3 py-1 border rounded bg-blue-900 text-white">Save</button>
        </div>
        <!-- button group -->
      </form>
    </div>
  </div>
  <!-- Modal Update -->
  </div>
       
</template>