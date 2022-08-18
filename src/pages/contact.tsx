import { ToastContainer } from 'react-toastify'

import Head from 'next/head'

import ContactForm from '@modules/ContactModules/ContactForm'

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact page</title>
      </Head>
      <ToastContainer hideProgressBar />
      <ContactForm />
    </>
  )
}
