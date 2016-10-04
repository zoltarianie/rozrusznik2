package com.rozrusznik.web;

import com.rozrusznik.web.model.User;
import com.rozrusznik.web.security.UserDetailsImpl;
import com.rozrusznik.web.service.UserService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/account")
public class AccountController {

    private final static Logger logger = LogManager.getLogger(AccountController.class);

    private UserService userService;

    @Autowired
    public AccountController(UserService userService) {
        this.userService = userService;
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<User> getCurrentlyLoggedAccount() {
        logger.debug("getCurrentlyLoggedAccount");
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetailsImpl) {
            User user = ((UserDetailsImpl) principal).getUser();
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/remindPassword", method = RequestMethod.GET)
    public ResponseEntity<String> remindPassword() {
        System.out.println("XXXXX");
        return new ResponseEntity<>(HttpStatus.OK);
    }
}