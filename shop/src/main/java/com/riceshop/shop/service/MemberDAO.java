package com.riceshop.shop.service;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.riceshop.shop.models.Member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class MemberDAO {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public long signup(Member member) {
        String sql = "INSERT INTO member (userID, userName, userEmail, userPassword, userAddress, userPostCode, userDetailAddress, userPhone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        int update = jdbcTemplate.update(sql,
                new Object[] { member.getUserID(), member.getUserName(), member.getUserEmail(),
                        member.getUserPassword(), member.getUserAddress(), member.getUserPostCode(),
                        member.getUserDetailAddress(), member.getUserPhone() });
        long cnt = 0;
        if (update == 1) {
            cnt = jdbcTemplate.queryForObject("SELECT max(id) FROM member", Long.class);
        }
        return cnt;
    }

    public Member getUserById(long id) {
        String sql = "SELECT * FROM member WHERE id = ?";
        Member member = jdbcTemplate.queryForObject(sql, new MemberMapper(), id);
        return member;
    }

    public Boolean getUserByUserID(String userID) {
        long cnt = 0;
        cnt = jdbcTemplate.queryForObject("SELECT count(*) FROM member WHERE userID = ?", Long.class, userID);
        if (cnt == 1) {
            return true;
        }
        return false;
    }

    public Member getUserInfoByUserID(String userID) {
        String sql = "SELECT * FROM member WHERE userID = ?";
        Member member = jdbcTemplate.queryForObject(sql, new MemberMapper(), userID);
        return member;
    }

    public String getHashedPassword(String userID) {
        String sql = "SELECT * FROM member WHERE userID = ?";
        Member member = jdbcTemplate.queryForObject(sql, new MemberMapper(), userID);
        return member.getUserPassword();

    }

    public void updatePassword(long id, String password) {
        String sql = "UPDATE member SET userPassword = ? WHERE id = ?";
        jdbcTemplate.update(sql, new Object[] { password, id });
    }

    public void updateEmail(long id, String email) {
        String sql = "UPDATE member SET userEmail = ? WHERE id = ?";
        jdbcTemplate.update(sql, new Object[] { email, id });
    }

    public Member findUser(String userName, String userEmail) {
        String sql = "SELECT * FROM member WHERE userName = ? AND userEmail = ?";
        Member member = jdbcTemplate.queryForObject(sql, new MemberMapper(), userName, userEmail);
        return member;
    }

    public Member findPassword(String userID, String userEmail) {
        String sql = "SELECT * FROM member WHERE userID = ? AND userEmail = ?";
        Member member = jdbcTemplate.queryForObject(sql, new MemberMapper(), userID, userEmail);
        return member;
    }

    protected static final class MemberMapper implements RowMapper<Member> {
        public Member mapRow(ResultSet rs, int rowNum) throws SQLException {
            Member member = new Member();
            member.setId(rs.getLong("id"));
            member.setUserID(rs.getString("userID"));
            member.setUserName(rs.getString("userName"));
            member.setUserEmail(rs.getString("userEmail"));
            member.setUserPassword(rs.getString("userPassword"));
            member.setUserAddress(rs.getString("userAddress"));
            member.setUserPostCode(rs.getString("userPostCode"));
            member.setUserDetailAddress(rs.getString("userDetailAddress"));
            member.setUserPhone(rs.getString("userPhone"));
            member.setCreatedAt(rs.getString("createdAt"));
            return member;
        }
    }

}