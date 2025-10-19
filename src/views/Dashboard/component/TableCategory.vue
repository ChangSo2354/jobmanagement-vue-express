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
    const showDeleteCategoryModal = ref(false);
    const deleteId = ref(null);

    function openModalDelete(id) {
      deleteId.value = id;
      showDeleteCategoryModal.value = true;
    }

    function closeModalDelete() {
      deleteId.value = null;
      showDeleteCategoryModal.value = false;
    }

    function confirmDelete() {
      console.log("Delete job with ID:", deleteId.value);
      // TODO: call your API delete function here
      closeModalDelete();
    }


    // --- Modal Update ---
    const showUpdateCategoryModal = ref(false);
    const updateCategory = ref(null)
   

    function openModalUpdate(id) {
      updateCategory.value = id; // clone object so editing won't affect original
      showUpdateCategoryModal.value = true;
    }

    function closeModalUpdate() {
      showUpdateCategoryModal.value = false;
      updateJob.value = {};
    }

    function saveUpdate() {
      console.log("Update Category:", updateCategory.value);
      // TODO: Call API update
      // Example: await axios.put(`/api/jobs/${updateJob.value.id}`, updateJob.value)

      showUpdateCategoryModal.value = false;
    }
</script>

<template>

    <div>
            <!-- Table-Data -->
    <div class="mt-3 h-[45vh] overflow-hidden">
        <table class="w-full border border-blue-900">

        <thead>
            <tr class="bg-white">
            <td class="text-gray-500 p-2 border text-center">#</td>
            <td class="text-gray-500 p-2 border ">ប្រភេទការងារ</td>
            <td class="text-gray-500 p-2 border text-center">បានផុស</td>
            <td class="text-gray-500 p-2 border text-center">បានកែប្រែ</td>
            <td class="text-gray-500 p-2 border text-center">Action</td>
            </tr>
        </thead>

        <tbody>
            <tr v-for="i in pageItems" :key="i">
            <td class="p-2 border border-gray-500 text-blue-900 text-center">{{ i }}</td>
            <td class="p-2 border border-gray-500 text-blue-900">
                <p>Junior Level</p>
            </td>
            
            <td class="p-2 border border-gray-500 text-blue-900 text-center">
                <span class="bg-gray-200 text-gray-700 px-1 rounded-lg">2025-08-23</span>
            </td>
            <td class="p-2 border border-gray-500 text-blue-900 text-center">
                <span class="bg-gray-200 text-gray-700 px-1 rounded-lg">2025-08-23</span>
            </td>
            <td class="p-2 border border-gray-500 text-blue-900">
                <div class="flex justify-center">
                <button @click="openModalUpdate(i)"  class="mx-1 border p-1 rounded-lg border-amber-600 text-amber-600">
                    <v-icon name="bi-pen-fill" />
                </button>
                <button @click="openModalDelete(i)" class="mx-1 border p-1 rounded-lg border-red-600 text-red-600">
                    <v-icon name="bi-trash" />
                </button>
                </div>
            </td>
            </tr>
        </tbody>

        </table>
    </div>
    <!-- Table-Data -->

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
        :class="{ 'bg-blue-900 text-white': currentPage === page }"
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
    <!-- Pagination -->

    <!-- Modal delete -->
    <div
        v-if="showDeleteCategoryModal"
        class="fixed inset-0 flex items-center justify-center bg-[#00000034]"
    >
        <div class="bg-white p-5 rounded-lg shadow-lg w-96">

        <h2 class="text-lg font-bold mb-3 text-red-600 border-b border-gray-200 pb-2">លុប</h2>
        <form action="" class="flex items-center justify-between">
            <div>
            <p class="mb-4">តើអ្នកប្រាកដថាលុបមែនឬទេ?</p>
            </div>

            <div class="flex justify-end gap-2 mb-4">
            <button @click="closeModalDelete" class="px-3 py-1 border rounded">អត់ទេ</button>
            <button
                @click="confirmDelete"
                class="px-3 py-1 border rounded bg-red-600 text-white"
            >
                បាទ
            </button>
            </div>
        </form>
        
        </div>
    </div>
    <!-- Modal delete -->


    <!-- Modal Update -->
    <div
        v-if="showUpdateCategoryModal"
        class="fixed inset-0 bg-[#00000034] flex items-center justify-center z-50"
    >
        <div class="bg-white rounded-lg w-auto p-8">
        <h2 class="text-xl font-bold mb-4 border-b pb-2 border-gray-400">កែប្រែប្រភេទការងារ</h2>

        <form>

            <!-- name / salary-range -->
            <div class="flex justify-between ">
            <div class="mb-2 w-[400px] me-2">
                <label class="text-gray-500">ប្រភេទការងារ</label>
                <input type="text" class="w-full border mt-1 p-2 rounded outline-0" placeholder="បញូលប្រភេទការងាររបស់ក្រុមហ៊ុន"/>
            </div>
            </div>
            <!-- name / salary-range -->


            
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
