package com.riceshop.shop.service;

import java.util.List;

import com.riceshop.shop.models.AfterPost;
import com.riceshop.shop.models.PostItem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemService {
    @Autowired
    ItemDAO itemDAO;

    public long writeItem(PostItem postItem) {
        return itemDAO.writeItem(postItem);
    }

    public PostItem getPostItemById(long id) {
        return itemDAO.getPostItemById(id);
    }

    public List<PostItem> getItemList() {
        return itemDAO.getItemList();
    }

    public boolean delete(long id) {
        return itemDAO.delete(id);
    }

    public void update(PostItem postItem) {
        itemDAO.update(postItem);
    }

    public List<PostItem> getItemListByScrolling(long lastId) {
        return itemDAO.getItemListByScrolling(lastId);
    }

    public long getLastId() {
        return itemDAO.getLastId();
    }

    public List<PostItem> getItemListOnlySix() {
        return itemDAO.getItemListOnlySix();
    }

    public long writeAfterPost(AfterPost afterPost) {
        return itemDAO.writeAfterPost(afterPost);
    }

    public AfterPost getAfterPostById(long id) {
        return itemDAO.getAfterPostById(id);
    }

    public List<AfterPost> getAfterPostList(long itemid) {
        return itemDAO.getAfterPostList(itemid);
    }

    public List<AfterPost> getAfterPostListMore(long itemid, long lastId) {
        return itemDAO.getAfterPostListMore(itemid, lastId);
    }

    public long getMinIdAfterPost() {
        return itemDAO.getMinIdAfterPost();
    }

    public List<PostItem> searchByItemTitle(String value) {
        return itemDAO.searchByItemTitle(value);
    }

    public List<PostItem> getItemsByCategory(String category) {
        return itemDAO.getItemsByCategory(category);
    }

    public List<PostItem> getItemListByCategory(String keyname) {
        return itemDAO.getItemListByCategory(keyname);
    }

    public List<PostItem> getItemsByCategoryJust8(String category) {
        return itemDAO.getItemsByCategoryJust8(category);
    }
}