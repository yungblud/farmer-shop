package com.riceshop.shop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.riceshop.shop.models.Category;
import java.util.List;

@Service
public class CategoryService {
    @Autowired
    CategoryDAO categoryDAO;

    public List<Category> GetAllCategories() {
        return categoryDAO.GetAllCategories();
    }

    public int CreateCategory(Category category) {
        return categoryDAO.CreateCategory(category);
    }

    public Category GetCategoryById(int id) {
        return categoryDAO.GetCategoryById(id);
    }

    public boolean RemoveCategory(int id) {
        return categoryDAO.RemoveCategory(id);
    }

    public void UpdateCategory(Category category) {
        categoryDAO.UpdateCategory(category);
    }
}