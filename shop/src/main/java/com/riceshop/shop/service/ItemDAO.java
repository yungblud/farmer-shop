package com.riceshop.shop.service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.riceshop.shop.models.AfterPost;
import com.riceshop.shop.models.PostItem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class ItemDAO {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public long writeItem(PostItem postItem) {
        String sql = "INSERT INTO item(title, markdown, options, prices, category) VALUES (?, ?, ?, ?, ?)";
        int update = jdbcTemplate.update(sql, new Object[] { postItem.getTitle(), postItem.getMarkdown(),
                postItem.getOptions(), postItem.getPrices(), postItem.getCategory() });
        long cnt = 0;
        if (update == 1) {
            cnt = jdbcTemplate.queryForObject("SELECT max(id) FROM item", Long.class);
        }
        return cnt;
    }

    public PostItem getPostItemById(long id) {
        String sql = "SELECT * FROM item WHERE id = ?";
        PostItem postItem = jdbcTemplate.queryForObject(sql, new PostItemMapper(), id);
        return postItem;
    }

    public List<PostItem> getItemListOnlySix() {
        String sql = "SELECT * FROM item ORDER BY id DESC LIMIT 6";
        return jdbcTemplate.query(sql, new PostItemMapper());
    }

    public List<PostItem> getItemList() {
        String sql = "SELECT * FROM item ORDER BY id DESC LIMIT 8";
        return jdbcTemplate.query(sql, new PostItemMapper());
    }

    public List<PostItem> getItemListByCategory(String keyname) {
        String sql = "SELECT * FROM item WHERE category = ? ORDER BY id DESC LIMIT 8";
        return jdbcTemplate.query(sql, new PostItemMapper(), keyname);
    }

    public long getLastId() {
        String sql = "SELECT MAX(id) FROM item";
        // int lastId = jdbcTemplate.queryForInt(sql);

        long cnt = jdbcTemplate.queryForObject(sql, Long.class);
        return cnt;
    }

    public List<AfterPost> getAfterPostListMore(long itemid, long lastId) {
        List<AfterPost> afterPosts = new ArrayList<>();
        String sql = "SELECT * FROM afterpost WHERE itemid = ? AND id < ? ORDER BY id DESC LIMIT 20";
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, itemid, lastId);
        for (Map<String, Object> row : rows) {
            AfterPost afterPost = new AfterPost();
            afterPost.setId((int) row.get("id"));
            afterPost.setTitle((String) row.get("title"));
            afterPost.setContent((String) row.get("content"));
            afterPost.setItemid((int) row.get("itemid"));
            afterPost.setCreatedAt((String) row.get("createdAt"));
            afterPosts.add(afterPost);
        }
        return afterPosts;

    }

    public List<PostItem> getItemListByScrolling(long lastId) {
        List<PostItem> postItems = new ArrayList<PostItem>();
        String sql = "SELECT * FROM item WHERE id < ? ORDER BY id DESC LIMIT 6";
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, lastId);
        for (Map<String, Object> row : rows) {
            PostItem postItem = new PostItem();
            postItem.setId((int) row.get("id"));
            postItem.setTitle((String) row.get("title"));
            postItem.setMarkdown((String) row.get("markdown"));
            postItem.setOptions((String) row.get("options"));
            postItem.setPrices((String) row.get("prices"));
            postItem.setPublishedDate((String) row.get("publishedDate"));
            postItems.add(postItem);
        }
        return postItems;
    }

    public boolean delete(long id) {
        String sql = "DELETE FROM item WHERE id = ?";
        int update = jdbcTemplate.update(sql, id);
        return update == 1;
    }

    public void update(PostItem postItem) {
        String sql = "UPDATE item SET title = ?, markdown = ?, options = ?, prices = ?, publishedDate = ?, category = ? WHERE id = ?";
        jdbcTemplate.update(sql, new Object[] { postItem.getTitle(), postItem.getMarkdown(), postItem.getOptions(),
                postItem.getPrices(), postItem.getPublishedDate(), postItem.getCategory(), postItem.getId() });

    }

    public long writeAfterPost(AfterPost afterPost) {
        String sql = "INSERT INTO afterpost (title, content, username, itemid, createdAt) VALUES (?, ?, ?, ?, ?)";
        int update = jdbcTemplate.update(sql, new Object[] { afterPost.getTitle(), afterPost.getContent(),
                afterPost.getUsername(), afterPost.getItemid(), afterPost.getCreatedAt() });
        long cnt = 0;
        if (update == 1) {
            cnt = jdbcTemplate.queryForObject("SELECT MAX(id) FROM afterpost", Long.class);
        }
        return cnt;
    }

    public AfterPost getAfterPostById(long id) {
        String sql = "SELECT * FROM afterpost WHERE id = ?";
        AfterPost afterPost = jdbcTemplate.queryForObject(sql, new AfterPostMapper(), id);
        return afterPost;
    }

    public List<AfterPost> getAfterPostList(long itemid) {
        String sql = "SELECT * FROM afterpost WHERE itemid = ? ORDER BY id DESC LIMIT 20";
        return jdbcTemplate.query(sql, new AfterPostMapper(), itemid);
    }

    public long getMinIdAfterPost() {
        String sql = "SELECT MIN(id) FROM afterpost";
        long minId = jdbcTemplate.queryForObject(sql, Long.class);
        return minId;
    }

    public List<PostItem> searchByItemTitle(String value) {
        String sql = "SELECT * FROM item WHERE title LIKE ? ORDER BY id DESC";
        return jdbcTemplate.query(sql, new Object[] { "%" + value + "%" }, new PostItemMapper());
    }

    public List<PostItem> getItemsByCategory(String category) {
        String sql = "SELECT * FROM item WHERE category = ? ORDER BY id DESC";
        return jdbcTemplate.query(sql, new PostItemMapper(), category);

    }

    public List<PostItem> getItemsByCategoryJust8(String category) {
        String sql = "SELECT * FROM item WHERE category = ? ORDER BY id DESC LIMIT 8";
        return jdbcTemplate.query(sql, new PostItemMapper(), category);
    }

    protected static final class PostItemMapper implements RowMapper<PostItem> {
        public PostItem mapRow(ResultSet rs, int rowNum) throws SQLException {

            PostItem postItem = new PostItem();
            postItem.setId(rs.getLong("id"));
            postItem.setTitle(rs.getString("title"));
            postItem.setMarkdown(rs.getString("markdown"));
            postItem.setOptions(rs.getString("options"));
            postItem.setPrices(rs.getString("prices"));
            postItem.setCategory(rs.getString("category"));
            postItem.setPublishedDate(rs.getString("publishedDate"));
            return postItem;
        }
    }

    protected static final class AfterPostMapper implements RowMapper<AfterPost> {
        public AfterPost mapRow(ResultSet rs, int rowNum) throws SQLException {
            AfterPost afterPost = new AfterPost();
            afterPost.setId(rs.getLong("id"));
            afterPost.setTitle(rs.getString("title"));
            afterPost.setContent(rs.getString("content"));
            afterPost.setUsername(rs.getString("username"));
            afterPost.setItemid(rs.getLong("itemid"));
            afterPost.setCreatedAt(rs.getString("createdAt"));
            return afterPost;
        }
    }

}