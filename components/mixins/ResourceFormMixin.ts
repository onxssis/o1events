import { Component, Vue } from 'nuxt-property-decorator'

@Component
class ResourceFormMixin extends Vue {
  errors: Array<string> = []
  dto: any = undefined
  uploading = false
  uploadPreset = ''

  async uploadCover(e: any) {
    this.uploading = true

    const files = e.target.files
    const form = new FormData()
    form.append('file', files[0])
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
