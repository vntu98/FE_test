<template>
    <div class="account__user">
        <input ref="imageUpload" @change="handleUploadImage" type="file" hidden>
        <div class="account__avatar">
        <img
            :src="renderImage"
            alt="John dove"
            class="account__img"
        />
        </div>
        <div class="account__info">
        <span class="account__name">John doe</span>
        <div class="account__action">
            <button @click="selectImage" class="btn btn--primary">
                <span>Update</span>
            </button>
            <button @click="handleReset" class="btn btn--secondary">
                <span>Remove</span>
            </button>
        </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { checkImageFile } from '@/helpers'

export default {
    data() {
        return {
            avatar: '',
            obj_image: {
                objFile: null,
                base64URL: ''
            }
        }
    },

    computed: {
        ...mapGetters(['currentUser']),

        renderImage() {
            if (this.obj_image.base64URL) return this.obj_image.base64URL;
            else if (this.avatar) return this.avatar;
        }
    },

    methods: {
        ...mapActions([
            'mockUpdateUser',
            'mockUser',
            'mockUserDefault'
        ]),
        
        selectImage() {
            this.$refs.imageUpload.click()
        },

        handleUploadImage(e) {
            if(e.target.files && e.target.files.length) {
                const imageUpload = e.target.files[0];
                
                let check = checkImageFile(imageUpload);

                if(!check) {
                    alert('File tải lên không hợp lệ!');
                    return;
                }

                let reader  = new FileReader();

                reader.addEventListener("load", async () => {
                    let previewSrc = reader.result;
                    this.obj_image.base64URL = previewSrc;
                    this.obj_image.objFile = imageUpload;

                    await this.mockUpdateUser({ avatar: previewSrc })
                }, false);

                if (imageUpload) {
                    reader.readAsDataURL(imageUpload);
                }
                alert('Successfull')
            }
        },

        async handleReset() {
            const userDefault = await this.mockUserDefault()
            await this.mockUpdateUser({ avatar: userDefault.avatar })

            this.avatar = userDefault.avatar
            this.obj_image.base64URL = ''
            alert('Successfull')
        },
    },

    mounted() {
        this.avatar = this.currentUser.avatar
    }
}
</script>