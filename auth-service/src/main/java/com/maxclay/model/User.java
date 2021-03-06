package com.maxclay.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

/**
 * Representation of user.
 *
 * @author Vlad Glinskiy
 */
@Document(collection = User.COLLECTION_NAME)
public class User implements Serializable {

    public static final String COLLECTION_NAME = "users";

    @Id
    private String username;
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {

        StringBuilder sb = new StringBuilder();
        sb.append("class User {\n");
        sb.append("  name: ").append(username).append("\n");
        sb.append("  password: ").append(password).append("\n");
        sb.append("}\n");

        return sb.toString();
    }
}
