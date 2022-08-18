import { ChangeEvent, FormEvent, useEffect } from 'react'
import { useState, VFC } from 'react'
import { toast } from 'react-toastify'

import { motionInfo, motionTitle } from '@modules/HomeModules/FirstScreen/store'
import { requestMail } from '@store/mailer'
import {
  useMailerFailuer,
  useMailerLoading,
  useMailerSuccess,
} from '@store/selectors/mailer'
import { useAppDispatch } from '@store/store'
import { motion } from 'framer-motion'

import Button from '@components/Button'
import Input from '@components/Input'
import Typography from '@components/Typography'

import { useMediaXL } from '@hooks'

import { MailerDto } from '@services/mailer/types'

import 'react-toastify/dist/ReactToastify.css'

import styles from './contact-form.module.scss'
import {
  SEND_MESSAGE,
  SENDED_MESSAGE,
  toastMessageError,
  toastMessageSuccess,
} from './store'

const toastId = 'contact_id'
const initForm = {
  name: '',
  email: '',
  budget: '',
  want: '',
  delivery: '',
  about: '',
}

const ContactForm: VFC = () => {
  const dispatch = useAppDispatch()
  const { matchDownXl } = useMediaXL()
  const [contact, setContact] = useState(initForm)

  const loading = useMailerLoading()
  const error = useMailerFailuer()
  const success = useMailerSuccess()

  useEffect(() => {
    if (success) {
      toast(toastMessageSuccess, {
        toastId,
        className: styles.contact_form_toast,
      })

      setContact(initForm)
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }

    if (error)
      toast(toastMessageError, {
        toastId,
        className: styles.contact_form_toast,
      })
  }, [success, error])

  const handleSend = async (evt: FormEvent) => {
    evt.preventDefault()
    const { name, email, budget, want, delivery, about } = contact

    const message: MailerDto = {
      message: `
my budget range is: ${budget};
i want to make: ${want};
perfect delivery time woud be: ${delivery};
my project is about: ${about}`,
      receiver: email,
      subject: name,
    }

    dispatch(requestMail(message))
  }

  const handleContactData = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e

    setContact((prevCreate) => ({ ...prevCreate, [name]: value }))
  }

  return (
    <div className={styles.contact_form}>

    </div>
  )
}

export default ContactForm
