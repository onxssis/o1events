import { Component, Vue } from 'nuxt-property-decorator'

@Component
class ResourceFormMixin extends Vue {
  errors: Array<string> = []
  dto: any = undefined
  uploading = false
  uploadPreset = ''
  file = ''
  previewImageSrc = ''

  async uploadCover() {
    this.uploading = true

    const form = new FormData()
    form.append('file', this.file)
    form.append('upload_preset', this.uploadPreset)

    const response = await fetch(
      'https://api.cloudinary.com/v1_1/onxssis/image/upload',
      {
        body: form,
        method: 'POST',
      }
    )
    const file = await response.json()

    this.uploading = false
    this.dto.cover = file.secure_url
  }

  handleUpload() {
    const file = (this.$refs.file as HTMLFormElement).files[0]

    this.previewImage(file)
    this.file = file
  }

  previewImage(file: Blob) {
    const reader = new FileReader()

    reader.onload = () => {
      this.previewImageSrc = reader.result as string
    }
    reader.readAsDataURL(file)
  }

  onSubmitError(error: any) {
    if (error.response) {
      const message = error.response.data.message

      this.errors = Array.isArray(message) ? message : [message]
    } else {
      this.errors = ['An unexpected error occured. Please try again!']
    }
  }
}
export default ResourceFormMixin
