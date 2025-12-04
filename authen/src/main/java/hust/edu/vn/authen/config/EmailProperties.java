package hust.edu.vn.authen.config;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "spring.mail")
@Data
@Slf4j
public class EmailProperties {
    private String host;
    private int port;
    private String username;
    private String password;
}
