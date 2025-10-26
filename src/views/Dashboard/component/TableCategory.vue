<script setup>
    import { useCategoryStore } from "@/stores/category";
import { defineStore } from "pinia";
    import { ref, computed, onMounted } from "vue";
import { useToast } from "vue-toastification";

    // Total fake items and pagination settings
    // const totalItems = 50; // total rows

    // add props
    const props = defineProps({
  searchTerm: { type: String, default: '' },
})

    const perPage = 5;
    const currentPage = ref(1);
    const categoryStore = useCategoryStore()
    const isloading = ref(false)
    const toast = useToast()

    // create function filter
    const filterCategory = computed(() => {
        if(!props.searchTerm) return categoryStore.categories;
        
        return categoryStore.categories.filter((cat) =>
           cat.category.toLowerCase().includes(props.searchTerm.toLowerCase())
        )
    })

    // Total pages
    const totalPages = computed(() => Math.ceil(filterCategory.value.length / perPage));

    // Generate rows for the current page
    const pageItems = computed(() => {
        const start = (currentPage.value - 1) * perPage

        return filterCategory.value.slice(start, start + perPage)
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

    async function confirmDelete() {
      try{
        isloading.value = true
        await categoryStore.deleteCategory(deleteId.value)
        await categoryStore.fetchallcategory()
        closeModalDelete();
        toast.success("Delete success")
      }catch(e){
        console.log("Error fetch category")
      }finally{
        isloading.value = false
      }
    }


    // --- Modal Update ---
    const showUpdateCategoryModal = ref(false);
    const updateCategory = ref({})
   

    function openModalUpdate(cat) {
      updateCategory.value = {...cat} // clone object so editing won't affect original
      showUpdateCategoryModal.value = true;
    }

    function closeModalUpdate() {
      showUpdateCategoryModal.value = false;
      updateCategory.value = {};
    }

    async function saveUpdate() {
      try{
        isloading.value = true
        await categoryStore.updatecategory(updateCategory.value)
        await categoryStore.fetchallcategory()
        closeModalUpdate();
        toast.success("Update Successfully")
      }catch(e){
        console.log("Error fetching categories")
      }finally{
        isloading.value = false
      }
    }

    onMounted( async () => {
        try{
            await categoryStore.fetchallcategory();
            console.log(categoryStore.categories)
        }catch(e){

        }
    })
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
            <tr v-for="(cat, index) in pageItems" :key="cat.id">
            <td class="p-2 border border-gray-500 text-blue-900 text-center">{{ index + 1 + (currentPage - 1) * perPage }}</td>
            <td class="p-2 border border-gray-500 text-blue-900">
                <p>{{ cat.category }}</p>
            </td>
            
            <td class="p-2 border border-gray-500 text-blue-900 text-center">
                <span class="bg-gray-200 text-gray-700 px-1 rounded-lg">{{ cat.created_at }}</span>
            </td>
            <td class="p-2 border border-gray-500 text-blue-900 text-center">
                <span class="bg-gray-200 text-gray-700 px-1 rounded-lg">{{ cat.updated_at }}</span>
            </td>
            <td class="p-2 border border-gray-500 text-blue-900">
                <div class="flex justify-center">
                <button @click="openModalUpdate(cat)"  class="mx-1 border p-1 rounded-lg border-amber-600 text-amber-600">
                    <v-icon name="bi-pen-fill" />
                </button>
                <button @click="openModalDelete(cat.id)" class="mx-1 border p-1 rounded-lg border-red-600 text-red-600">
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
            <button type="button" @click="closeModalUpdate" class="px-3 py-1 border rounded">Cancel</button>
            <button :disabled="isloading" type="submit" @click="confirmDelete" :class="isloading ? `px-3 py-1 border rounded bg-gray-400 text-white`: 'px-3 py-1 border rounded bg-blue-900 text-white'">
                        {{ isloading ? 'ចាំតិចបងដូចបងចាំគេ...' : 'យល់ព្រមណាបងសុំលាញ់' }}
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
                <input v-model="updateCategory.category" type="text" class="w-full border mt-1 p-2 rounded outline-0" placeholder="បញូលប្រភេទការងាររបស់ក្រុមហ៊ុន"/>
            </div>
            </div>
            <!-- name / salary-range -->


            
            <!-- button group -->
            <div class="flex justify-end gap-2 mt-4">
            <button type="button" @click="closeModalUpdate" class="px-3 py-1 border rounded">Cancel</button>
            <button :disabled="isloading" type="submit" @click="saveUpdate" :class="isloading ? `px-3 py-1 border rounded bg-gray-400 text-white`: 'px-3 py-1 border rounded bg-blue-900 text-white'">
                        {{ isloading ? 'Waite for update' : 'Save' }}
                    </button>
            </div>
            <!-- button group -->
        </form>
        </div>
    </div>
    <!-- Modal Update -->
    </div>

</template>
