import { useState } from 'react'
export const useField = (type, placeholder) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  const tagProps = () => {
    return { type, value, onChange, placeholder }
  }

  return { type, value, onChange, reset, tagProps, placeholder }
}
