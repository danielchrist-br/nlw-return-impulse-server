import nodemailer from 'nodemailer';
import { MailAdapter, SendMaildata } from '../mailAdapter';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d09b7f07efe8df",
    pass: "62333aa2f87ede"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMaildata) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Daniel Rodrigues <diego.schell.f@gmail.com>',
      subject,
      html: body,
    });
  }
};