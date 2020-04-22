<template>

    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="row mt-4">
        
            <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
                <div class="card border-0 shadow-sm">
                    <div style="{background:`url(${item.imageUrl})`} height: 150px; background-size: cover; background-position: center"
                    >
                    </div>
                    <div class="card-body">
                    <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
                    <h5 class="card-title">
                        <a href="#" class="text-dark">{{item.title}}</a>
                    </h5>
                    <p class="card-text">{{item.content}}</p>
                    <div class="d-flex justify-content-between align-items-baseline">
                        <div class="h5" v-if="!item.price">{{item.origin_price}} 元</div>
                        <del class="h6">原價 {{item.origin_price}} 元</del>
                        <div class="h5">現在只要 {{item.price}} 元</div>
                    </div>
                    </div>
                    <div class="card-footer d-flex">
                    <button @click="getProduct(item)" type="button" class="btn btn-outline-secondary btn-sm">
                        <i class="fas fa-spinner fa-spin"></i>
                        查看更多
                    </button>
                    <button @click="addtoCart(item.id)" type="button" class="btn btn-outline-danger btn-sm ml-auto">
                        <i class="fas fa-spinner fa-spin"></i>
                        加到購物車
                    </button>
                    </div>
                </div>
            </div>
        </div>
        <!--Modal-->
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">{{ product.title}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <img :src="product.image" class="img-fluid" alt=""/>
                    <blockquote class="blockquote mt-3">
                        <p class="mb-0">{{ product.content}}</p>
                        <footer class="blockquote-footer text-right">{{ product.description }}</footer>
                    </blockquote>
                    <div class="d-flex justify-content-between align-items-baseline">
                        <div class="h4" v-if="!product.price">{{ product.orgin_price }} 元</div>
                        <del class="h6" v-if="!product.price">原價 {{ product.orgin_price }} 元</del>
                        <div class="h4" v-if="product.price">現在只要  {{ product.price }} 元</div>
                    </div>
                    <select name="" class="form-control mt-3" v-model="product.num">
                        <option :value="num" v-for="num in 10" :key='num'>
                            選購{{num}}{{product.unit}}
                        </option>
                    </select>
                </div>

                <div class="modal-footer">
                    <div class="text-muted text-nowrap mr-3">
                        小記<strong>{{ product.num * product.price }}</strong> 元
                    </div>
                    <button @click="addtoCart(product.id, product.num)" type="button" class="btn btn-primary">加入購物車</button>
                </div>
                </div>
            </div>
        </div>
        <!--Modal-->
        <table class="table">
            <thead>
                <th></th>
                <th>品名</th>
                <th>數量</th>
                <th>單價</th>
            </thead>
            <tbody>
                <tr v-for="item in cart.carts" :key="item.id">
                <td class="align-middle">
                    <button type="button" class="btn btn-outline-danger btn-sm"
                    @click="removeCartItem(item.id)">
                    <i class="far fa-trash-alt"></i>
                    </button>
                </td>
                <td class="align-middle">
                    {{ item.product.title }}
                    <!-- <div class="text-success" v-if="item.coupon">
                    已套用優惠券
                    </div> -->
                </td>
                <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                <td class="align-middle text-right">{{ item.final_total }}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                <td colspan="3" class="text-right">總計</td>
                <td class="text-right">{{ cart.total }}</td>
                </tr>
                <tr>
                <td colspan="3" class="text-right text-success">折扣價</td>
                <td class="text-right text-success">{{ cart.final_total }}</td>
                </tr>
            </tfoot>
            </table>
            <div class="input-group mb-3 input-group-sm">
            <input v-model="coupon_code" type="text" class="form-control" placeholder="請輸入優惠碼">
            <div class="input-group-append">
                <button @click="addCouponCode" class="btn btn-outline-secondary" type="button">
                套用優惠碼
                </button>
            </div>
            <!--表單-->
                <div class="my-5 row justify-content-center">
                    <form class="col-md-6" @submit.prevent="createOrder">
                        <div class="form-group">
                        <label for="useremail">Email</label>
                        <input type="email" class="form-control" name="email" id="useremail"
                            v-model="form.user.email" placeholder="請輸入 Email" required
                            v-validate=" 'required|email'">
                        <span v-if="errors.has('email')" class="text-danger">
                            {{errors.first('email')}}
                        </span>
                        </div>

                        <div class="form-group">
                        <label for="username">收件人姓名</label>
                        <input type="text" class="form-control" name="name" id="username"
                            v-model="form.user.name" placeholder="輸入姓名" required :class="{'is-invalid':errors.has('name')}">
                        <span  v-if="errors.has('name')" class="text-danger">姓名必需輸入</span>
                        </div>

                    
                    
                        <div class="form-group">
                        <label for="usertel">收件人電話</label>
                        <input type="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話">
                        </div>
                    
                        <div class="form-group">
                        <label for="useraddress">收件人地址</label>
                        <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address"
                            placeholder="請輸入地址">
                        <span class="text-danger">地址欄位不得留空</span>
                        </div>
                    
                        <div class="form-group">
                        <label for="comment">留言</label>
                        <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
                        </div>
                        <div class="text-right">
                        <button class="btn btn-danger">送出訂單</button>
                        </div>
                    </form>
                </div>
            <!--表單-->
            </div>
    </div>
</template>
<script>
import $ from 'jquery';
export default {
    data(){
        return{
            products:[],
            isLoading:false,
            product:{},
            status:{
                loadingItem:''
            },
            coupon_code:'',
            form:{
                user:{
                    name:'',
                    email:'',
                    tel:'',
                    address:'',
                },
                message:''
            },
        }
    },
    methods: {
        getProducts(){
            const vm=this;
            const api=`https://vue-course-api.hexschool.io/yop/api/:api_path/products?page=:page`;
            vm.isLoading=true;
            this.$http.get(api).then((response)=>{
                vm.products=response.data.products;
                console.log(response);
                vm.isLoading=false;
            });
        },
        getProduct(id){
            const vm = this;
            const url =`https://vue-course-api.hexschool.io/yop/api/:api_path/product/:id`
            vm.status.loadingItem=id;
            this.$http.get(url).then((response)=>{
                vm.product=response.data.product;
                $('#productModal').modal('show');
                console.log(response);
                vm.status.loadingItem='';
            })
        },
        addtoCart(id,qty=1){
            const vm= this;
            const url=`https://vue-course-api.hexschool.io/yop/api/:api_path/cart`
            vm.status.loading=id;
            const cart= {
                product_id:id,
                qty
            }
            this.$http.post(url,{data:cart}).then((response)=>{
                console.log(response);
                vm.status.loadingItem='';
                vm.getCart();
                $('#productModal').modal('hide');
            })
        },
        getCart(){
            const vm=this;
            const url=`https://vue-course-api.hexschool.io/api/yop/:api_path/cart`
            vm.isLoading=true;
            this.$http.get(url).then((response)=>{
                console.log(response);
                vm.isLoading=false;
            })
        },
        removeCartItem(){  //有id會跳錯 先暫時拿掉 
            const vm= this;
            const url=`https://vue-course-api.hexschool.io/api/yop/:api_path/cart/:id`
            vm.isLoading=true;
            this.$http.delete(url).then((response)=>{
                vm.getCart();
                console.vm.log(response);
                vm.isLoading=false;
                
            })
        },
        addCouponCode(){
            const vm= this;
            const url=`https://vue-course-api.hexschool.io/api/yop/:api_path/coupon`
            const coupon={
                code:vm.coupon_code,
            }
            vm.isLoading=true;
            this.$http.post(url,{data:coupon}).then((response)=>{
                console.log(response);
                vm.getCart();
                vm.isLoading=false;
            })
        },
        createOrder(){
            this.$validator.validate().then((result)=>{
                if(!result){
                    const vm=this;
                    const url='https://vue-course-api.hexschool.io/api/yop/:api_path/order';
                    const order=vm.form;
                    vm.isLoading=true;
                    this.$http.post(url,{data:order}).then((response)=>{
                        console.log('訂單已成立',response);
                        if(response.data.success){
                            vm.$router.push(`/customer_chechout/${response.data.orderId}`);
                            vm.isLoading=false;
                        }else{
                            console.log('欄位不完整');
                        }
                        vm.isLoading=false;
                    });
                }else{
                    console.log('欄位不完整');
                }
            })
            // this.$http.post(url,{data:order}).then((response)=>{
            //     console.log('訂單已成立',response);
            //     vm.isLoading=false;
            // });
        }
        
    },
    created() {
            this.getProducts();
            this.getCart();
    }
}
</script>