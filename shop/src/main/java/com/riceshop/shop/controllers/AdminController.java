package com.riceshop.shop.controllers;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;;

@RequestMapping("/api/admin")
@Controller
public class AdminController {

    @Autowired
    private Environment env;

    @RequestMapping(value="/", method=RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> adminLogin(@RequestBody Map<String, String> body, HttpSession session) {
        if(env.getProperty("admin.password").equals(body.get("password")) && 
            env.getProperty("admin.id").equals(body.get("adminID"))) {
            session.setAttribute("adminLogged", true);
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        else {
            session.setAttribute("adminLogged", false);
            return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @RequestMapping(value="/check", method=RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> adminCheck(HttpSession session) {
        if(session.getAttribute("adminLogged") != null) {
            if((Boolean) session.getAttribute("adminLogged")){
                return new ResponseEntity<>(true, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(false, HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
    }

    @RequestMapping(value="/logout", method=RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> adminLogout(HttpSession session) {
        session.setAttribute("adminLogged", null);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}