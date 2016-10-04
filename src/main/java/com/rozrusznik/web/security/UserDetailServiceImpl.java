package com.rozrusznik.web.security;

import com.rozrusznik.web.model.User;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.rozrusznik.web.service.UserService;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    private final static Logger logger = LogManager.getLogger(UserDetailServiceImpl.class);

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        User user = userService.getUserByEmail(login);

        System.out.println(user.toString());

        if(user.getId() == null) {

            throw new UsernameNotFoundException("No user found with " + login);
        }

        System.out.println("POSZLO");

        return new UserDetailsImpl(user);
    }

    public void loadUserByUser(User user) {
        UserDetails userDetailsImpl = new UserDetailsImpl(user);
        Authentication auth = new UsernamePasswordAuthenticationToken(userDetailsImpl, null, userDetailsImpl.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(auth);
    }
}