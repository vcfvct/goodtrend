import { registerEmailService, type SendEmailArguments } from '@evershop/evershop/lib/mail/emailHelper';
import nodemailer from 'nodemailer';

export default async () => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });

  registerEmailService({
    sendEmail: async (args: SendEmailArguments) => {
      await transporter.sendMail({
        from: args.from,
        to: args.to,
        subject: args.subject,
        html: args.body
      });
    }
  });
};
