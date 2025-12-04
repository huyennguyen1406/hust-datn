package hust.edu.vn.authen.service.email;

import hust.edu.vn.authen.bean.common.Message;
import hust.edu.vn.authen.bean.email.EmailDetails;
import hust.edu.vn.authen.config.EmailProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {
    private final JavaMailSender mailSender;
    private final EmailProperties emailProperties;


    public Message sendSimpleMail(EmailDetails details) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();

            mailMessage.setFrom(emailProperties.getUsername());
            mailMessage.setTo(details.getRecipient());
            mailMessage.setText(details.getMsgBody());
            mailMessage.setSubject(details.getSubject());

            mailSender.send(mailMessage);
            return new Message().setStatus(HttpStatus.ACCEPTED.value()).setMessage("Mail Sent Successfully...");
        } catch (Exception e) {
            log.error("Mail Sent Error: ", e);
            return new Message().setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value()).setMessage("Mail Sent Error...");
        }
    }
}
