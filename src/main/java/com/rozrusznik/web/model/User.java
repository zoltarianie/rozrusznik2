package com.rozrusznik.web.model;

import java.sql.Timestamp;

public class User {
    private Long id;
    private String email;
    private String password;
    private String facebookId;
    private String googleId;
    private Timestamp inserttime;
    private Boolean emailConfirmed;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email.toLowerCase();
    }
    public void setEmail(String email) {
        this.email = email.toLowerCase();
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public String getFacebookId() {
        return facebookId;
    }
    public void setFacebookId(String facebookId) {
        this.facebookId = facebookId;
    }

    public String getGoogleId() {
        return googleId;
    }
    public void setGoogleId(String googleId) {
        this.googleId = googleId;
    }

    public Timestamp getInserttime() {
        return inserttime;
    }
    public void setInserttime(Timestamp inserttime) {
        this.inserttime = inserttime;
    }

    public Boolean getEmailConfirmed() { return emailConfirmed==null?false:emailConfirmed; }
    public void setEmailConfirmed(Boolean emailConfirmed) {
        this.emailConfirmed = emailConfirmed;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", facebookId='" + facebookId + '\'' +
                ", googleId='" + googleId + '\'' +
                ", inserttime=" + inserttime +
                ", emailConfirmed=" + emailConfirmed +
                '}';
    }
}