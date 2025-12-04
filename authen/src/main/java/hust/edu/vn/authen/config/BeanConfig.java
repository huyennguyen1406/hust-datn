package hust.edu.vn.authen.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
@Slf4j
public class BeanConfig {
    @Bean
    public JavaMailSender javaMailSender(EmailProperties emailProps) {
        JavaMailSenderImpl jm = new JavaMailSenderImpl();
        jm.setHost(emailProps.getHost());
        jm.setPort(emailProps.getPort());
        jm.setUsername(emailProps.getUsername());
        jm.setPassword(emailProps.getPassword());
        Properties props = jm.getJavaMailProperties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        return jm;
    }
}
