import { useLang, get } from '@utils/use-lang'
import { ServiceConfig } from './ContactForm'

export interface FormValues {
  name: string
  email: string
  subject: string
  message: string
  'form-name': string
  'source_url': string
}

const encodeFormData = (data: FormValues, contentType: string) => {
  if (contentType === `application/json`) {
    return JSON.stringify(data)
  }
  if (contentType === `application/x-www-form-urlencoded`) {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + `=` + encodeURIComponent(data[key as keyof FormValues]))
      .join(`&`)
  }
  return JSON.stringify(data)
}

export const handleSubmit = async (
  serviceConfig: ServiceConfig, values: FormValues, clearForm: () => void, setStatus: (msg: string) => void
) => {
  const { url, contentType } = serviceConfig
  const text = get(useLang())

  if (typeof values[`form-name`] === `string` && values[`form-name`].length === 0) {
    values[`form-name`] = `next-ghost-contact`
  } else { //early return if robot
    clearForm()
    setStatus(text(`MESSAGE_SENT`))
    return
  }

  const postURL = (url || `/`)

  // reset and show message as post can be slow!
  clearForm()
  setStatus(text(`ONE_SECOND`))

  console.log(serviceConfig.url)
  console.log({ 'Content-Type': contentType })
  console.log(encodeFormData(values, contentType))

  fetch(postURL, {
    method: `POST`,
    headers: { 'Content-Type': contentType },
    body: encodeFormData(values, contentType),
  }).then(() => {
    clearForm()
    setStatus(text(`MESSAGE_SENT`))
    //remove message after 10 seconds
    window.setTimeout(() => setStatus(''), 30000)
  }).catch((error) => {
    clearForm()
    setStatus(`${text(`SENDING_FAILED`)}: ${error.message}.`)
    //remove message after 10 seconds
    window.setTimeout(() => setStatus(''), 60000)
  })
}
