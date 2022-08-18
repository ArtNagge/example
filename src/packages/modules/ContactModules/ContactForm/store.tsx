import Typography from '@components/Typography'

export const SEND_MESSAGE = 'send message'
export const SENDED_MESSAGE = 'message sent'

export const toastMessageSuccess = (
  <>
    <Typography color="label-secondary" variant="subtitle2">
      Yep, it’s been sent!
    </Typography>
    <Typography color="label-quaternary" variant="subtitle3">
      we will get back to you!
      <br />
      (or not, who knows)
    </Typography>
  </>
)

export const toastMessageError = (
  <>
    <Typography color="label-secondary" variant="subtitle2">
      Sorry, something went wrong.
    </Typography>
    <Typography color="label-quaternary" variant="subtitle3">
      сheck all fields
    </Typography>
  </>
)
