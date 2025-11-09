package com.it.spring.ai;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable()) // ✅ cú pháp mới, không deprecated
                .authorizeHttpRequests(auth -> auth.requestMatchers("/ai/**").authenticated().anyRequest().permitAll())
                .httpBasic(Customizer.withDefaults()); // hoặc formLogin nếu bạn dùng session login
        return http.build();
    }
}
