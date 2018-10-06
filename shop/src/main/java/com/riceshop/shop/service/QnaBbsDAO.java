package com.riceshop.shop.service;

import com.riceshop.shop.service.QnaBbsDAO.QnaBbsMapper;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.riceshop.shop.models.QnaBbs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class QnaBbsDAO {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public long writeQna(QnaBbs qnaBbs) {
        String sql = "INSERT INTO qnabbs (title, username, content, createdAt, isprivate) VALUES (?, ?, ?, ?, ?)";
        int update = jdbcTemplate.update(sql, new Object[] { qnaBbs.getTitle(), qnaBbs.getUsername(),
                qnaBbs.getContent(), qnaBbs.getCreatedAt(), qnaBbs.getIsprivate() });
        long cnt = 0;
        if (update == 1) {
            cnt = jdbcTemplate.queryForObject("SELECT max(id) FROM qnabbs", Long.class);
        }
        String updateSql = "UPDATE qnabbs SET grpno = ? WHERE id = ?";
        jdbcTemplate.update(updateSql, new Object[] { cnt, cnt });
        return cnt;
    }

    public long writeAnswer(long id, QnaBbs answerQnsBbs) {
        String sql = "SELECT * FROM qnabbs WHERE id = ?";
        String setAnsweredSql = "UPDATE qnabbs SET isanswered = ? WHERE id = ?";

        QnaBbs qnaBbs = jdbcTemplate.queryForObject(sql, new QnaBbsMapper(), id);
        String insertSql = "INSERT INTO qnabbs (title, username, content, createdAt, grpno, grpord, depth, isanswer, isprivate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        int update = jdbcTemplate.update(insertSql,
                new Object[] { answerQnsBbs.getTitle(), answerQnsBbs.getUsername(), answerQnsBbs.getContent(),
                        answerQnsBbs.getCreatedAt(), qnaBbs.getGrpno(), qnaBbs.getGrpord() + 1, qnaBbs.getDepth() + 1,
                        1, qnaBbs.getIsprivate() });
        int setAnsweredUpdate = jdbcTemplate.update(setAnsweredSql, new Object[] { true, id });

        long cnt = 0;
        if (update == 1 && setAnsweredUpdate == 1) {
            cnt = jdbcTemplate.queryForObject("SELECT MAX(id) FROM qnabbs", Long.class);
        }
        return cnt;
    }

    public QnaBbs getQnaById(long id) {
        String sql = "SELECT * FROM qnabbs WHERE id = ?";
        QnaBbs qnaBbs = jdbcTemplate.queryForObject(sql, new QnaBbsMapper(), id);
        return qnaBbs;
    }

    public QnaBbs getQnaByGrpno(long grpno) {
        String sql = "SELECT * FROM qnabbs WHERE grpno = ? and isanswer = 0";
        QnaBbs qnaBbs = jdbcTemplate.queryForObject(sql, new QnaBbsMapper(), grpno);
        return qnaBbs;
    }

    public long getAnswerCountById(long id) {
        String sql = "SELECT COUNT(*) FROM qnabbs WHERE grpno = ?";
        long cnt = jdbcTemplate.queryForObject(sql, Long.class, id);
        return cnt;
    }

    public long getCount() {
        String sql = "SELECT COUNT(*) FROM qnabbs";
        long cnt = jdbcTemplate.queryForObject(sql, Long.class);
        return cnt;
    }

    public List<QnaBbs> getQnaBbsListWithAnswers(long page) {
        String sql = "SELECT * FROM qnabbs ORDER BY grpno DESC, grpord ASC LIMIT ?, 10";
        List<QnaBbs> qnaBbsList = jdbcTemplate.query(sql, new Object[] { (page - 1) * 10 }, new QnaBbsMapper());
        return qnaBbsList;

    }

    public List<QnaBbs> getQnaBbsList(long page) {
        List<QnaBbs> qnaBbsList = new ArrayList<QnaBbs>();
        long cnt = getCount();
        double lastPage = Math.ceil(cnt / 10) + 1;

        String sql = "SELECT * FROM qnabbs WHERE id < ? AND id >= ? ORDER BY id DESC LIMIT 10";
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, (lastPage - page) * 10 + 1,
                (lastPage - page - 1) * 10);
        for (Map<String, Object> row : rows) {
            QnaBbs qnaBbs = new QnaBbs();
            qnaBbs.setId((int) row.get("id"));
            qnaBbs.setTitle((String) row.get("title"));
            qnaBbs.setContent((String) row.get("content"));
            qnaBbs.setGrpno((int) row.get("grpno"));
            qnaBbs.setGrpord((int) row.get("grpord"));
            qnaBbs.setDepth((int) row.get("depth"));
            qnaBbs.setUsername((String) row.get("username"));
            qnaBbs.setCreatedAt((String) row.get("createdAt"));
            qnaBbsList.add(qnaBbs);
        }
        return qnaBbsList;

    }

    public boolean removeQna(long id) {
        String sql = "DELETE FROM qnabbs WHERE id = ?";
        String answerSql = "DELETE FROM qnabbs WHERE grpno = ?";
        int update = jdbcTemplate.update(sql, id);
        long cnt = getAnswerCountById(id);
        if (cnt > 0) {
            int answerUpdate = jdbcTemplate.update(answerSql, id);
            return update == 1 && answerUpdate == 1;
        }

        return update == 1;
    }

    public void updateQna(long id, String title, String content, String createdAt) {
        String sql = "UPDATE qnabbs SET title = ?, content = ?, createdAt = ?, isedited = ? WHERE id = ?";
        jdbcTemplate.update(sql, new Object[] { title, content, createdAt, true, id });
    }

    public List<QnaBbs> searchByUserID(String userID) {
        String sql = "SELECT * FROM qnabbs WHERE username LIKE ? ORDER BY id DESC";
        return jdbcTemplate.query(sql, new Object[] { "%" + userID + "%" }, new QnaBbsMapper());
    }

    public List<QnaBbs> searchByTitle(String title) {
        String sql = "SELECT * FROM qnabbs WHERE title LIKE ? ORDER BY id DESC";
        return jdbcTemplate.query(sql, new Object[] { "%" + title + "%" }, new QnaBbsMapper());
    }

    public List<QnaBbs> searchByContent(String content) {
        String sql = "SELECT * FROM qnabbs WHERE content LIKE ? ORDER BY id DESC";
        return jdbcTemplate.query(sql, new Object[] { content }, new QnaBbsMapper());
    }

    // public Boolean checkPassword(String password, long id) {
    // String sql = "SELECT * FROM qnabbs WHERE id = ?";
    // QnaBbs qnaBbs = jdbcTemplate.queryForObject(sql, new QnaBbsMapper(), id);
    // return qnaBbs.getPassword().equals(password);
    // }

    protected static final class QnaBbsMapper implements RowMapper<QnaBbs> {
        public QnaBbs mapRow(ResultSet rs, int rowNum) throws SQLException {
            QnaBbs qnaBbs = new QnaBbs();
            qnaBbs.setId(rs.getLong("id"));
            qnaBbs.setTitle(rs.getString("title"));
            qnaBbs.setUsername(rs.getString("username"));
            qnaBbs.setGrpno(rs.getLong("grpno"));
            qnaBbs.setGrpord(rs.getLong("grpord"));
            qnaBbs.setDepth(rs.getLong("depth"));
            qnaBbs.setContent(rs.getString("content"));
            qnaBbs.setCreatedAt(rs.getString("createdAt"));
            qnaBbs.setIsanswer(rs.getBoolean("isanswer"));
            qnaBbs.setIsedited(rs.getBoolean("isedited"));
            qnaBbs.setIsanswered(rs.getBoolean("isanswered"));
            qnaBbs.setIsprivate(rs.getBoolean("isprivate"));
            return qnaBbs;
        }
    }

}