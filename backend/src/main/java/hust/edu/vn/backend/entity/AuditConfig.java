package hust.edu.vn.backend.entity;

import hust.edu.vn.backend.utility.ContextUtility;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.auditing.DateTimeProvider;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider", dateTimeProviderRef = "dateTimeProvider")
public class AuditConfig {
    @Bean
    public AuditorAware<UUID> auditorProvider() {
        return () -> Optional.ofNullable(ContextUtility.getUserId());
    }

    @Bean
    public DateTimeProvider dateTimeProvider() {
        return () -> Optional.of(Instant.now());
    }
}
