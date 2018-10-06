package com.riceshop.shop.controllers;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import com.riceshop.shop.models.AfterPost;
import com.riceshop.shop.models.Category;
import com.riceshop.shop.models.PostItem;
import com.riceshop.shop.models.PostingError;
import com.riceshop.shop.service.CategoryService;
import com.riceshop.shop.service.ItemService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;;

@RequestMapping("/api/post")
@Controller
public class PostController {

    @Autowired
    ItemService itemService;

    @Autowired
    CategoryService categoryService;

    @RequestMapping(value = "/", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> post(PostItem postItem, @RequestBody Map<String, String> body, HttpSession session) {
        if (!(Boolean) session.getAttribute("adminLogged")) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        String title = body.get("title");
        String markdown = body.get("markdown");
        String option = body.get("option");
        String price = body.get("price");
        String category = body.get("category");

        if (title.length() == 0 || title.replaceAll("\\s+", "").equals("")) {
            PostingError postingError = new PostingError();
            postingError.setErrorCode(100);
            postingError.setErrorLog("제목을 입력해주세요.");
            return new ResponseEntity<>(postingError, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (markdown.length() == 0 || markdown.replaceAll("\\s+", "").equals("")) {
            PostingError postingError = new PostingError();
            postingError.setErrorCode(200);
            postingError.setErrorLog("내용을 입력해주세요.");
            return new ResponseEntity<>(postingError, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (option.length() == 0 || option.replaceAll("\\s+", "").equals("")) {
            PostingError postingError = new PostingError();
            postingError.setErrorCode(300);
            postingError.setErrorLog("옵션을 입력해주세요.");
            return new ResponseEntity<>(postingError, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (price.length() == 0 || price.replaceAll("\\s+", "").equals("")) {
            PostingError postingError = new PostingError();
            postingError.setErrorCode(400);
            postingError.setErrorLog("가격을 입력해주세요.");
            return new ResponseEntity<>(postingError, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        // try {
        // int intPrice = Integer.parseInt(price);
        // } catch(Exception e) {
        // e.printStackTrace();
        // PostingError postingError = new PostingError();
        // postingError.setErrorCode(500);
        // postingError.setErrorLog("가격은 숫자만 입력해주세요.");
        // return new ResponseEntity<>(postingError, HttpStatus.INTERNAL_SERVER_ERROR);
        // }

        String publishedDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());

        try {

            postItem.setTitle(title);
            postItem.setMarkdown(markdown);
            postItem.setOptions(option);
            postItem.setPrices(price);
            if (category == null || category.equals("no-category")) {
                postItem.setCategory("etc");
            } else {
                postItem.setCategory(category);
            }
            postItem.setPublishedDate(publishedDate);
            postItem = itemService.getPostItemById(itemService.writeItem(postItem));
            return new ResponseEntity<>(postItem, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getItemById(@PathVariable Long id) {
        try {
            PostItem postItem = itemService.getPostItemById(id);
            if (postItem == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(postItem, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getItemList() {

        List<Category> categories;

        List<PostItem> itemList = new ArrayList<PostItem>();
        List<PostItem> categoryByList;
        try {
            categories = categoryService.GetAllCategories();

            for (Category category : categories) {
                categoryByList = itemService.getItemListByCategory(category.getKeyname());
                for (int i = 0; i < categoryByList.size(); i++) {
                    itemList.add(categoryByList.get(i));
                }
            }

            // itemList = itemService.getItemList();
            return new ResponseEntity<>(itemList, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/more/{lastId}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getMoreItemList(@PathVariable Long lastId) {
        List<PostItem> postItems;
        try {
            // long id = itemService.getLastId();
            // System.out.println("id: " + id);

            postItems = itemService.getItemListByScrolling(lastId);

            return new ResponseEntity<>(postItems, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/after/more/{itemid}/{lastId}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getMoreAfterPostList(@PathVariable Long itemid, @PathVariable Long lastId) {
        List<AfterPost> afterPosts;
        try {
            HttpHeaders headers = new HttpHeaders();
            Long minId = itemService.getMinIdAfterPost();
            System.out.println("minId " + minId);
            headers.set("minId", minId + "");
            afterPosts = itemService.getAfterPostListMore(itemid, lastId);
            return new ResponseEntity<>(afterPosts, headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/initial", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getOnlySix() {
        List<PostItem> postItems;

        try {
            postItems = itemService.getItemListOnlySix();
            return new ResponseEntity<>(postItems, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/after/initial/{itemid}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getInitialAfterPostList(@PathVariable Long itemid) {
        List<AfterPost> afterPosts;
        // long itemid = Long.parseLong(body.get("itemid"));
        try {
            afterPosts = itemService.getAfterPostList(itemid);
            return new ResponseEntity<>(afterPosts, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<?> deleteItem(@PathVariable Long id, HttpSession session) {
        try {
            if ((Boolean) session.getAttribute("adminLogged")) {
                boolean isSuccess = itemService.delete(id);
                if (isSuccess) {
                    return new ResponseEntity<>("success: true", HttpStatus.NO_CONTENT);
                }
                return new ResponseEntity<>("success: false", HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return new ResponseEntity<>("success: false", HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("success: false", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PATCH)
    @ResponseBody
    public ResponseEntity<?> updateItem(@PathVariable Long id, @RequestBody Map<String, String> body,
            HttpSession session, PostItem postItem) {
        if (session.getAttribute("adminLogged") != null) {
            if ((Boolean) session.getAttribute("adminLogged")) {
                String title = body.get("title");
                String markdown = body.get("markdown");
                String options = body.get("option");
                String prices = body.get("price");
                String publishedDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());

                try {
                    if ((Boolean) session.getAttribute("adminLogged")) {
                        postItem.setTitle(title);
                        postItem.setMarkdown(markdown);
                        postItem.setOptions(options);
                        postItem.setPrices(prices);
                        postItem.setPublishedDate(publishedDate);
                        itemService.update(postItem);

                        return new ResponseEntity<>(postItem, HttpStatus.OK);
                    }
                    return new ResponseEntity<>("success: false", HttpStatus.UNAUTHORIZED);
                } catch (Exception e) {
                    e.printStackTrace();
                    return new ResponseEntity<>("success: false", HttpStatus.INTERNAL_SERVER_ERROR);
                }
            } else {
                return new ResponseEntity<>(false, HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<>(false, HttpStatus.OK);
        }

    }

    @RequestMapping(value = "/after", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> writeAfterPost(@RequestBody Map<String, String> body, HttpSession session,
            AfterPost afterPost) {
        if (session.getAttribute("memberLogged") != null) {
            if ((Boolean) session.getAttribute("memberLogged")) {
                String title = body.get("title");
                String content = body.get("content");
                String username = body.get("username");
                long itemid = Long.parseLong(body.get("itemid"));
                String createdAt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
                try {
                    afterPost.setTitle(title);
                    afterPost.setContent(content);
                    afterPost.setUsername(username);
                    afterPost.setItemid(itemid);
                    afterPost.setCreatedAt(createdAt);
                    afterPost = itemService.getAfterPostById(itemService.writeAfterPost(afterPost));
                    return new ResponseEntity<>(afterPost, HttpStatus.OK);
                } catch (Exception e) {
                    e.printStackTrace();
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            } else {
                return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @RequestMapping(value = "/after/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getAfterPostById(@PathVariable long id, AfterPost afterPost) {
        try {
            afterPost = itemService.getAfterPostById(id);
            return new ResponseEntity<>(afterPost, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/search/{title}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> searchByTitle(@PathVariable String title) {
        try {
            List<PostItem> postItems = itemService.searchByItemTitle(title);
            return new ResponseEntity<>(postItems, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
