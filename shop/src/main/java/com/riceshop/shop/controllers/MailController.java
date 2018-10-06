package com.riceshop.shop.controllers;

import java.util.Map;

import com.riceshop.shop.models.Member;
import com.riceshop.shop.service.MemberService;
import com.riceshop.shop.utils.AES256Util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@RequestMapping("/api/mail")
@Controller
public class MailController {

    @Autowired
    public JavaMailSender emailSender;

    @Autowired
    public MemberService memberService;

    public String FindUser(String username, String email) {

        if (username == null || email == null) {
            return "NoId...";
        }

        try {
            Member member = memberService.findUser(username, email);
            if (member == null) {
                return "NoId...";
            }
            return member.getUserID();
        } catch (Exception e) {
            e.printStackTrace();
            return "NoId...";
        }
    }

    @RequestMapping(value = "/username", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> SendMailUsername(@RequestBody Map<String, String> body) {

        String userName = body.get("userName");
        String userEmail = body.get("userEmail");

        if (userName == null || userEmail == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        String userID;

        try {
            userID = FindUser(userName, userEmail);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (userID == null || userID.equals("NoId...")) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        String to = body.get("to");

        if (to == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        try {
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setTo(to);
            simpleMailMessage.setSubject("아이디 찾기 이메일 발송");
            simpleMailMessage.setText("귀하의 아이디는 " + userID + " 입니다.");
            emailSender.send(simpleMailMessage);

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/password", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> SendMailPassword(@RequestBody Map<String, String> body) {

        String userID = body.get("userId");
        String userEmail = body.get("userEmail");

        String foundHashedPassword;
        String foundUnhashedPassword;

        if (userID == null || userEmail == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        try {
            Member member = memberService.findPassword(userID, userEmail);
            if (member == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            foundHashedPassword = member.getUserPassword();
            AES256Util util = new AES256Util("myHashKey123456#@#$0098877^^^^");
            String decrypted = util.decrypt(foundHashedPassword);
            foundUnhashedPassword = decrypted;
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        String to = body.get("to");

        if (to == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        try {
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setTo(to);
            simpleMailMessage.setSubject("비밀번호 찾기 이메일 발송");
            simpleMailMessage.setText("귀하의 비밀번호는 " + foundUnhashedPassword + " 입니다.");
            emailSender.send(simpleMailMessage);

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}