<template>
  <b-modal id="modal-1" title="BootstrapVue">
    <p class="my-4">Hello from modal!</p>
    <p>{{modelData}}</p>
    <table class="table table-bordered ">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Brand ID</th>
                <th scope="col">Name</th>
                <th scope="col">TypeId</th>
                <th scope="col">Description</th>
                <th scope="col">Handle</th>
            </tr>
        </thead>
        <tbody v-if="modelData">
            <tr v-for="singleData in modelData" :key="singleData.Id">
                <th scope="row">{{singleData.Id}}</th>
                <td>{{singleData.Brand}}</td>
                <td>{{singleData.DataType}}</td>
                <td>{{singleData.BrandId}}</td>
                <td>{{singleData.BrandId}}</td>
                <td>
                    <button class="btn btn-primary" @click="viewModel(singleData)" >View Model</button>
                    <b-button v-b-modal.modal-1>Launch demo modal</b-button>
                </td>
            </tr>
        </tbody>
    </table>
  </b-modal>
</template>
<script>
export default {
  name: "ViewDetails",
  props: ['modelData']
}
</script>