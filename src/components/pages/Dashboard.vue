<template>
    <div>
        <h1>Medical Devices</h1>
        
<button type="button" class="btn btn-primary mb-2 float-right" data-toggle="modal" data-target="#AddNewModal">
  Add New
</button>

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
            <tbody>
                <tr v-for="modelType in modelTypes" :key="modelType.Id">
                    <th scope="row">{{modelType.Id}}</th>
                    <td>{{modelType.BrandId}}</td>
                    <td>{{modelType.Name}}</td>
                    <td>{{modelType.TypeId}}</td>
                    <td>{{modelType.Description}}</td>
                    <td>
                    <button type="button" 
                        class="btn btn-primary" 
                        @click="viewModel(modelType)" 
                        data-toggle="modal" 
                        data-target="#DeviceModal">
                            View Models
                    </button>
                    </td>
                </tr>
            </tbody>
        </table>


        <!-- Modal -->
        <div class="modal fade" id="DeviceModal" tabindex="-1" aria-labelledby="DeviceModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="DeviceModalLabel">Model List</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                <table class="table table-bordered ">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Data Type</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Model</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        
                    </tr>
                </thead>
                <tbody v-if="sData">
                    <tr v-for="singleData in sData" :key="singleData.Id">
                        <th scope="row">{{singleData.Id}}</th>
                        <td>{{singleData.DataType}}</td>
                        <td>{{singleData.Brand}}</td>
                        <td>{{singleData.Model}}</td>
                        <td>{{singleData.Name}}</td>
                        <td>{{singleData.DisplayName}}</td>
                    </tr>
                </tbody>
                </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>


        <div class="modal fade" id="AddNewModal" ref="addModal" tabindex="-1" aria-labelledby="AddNewModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="AddNewModalLabel">Add New</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="submit">
                <div class="modal-body">
                    
                        <div class="mb-3">
                            <label for="BrandId" class="form-label">Brand Id</label>
                            <input 
                            type="text" 
                            name="BrandId"
                            class="form-control"
                            :class="{'is-invalid' : formError.errors.BrandId}" 
                            id="BrandId" 
                            v-model="form.BrandId"
                            placeholder="Brand Id Here"
                            >
                            <div v-if="formError.errors.BrandId" class="invalid-feedback">
                                {{Object.values(formError.errors.BrandId)[0]}}
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input 
                            type="text" 
                            name="name"
                            class="form-control" 
                            :class="{'is-invalid' : formError.errors.Name}" 
                            id="name" 
                            v-model="form.Name"
                            placeholder="name Here"
                            >
                            <div v-if="formError.errors.Name" class="invalid-feedback">
                                {{Object.values(formError.errors.Name)[0]}}
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="TypeId" class="form-label">Type</label>
                            
                            <select  
                            name="TypeId"
                            class="form-control" 
                            :class="{'is-invalid' : formError.errors.TypeId}" 
                            id="TypeId" 
                            v-model="form.TypeId"
                            >
                            <option value="">Select Type</option>

                            <option :value="deviceType.Id" v-for="deviceType in deviceTypes" :key="deviceType.Id">
                                {{ deviceType.Description}}
                            </option>
                            </select>
                            <div v-if="formError.errors.TypeId" class="invalid-feedback">
                                {{Object.values(formError.errors.TypeId)[0]}}
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="comment" class="form-label">Comment</label>
                            <input 
                            type="text" 
                            name="comment"
                            class="form-control" 
                            :class="{'is-invalid' : formError.errors.Comment}" 
                            id="comment" 
                            v-model="form.Comment"
                            placeholder="comment Here"
                            >
                            <div v-if="formError.errors.Comment" class="invalid-feedback">
                                {{Object.values(formError.errors.Comment)[0]}}
                            </div>
                        </div>

                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Save changes</button>
                </div>
                </form>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'

export default {
  components: {  },
    name: 'Dashboard',
    mounted(){
        this.$store.dispatch("modelTypes")
        this.$store.dispatch("getDeviceType")        
    },
    computed: {
        modelTypes(){
            return this.$store.getters.getModelTypes
        }, 
        deviceTypes(){
            return this.$store.getters.getDeviceTypes
        }
    },
    data(){
        return {
            token: localStorage.getItem('token'),
            showModal: false,
            sData: null,
            form: {
                BrandId: '',
                Name: '',
                TypeId: '',
                Comment: ''
            },
            formError: {
                errors: {}
            }
        }
    },
    methods: {
        clickHandle(){
            $('#AddNewModal').modal('hide')
        },
        Update(){
            console.log('Updated')
        },
        clickCallback(){
            console.log('Clicked')
        },
        viewModel(data){
            // console.log(data)
            let brand = data.BrandId
            let model = data.Name
            axios.get(`api/overview/modeldata/${brand}/${model}`)
                .then(res=> {
                    this.sData= res.data
                })
                .catch(error=> {
                    console.log(error)
                })

            // $('#DeviceModal').modal('show')
        },
        submit(){
            // console.log(this.form)
            axios.post('api/devicemodel', this.form)
                .then(res=> {
                    console.log(res)
                    this.$store.dispatch("modelTypes")
                    $('#AddNewModal').modal('hide')
                })
                .catch(error => {  
                    console.log(error.response)
                    // console.log(Object.values(error.response.data.errors.BrandId)[0])                  
                    if(error.response.status == 400){                        
                        this.formError= error.response.data
                    }
                })
        }
    }
}
</script>

<style >
.pagination{
    
}
.prevClass, .nextClass {
    padding: 3px 5px;
    border: 1px solid #000;
    /* width: 35px; */
    text-align: center;
}
.prev{
    padding: 3px;
    border: 1px solid #000;
    width: 35px;
    text-align: center;
}
.next{
    padding: 3px;
    border: 1px solid #000;
    width: 35px;
    text-align: center;
}
.pageLinkClass{

}
.pageClass{
    padding: 3px;
    border: 1px solid #000;
    width: 35px;
    text-align: center;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>