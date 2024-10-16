<template>

    <div style="height: 100%;  padding: 2%;">
        <h4 style="height: 10%;width: 15%;">工具</h4>
        <div class="all">
            <div style="display: flex;  flex-direction: column; align-items: center; ">
                <svg-icon class="tool"  name="tool" />
                <p>2021软件工程1班</p>
            </div>
            <div style="display: flex;  flex-direction: column; align-items: center; ">
                <svg-icon class="tool"  name="tool" />
                <p style="text-align: center;">2021软件工程2班</p>
            </div>
            <div style="display: flex;  flex-direction: column; align-items: center; ">
                <svg-icon class="tool"  name="tool" />
                <p style="text-align: center;">2021软件工程3班</p>
            </div>
            <div style="display: flex;  flex-direction: column; align-items: center; ">
                <svg-icon class="tool"  name="tool" />
                <p style="text-align: center;">2021软件工程4班</p>
            </div>

        </div>
    </div>
</template>
<script setup lang="ts">
</script>
<style scoped>
.all {
    
    overflow-y: auto;
    height: 90%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
}

.tool {

    width: 60px;
    height: 60px;
    border-radius: 10px;
    border: 1px  solid white;

}

.tool:hover {
    cursor: pointer;
    transform: translateY(-5px);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    /* 增强阴影效果 */
}
</style>