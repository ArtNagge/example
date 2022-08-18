import { VFC } from 'react'

import Link from 'next/link'

import Typography from '@components/Typography'

const AdminPage: VFC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
      <Link scroll={false} href="/admin/projects" passHref>
        <Typography variant="subtitle1" color="label-secondary">
          Projects
        </Typography>
      </Link>
      <Link scroll={false} href="/admin/create-project" passHref>
        <Typography variant="subtitle1" color="label-secondary">
          Create Project
        </Typography>
      </Link>
    </div>
  )
}

export default AdminPage
