package com.riceshop.shop.models;

public class AfterPost {
    private long id;
    private String title;
    private String content;
    private String username;
    private long itemid;
    private String createdAt;

    /**
     * @return the itemid
     */
    public long getItemid() {
        return itemid;
    }
    /**
     * @param itemid the itemid to set
     */
    public void setItemid(long itemid) {
        this.itemid = itemid;
    }

    /**
     * @param id the id to set
     */
    public void setId(long id) {
        this.id = id;
    }
    /**
     * @return the id
     */
    public long getId() {
        return id;
    }
    /**
     * @param title the title to set
     */
    public void setTitle(String title) {
        this.title = title;
    }
    /**
     * @return the title
     */
    public String getTitle() {
        return title;
    }
    /**
     * @param content the content to set
     */
    public void setContent(String content) {
        this.content = content;
    }
    /**
     * @return the content
     */
    public String getContent() {
        return content;
    }
    /**
     * @param username the username to set
     */
    public void setUsername(String username) {
        this.username = username;
    }
    /**
     * @return the username
     */
    public String getUsername() {
        return username;
    }
    /**
     * @param createdAt the createdAt to set
     */
    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
    /**
     * @return the createdAt
     */
    public String getCreatedAt() {
        return createdAt;
    }
}