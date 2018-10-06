package com.riceshop.shop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.JdbcTemplate;

import com.riceshop.shop.models.Category;

import java.util.List;
import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

@Repository
public class CategoryDAO {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<Category> GetAllCategories() {
        String sql = "SELECT * FROM category";
        return jdbcTemplate.query(sql, new CategoryMapper());
    }

    public int CreateCategory(Category category) {
        String sql = "INSERT INTO category (title, keyname) VALUES (?, ?)";
        int update = jdbcTemplate.update(sql, new Object[] { category.getTitle(), category.getKeyname() });
        int cnt = 0;
        if (update == 1) {
            cnt = jdbcTemplate.queryForObject("SELECT max(id) FROM category", Integer.class);
        }
        return cnt;
    }

    public Category GetCategoryById(int id) {
        String sql = "SELECT * FROM category WHERE id = ?";
        Category category = jdbcTemplate.queryForObject(sql, new CategoryMapper(), id);
        return category;
    }

    public boolean RemoveCategory(int id) {
        String sql = "DELETE FROM category WHERE id = ?";
        int update = jdbcTemplate.update(sql, id);
        return update == 1;
    }

    public void UpdateCategory(Category category) {
        String sql = "UPDATE category SET title = ?, keyname = ? WHERE id = ?";
        jdbcTemplate.update(sql, new Object[] { category.getTitle(), category.getKeyname(), category.getId() });
    }

    protected static final class CategoryMapper implements RowMapper<Category> {
        public Category mapRow(ResultSet rs, int rowNum) throws SQLException {
            Category category = new Category();
            category.setId(rs.getInt("id"));
            category.setTitle(rs.getString("title"));
            category.setKeyname(rs.getString("keyname"));

            return category;
        }
    }
}