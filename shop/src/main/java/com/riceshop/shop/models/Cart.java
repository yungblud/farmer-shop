package com.riceshop.shop.models;

public class Cart {
    private int cartId;
    private int id;
    private String title;
    private int amount;
    private String thumbnailImage;
    private int totalPrice;
    private String option;
   

    /**
     * @param cartId the cartId to set
     */
    public void setCartId(int cartId) {
        this.cartId = cartId;
    }
    /**
     * @return the cartId
     */
    public int getCartId() {
        return cartId;
    }
    

    /**
     * @param option the option to set
     */
    public void setOption(String option) {
        this.option = option;
    }
    /**
     * @return the option
     */
    public String getOption() {
        return option;
    }


    /**
     * @param id the id to set
     */
    public void setId(int id) {
        this.id = id;
    }
    /**
     * @return the id
     */
    public int getId() {
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
     * @param amount the amount to set
     */
    public void setAmount(int amount) {
        this.amount = amount;
    }
    /**
     * @return the amount
     */
    public int getAmount() {
        return amount;
    }

    /**
     * @param thumbnailImage the thumbnailImage to set
     */
    public void setThumbnailImage(String thumbnailImage) {
        this.thumbnailImage = thumbnailImage;
    }
    /**
     * @return the thumbnailImage
     */
    public String getThumbnailImage() {
        return thumbnailImage;
    }

    /**
     * @param totalPrice the totalPrice to set
     */
    public void setTotalPrice(int totalPrice) {
        this.totalPrice = totalPrice;
    }
    /**
     * @return the totalPrice
     */
    public int getTotalPrice() {
        return totalPrice;
    }
}