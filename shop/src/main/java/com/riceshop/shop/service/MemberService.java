package com.riceshop.shop.service;

import com.riceshop.shop.models.Member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {
    @Autowired
    MemberDAO memberDAO;

    public long signup(Member member) {
        return memberDAO.signup(member);
    }

    public Boolean getUserByUserID(String userID) {
        return memberDAO.getUserByUserID(userID);
    }

    public Member getUserById(long id) {
        return memberDAO.getUserById(id);
    }

    public String getHashedPassword(String userID) {
        return memberDAO.getHashedPassword(userID);
    }

    public Member getUserInfoByUserID(String userID) {
        return memberDAO.getUserInfoByUserID(userID);
    }

    public void updatePassword(long id, String password) {
        memberDAO.updatePassword(id, password);
    }

    public void updateEmail(long id, String email) {
        memberDAO.updateEmail(id, email);
    }

    public Member findUser(String userName, String userEmail) {
        return memberDAO.findUser(userName, userEmail);
    }

    public Member findPassword(String userID, String userEmail) {
        return memberDAO.findPassword(userID, userEmail);
    }
}