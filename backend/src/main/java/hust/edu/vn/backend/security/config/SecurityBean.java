package hust.edu.vn.backend.security.config;

import hust.edu.vn.backend.security.filter.DashboardFilter;
import hust.edu.vn.backend.security.filter.LoginEntryPoint;
import hust.edu.vn.backend.security.filter.StoreFilter;
import hust.edu.vn.backend.security.service.DashboardApiMatcher;
import hust.edu.vn.backend.security.service.PublicApiMatcher;
import hust.edu.vn.backend.security.service.StoreApiMatcher;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.Pbkdf2PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.ExceptionTranslationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SuppressWarnings("DuplicatedCode")
@Configuration
public class SecurityBean {
    @Bean
    public PasswordEncoder passwordEncoder() {
        String defaultId = "bcrypt";

        Map<String, PasswordEncoder> encoders = new HashMap<>();
        encoders.put("bcrypt", new BCryptPasswordEncoder());
        encoders.put("argon2", Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8());
        encoders.put("pbkdf2", Pbkdf2PasswordEncoder.defaultsForSpringSecurity_v5_8());

        return new DelegatingPasswordEncoder(defaultId, encoders);
    }


    @Bean
    public FilterRegistrationBean<DashboardFilter> disableDashboardFilterRegistration(DashboardFilter filter) {
        FilterRegistrationBean<DashboardFilter> reg = new FilterRegistrationBean<>(filter);
        reg.setEnabled(false);
        return reg;
    }

    @Bean
    public FilterRegistrationBean<StoreFilter> disableStoreFilterRegistration(StoreFilter filter) {
        FilterRegistrationBean<StoreFilter> reg = new FilterRegistrationBean<>(filter);
        reg.setEnabled(false);
        return reg;
    }

    @Bean("corsAllOrigin")
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOriginPattern("*"); // chấp nhận tất cả origin, nhưng vẫn xét header Authorization
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    @Order(1)
    public SecurityFilterChain publicSecurityChain(HttpSecurity http,
                                                   PublicApiMatcher publicApiMatcher,
                                                   LoginEntryPoint loginEntryPoint,
                                                   @Qualifier("corsAllOrigin") CorsConfigurationSource source) {

        http.securityMatcher(publicApiMatcher)
                .cors(cors -> cors.configurationSource(source))
                .csrf(AbstractHttpConfigurer::disable)
                .headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable))
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint(loginEntryPoint)
                )
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());

        return http.build();
    }

    @Bean
    @Order(2)
    public SecurityFilterChain dashboardSecurityFilterChain(HttpSecurity http,
                                                            DashboardApiMatcher dashboardApiMatcher,
                                                            DashboardFilter dashboardFilter,
                                                            LoginEntryPoint loginEntryPoint,
                                                            @Qualifier("corsAllOrigin") CorsConfigurationSource source) {

        http.securityMatcher(dashboardApiMatcher)
                .cors(cors -> cors.configurationSource(source))
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().authenticated()
                )
                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint(loginEntryPoint)
                )
                .addFilterAfter(dashboardFilter, ExceptionTranslationFilter.class);
        return http.build();
    }

    @Bean
    @Order(3)
    public SecurityFilterChain storeSecurityFilterChain(HttpSecurity http,
                                                            StoreApiMatcher storeApiMatcher,
                                                            StoreFilter storeFilter,
                                                            LoginEntryPoint loginEntryPoint,
                                                            @Qualifier("corsAllOrigin") CorsConfigurationSource source) {

        http.securityMatcher(storeApiMatcher)
                .cors(cors -> cors.configurationSource(source))
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().authenticated()
                )
                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint(loginEntryPoint)
                )
                .addFilterAfter(storeFilter, ExceptionTranslationFilter.class);
        return http.build();
    }
}
