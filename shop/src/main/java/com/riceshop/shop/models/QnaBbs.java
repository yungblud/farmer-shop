package com.riceshop.shop.models;

public class QnaBbs {
    private long id;
    private String title;
    private String username;
    private String content;
    private long grpno;
    private long grpord;
    private long depth;
    private String createdAt;
    private Boolean isanswer;
    private Boolean isedited;
    private Boolean isanswered;
    private Boolean isprivate;


    /**
     * @return the isprivate
     */
    public Boolean getIsprivate() {
        return isprivate;
    }

    /**
     * @param isprivate the isprivate to set
     */
    public void setIsprivate(Boolean isprivate) {
        this.isprivate = isprivate;
    }
    

    /**
     * @return the isanswered
     */
    public Boolean getIsanswered() {
        return isanswered;
    }

    /**
     * @param isanswered the isanswered to set
     */
    public void setIsanswered(Boolean isanswered) {
        this.isanswered = isanswered;
    }

    /**
     * @param isedited the isedited to set
     */
    public void setIsedited(Boolean isedited) {
        this.isedited = isedited;
    }

    /**
     * @return the isedited
     */
    public Boolean getIsedited() {
        return isedited;
    }

    /**
     * @return the isanswer
     */
    public Boolean getIsanswer() {
        return isanswer;
    }

    /**
     * @param isanswer the isanswer to set
     */
    public void setIsanswer(Boolean isanswer) {
        this.isanswer = isanswer;
    }

    /**
     * @param grpno the grpno to set
     */
    public void setGrpno(long grpno) {
        this.grpno = grpno;
    }

    /**
     * @return the grpno
     */
    public long getGrpno() {
        return grpno;
    }

    /**
     * @param grpord the grpord to set
     */
    public void setGrpord(long grpord) {
        this.grpord = grpord;
    }

    /**
     * @return the grpord
     */
    public long getGrpord() {
        return grpord;
    }

    /**
     * @param depth the depth to set
     */
    public void setDepth(long depth) {
        this.depth = depth;
    }

    /**
     * @return the depth
     */
    public long getDepth() {
        return depth;
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
     * @return the content
     */
    public String getContent() {
        return content;
    }

    /**
     * @param content the content to set
     */
    public void setContent(String content) {
        this.content = content;
    }

    /**
     * @return the createdAt
     */
    public String getCreatedAt() {
        return createdAt;
    }

    /**
     * @param createdAt the createdAt to set
     */
    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}