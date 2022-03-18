package hu.baxter.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class BaxterDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(BaxterDemoApplication.class, args);
    }

}
