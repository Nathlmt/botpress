import { FormAdvancedSetting, FormField } from '../../utils/typings'
import { FormData } from 'botpress/sdk'

export interface FormProps {
  bp?: any
  customFields?: {[field: string]: (props: any) => JSX.Element}
  fields: FormField[]
  advancedSettings?: FormAdvancedSetting[]
  formData?: FormData
  renderType?: string
  onUpdate: (data: { [key: string]: string }) => void
}
