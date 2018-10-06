package com.riceshop.shop.controllers;

import com.riceshop.shop.service.ItemService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.riceshop.shop.models.Category;
import com.riceshop.shop.models.PostItem;
import java.util.List;

import com.riceshop.shop.service.CategoryService;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestParam;

@RequestMapping("/api/category")
@Controller
public class CategoryController {

    @Autowired
    public CategoryService categoryService;

    @Autowired
    public ItemService itemService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> GetCategories() {
        try {
            List<Category> categories = categoryService.GetAllCategories();
            return new ResponseEntity<>(categories, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/{category}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> GetItemsByCategory(@PathVariable String category) {
        try {
            List<PostItem> postItems = itemService.getItemsByCategory(category);

            return new ResponseEntity<>(postItems, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/initial/{category}", method = RequestMethod.GET)
    public ResponseEntity<?> requestMethodName(@PathVariable String category) {
        try {
            List<PostItem> postItems = itemService.getItemsByCategoryJust8(category);
            return new ResponseEntity<>(postItems, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> CreateCategory(@RequestBody Map<String, String> body) {
        String title = body.get("title");
        String keyname = body.get("keyname");
        try {
            Category category = new Category();
            category.setTitle(title);
            category.setKeyname(keyname);

            int id = categoryService.CreateCategory(category);

            category = categoryService.GetCategoryById(id);
            return new ResponseEntity<>(category, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PATCH)
    @ResponseBody
    public ResponseEntity<?> UpdateCategory(@PathVariable String id, @RequestBody Map<String, String> body) {
        int categoryId = Integer.parseInt(id);
        String title = body.get("title");
        String keyname = body.get("keyname");
        try {
            Category category = categoryService.GetCategoryById(categoryId);

            List<PostItem> postItems = itemService.getItemsByCategory(category.getKeyname());
            System.out.println(category.getKeyname());
            for (PostItem item : postItems) {
                // System.out.println(item.getTitle());
                item.setCategory(keyname);
                // System.out.println(item.getCategory());
                itemService.update(item);
            }

            category.setTitle(title);
            category.setKeyname(keyname);

            categoryService.UpdateCategory(category);

            return new ResponseEntity<>(HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<?> RemoveCategory(@PathVariable String id) {
        int categoryId = Integer.parseInt(id);
        try {
            categoryService.RemoveCategory(categoryId);

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}