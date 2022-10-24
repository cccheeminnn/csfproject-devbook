package vttp2022.batch1.csfproject.devbookbackend;

import java.util.concurrent.Executor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@EnableAsync
@SpringBootApplication
public class DevbookBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(DevbookBackendApplication.class, args);
	}

	@Bean(name="threadPoolTaskExecutor")
	public Executor taskExecutor () {
		final ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
		executor.setCorePoolSize(2);
		executor.setMaxPoolSize(2);
		executor.setQueueCapacity(500);
		executor.setThreadNamePrefix("SendEmail-");
		executor.initialize();
		return executor;
	}

}
