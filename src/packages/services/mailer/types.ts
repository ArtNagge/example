// DTO

export class MailerDto implements Readonly<MailerDto> {
  message: string
  subject: string
  receiver: string
}
