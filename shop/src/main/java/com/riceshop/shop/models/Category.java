package com.riceshop.shop.models;

public class Category {
    private int id;
    private String title;
    private String keyname;

    /**
     * @return the id
     */
    public int getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * @return the title
     */
    public String getTitle() {
        return title;
    }

    /**
     * @param title the title to set
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * @return the keyname
     */
    public String getKeyname() {
        return keyname;
    }

    /**
     * @param keyname the keyname to set
     */
    public void setKeyname(String keyname) {
        this.keyname = keyname;
    }

}