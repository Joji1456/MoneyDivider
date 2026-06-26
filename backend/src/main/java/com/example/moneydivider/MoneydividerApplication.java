package com.example.moneydivider;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.moneydivider")
@EnableJpaRepositories(basePackages = "com.moneydivider.repository")
@EntityScan(basePackages = "com.moneydivider.model")
public class MoneydividerApplication {

	public static void main(String[] args) {
		SpringApplication.run(MoneydividerApplication.class, args);
	}

}
