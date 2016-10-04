package com.rozrusznik.web.service;

import com.rozrusznik.web.model.User;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.*;

@Service
public class UserService {

    private final static Logger logger = LogManager.getLogger(UserService.class);

    private DataSource dataSource;

    @Autowired
    @Qualifier("dataSource")
    public void setDataSource(DataSource dataSource) {
        System.out.println("setDataSource");
        System.out.println(dataSource.toString());
        this.dataSource = dataSource;
    }

    public User getUserByEmail(String email) {
        System.out.println("getUserByEmail");
        User user = new User();

        StringBuilder sql = new StringBuilder();
        sql.append("SELECT\n");
        sql.append("	u.id,\n");
        sql.append("	u.email,\n");
        sql.append("	u.password,\n");
        sql.append("	u.facebook_id,\n");
        sql.append("	u.google_id,\n");
        sql.append("	u.inserttime,\n");
        sql.append("	u.email_confirmed\n");
        sql.append("FROM\n");
        sql.append("	public.users u\n");
        sql.append("WHERE\n");
        sql.append("	u.email = ?;");

        try(Connection conn = dataSource.getConnection();
            PreparedStatement stmt = conn.prepareStatement(sql.toString())) {
            stmt.setString(1, email);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    user.setId(rs.getLong("id"));
                    user.setEmail(rs.getString("email"));
                    user.setPassword(rs.getString("password"));
                    user.setFacebookId(rs.getString("facebook_id"));
                    user.setGoogleId(rs.getString("google_id"));
                    user.setInserttime(rs.getTimestamp("inserttime"));
                    user.setEmailConfirmed(rs.getBoolean("email_confirmed"));
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return user;
    }
}