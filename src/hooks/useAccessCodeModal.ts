import { useState } from "react"
import type { accessCodeFormData } from "@/validations/access-code-schema"

export function useAccessCodeModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<accessCodeFormData | null>(null)

  const openModal = (data: accessCodeFormData) => {
    setFormData(data)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setFormData(null)
  }

  return {
    isOpen,
    formData,
    openModal,
    closeModal
  }
}

export  function useSuccessModal() {
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)

  const openSuccessModal = () => {
    setIsSuccessOpen(true)
  }
  const closeSuccessModal = () => {
    setIsSuccessOpen(false)
  }
  return {
    isSuccessOpen,
    openSuccessModal,
    closeSuccessModal
  }
}

export function useErrorModal() {
  const [isErrorOpen, setIsErrorOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const openErrorModal = (message?: string) => {
    setErrorMessage(message || 'An error occurred')
    setIsErrorOpen(true)
  }

  const closeErrorModal = () => {
    setIsErrorOpen(false)
    setErrorMessage('')
  }

  return {
    isErrorOpen,
    errorMessage,
    openErrorModal,
    closeErrorModal
  }
}
