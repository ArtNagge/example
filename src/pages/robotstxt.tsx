import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { res } = context

  res.setHeader('Content-type', 'text/plain')

  try {
    res.write('robots' ?? '')
  } catch {
    res.write('')
  }

  res.end()

  return {
    props: {},
  }
}

const RobotsTxt = () => {
  return <></>
}

export default RobotsTxt
