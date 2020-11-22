<template>
    <button @click="changeMusic">
        <svg-icon type="mdi" :path="icon"></svg-icon>
    </button>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiSkipPreviousCircleOutline } from '@mdi/js'; 
export default {
    name: "Previous",
    components: {
        SvgIcon,
    },
    data() {
        return {
            icon: mdiSkipPreviousCircleOutline,
        }
    },
    methods: {
        changeMusic() {
            this.$emit("changeMusic", false);
        }
    },
}
</script>

<style scoped>
svg {
    width: 40px;
    height: 40px;
}
button {
    font-size: 0;
}
</style>