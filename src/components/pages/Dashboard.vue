<template>
    <div>
    <!--navbar position-->
    <Navbar/>
    <Alert></Alert>
    <div class="container-fluid">
      <div class="row">
        <!--sidebar position-->
        <Sidebar/> 
        <!--products positon-->
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
            <router-view></router-view>
        </main>  
      </div>
    </div>

    </div>
</template>
<script>
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Alert from './AlterMessage';

export default {
    components:{
        Navbar,
        Sidebar,
        Alert
    },
};
</script>

