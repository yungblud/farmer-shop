package com.riceshop.shop.models;

public class PostItem {
    private long id;
    private String title;
    private String markdown;
    private String options;
    private String prices;
    private String category;
    private String publishedDate;

    /**
     * @return the id
     */
    public long getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(long id) {
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
     * @return the markdown
     */
    public String getMarkdown() {
        return markdown;
    }

    /**
     * @param markdown the markdown to set
     */
    public void setMarkdown(String markdown) {
        this.markdown = markdown;
    }

    /**
     * @param prices the prices to set
     */
    public void setPrices(String prices) {
        this.prices = prices;
    }

    /**
     * @return the prices
     */
    public String getPrices() {
        return prices;
    }

    /**
     * @param options the options to set
     */
    public void setOptions(String options) {
        this.options = options;
    }

    /**
     * @return the options
     */
    public String getOptions() {
        return options;
    }

    /**
     * @param publishedDate the publishedDate to set
     */
    public void setPublishedDate(String publishedDate) {
        this.publishedDate = publishedDate;
    }

    /**
     * @return the publishedDate
     */
    public String getPublishedDate() {
        return publishedDate;
    }

    /**
     * @return the category
     */
    public String getCategory() {
        return category;
    }

    /**
     * @param category the category to set
     */
    public void setCategory(String category) {
        this.category = category;
    }

}