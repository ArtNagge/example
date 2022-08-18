import Head from 'next/head'

import AboutFirstScreen from '@modules/AboutModules/AboutFirstScreen'
import AboutInfoScreen from '@modules/AboutModules/AboutInfoScreen'
import OurClientsScreen from '@modules/AboutModules/OurClientsScreen'
import ServicesProvideScreen from '@modules/AboutModules/ServicesProvideScreen'

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About us</title>
      </Head>
      <AboutFirstScreen />
      <AboutInfoScreen />
      <OurClientsScreen />
      <ServicesProvideScreen />
    </>
  )
}
