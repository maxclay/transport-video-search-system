package com.maxclay.config;

import com.mongodb.MongoClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.net.UnknownHostException;

/**
 * Configuration, which allows to adjust connection to the MongoDB server and creates
 * {@link MongoTemplate} bean.
 *
 * @author Vlad Glinskiy
 */
@Configuration
public class MongoConfiguration {

    @Autowired
    private Environment environment;

    @Bean
    public MongoTemplate mongoTemplate() throws UnknownHostException {
        return new MongoTemplate(mongoClient(), environment.getProperty("mongodb.database"));
    }

    @Bean
    public MongoClient mongoClient() throws UnknownHostException {
        return new MongoClient(environment.getProperty("mongodb.host"),
                Integer.valueOf(environment.getProperty("mongodb.port")));
    }

}