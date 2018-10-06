package com.riceshop.shop.models;

public class Checkout {
    private long id;
    private String imp_uid;
    private String merchant_uid;
    private String paid_amount;
    private String apply_num;
    private String buyer_email;
    private String buyer_name;
    private String buyer_tel;
    private String buyer_addr;
    private String buyer_postcode;
    private String createdAt;
    private String ordered_list;
    private String ordered_number;
    private Boolean checked;
    private String buyer_id;
    private String songjang;
    private Boolean cancelled;
    private Boolean pay_backed;
    private String item_number;
    private Boolean iscomplete;

    /**
     * @param iscomplete the iscomplete to set
     */
    public void setIscomplete(Boolean iscomplete) {
        this.iscomplete = iscomplete;
    }

    /**
     * @return the iscomplete
     */
    public Boolean getIscomplete() {
        return iscomplete;
    }

    /**
     * @param item_number the item_number to set
     */
    public void setItem_number(String item_number) {
        this.item_number = item_number;
    }

    /**
     * @return the item_number
     */
    public String getItem_number() {
        return item_number;
    }

    /**
     * @param pay_backed the pay_backed to set
     */
    public void setPay_backed(Boolean pay_backed) {
        this.pay_backed = pay_backed;
    }

    /**
     * @return the pay_backed
     */
    public Boolean getPay_backed() {
        return pay_backed;
    }

    /**
     * @return the cancelled
     */
    public Boolean getCancelled() {
        return cancelled;
    }

    /**
     * @param cancelled the cancelled to set
     */
    public void setCancelled(Boolean cancelled) {
        this.cancelled = cancelled;
    }

    /**
     * @return the songjang
     */
    public String getSongjang() {
        return songjang;
    }

    /**
     * @param songjang the songjang to set
     */
    public void setSongjang(String songjang) {
        this.songjang = songjang;
    }

    /**
     * @return the buyer_id
     */
    public String getBuyer_id() {
        return buyer_id;
    }

    /**
     * @param buyer_id the buyer_id to set
     */
    public void setBuyer_id(String buyer_id) {
        this.buyer_id = buyer_id;
    }

    /**
     * @param checked the checked to set
     */
    public void setChecked(Boolean checked) {
        this.checked = checked;
    }

    /**
     * @return the checked
     */
    public Boolean getChecked() {
        return checked;
    }

    /**
     * @return the ordered_list
     */
    public String getOrdered_list() {
        return ordered_list;
    }

    /**
     * @param ordered_list the ordered_list to set
     */
    public void setOrdered_list(String ordered_list) {
        this.ordered_list = ordered_list;
    }

    /**
     * @return the ordered_number
     */
    public String getOrdered_number() {
        return ordered_number;
    }

    /**
     * @param ordered_number the ordered_number to set
     */
    public void setOrdered_number(String ordered_number) {
        this.ordered_number = ordered_number;
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
     * @return the imp_uid
     */
    public String getImp_uid() {
        return imp_uid;
    }

    /**
     * @param imp_uid the imp_uid to set
     */
    public void setImp_uid(String imp_uid) {
        this.imp_uid = imp_uid;
    }

    /**
     * @return the merchant_uid
     */
    public String getMerchant_uid() {
        return merchant_uid;
    }

    /**
     * @param merchant_uid the merchant_uid to set
     */
    public void setMerchant_uid(String merchant_uid) {
        this.merchant_uid = merchant_uid;
    }

    /**
     * @return the paid_amount
     */
    public String getPaid_amount() {
        return paid_amount;
    }

    /**
     * @param paid_amount the paid_amount to set
     */
    public void setPaid_amount(String paid_amount) {
        this.paid_amount = paid_amount;
    }

    /**
     * @return the apply_num
     */
    public String getApply_num() {
        return apply_num;
    }

    /**
     * @param apply_num the apply_num to set
     */
    public void setApply_num(String apply_num) {
        this.apply_num = apply_num;
    }

    /**
     * @param buyer_email the buyer_email to set
     */
    public void setBuyer_email(String buyer_email) {
        this.buyer_email = buyer_email;
    }

    /**
     * @return the buyer_email
     */
    public String getBuyer_email() {
        return buyer_email;
    }

    /**
     * @param buyer_name the buyer_name to set
     */
    public void setBuyer_name(String buyer_name) {
        this.buyer_name = buyer_name;
    }

    /**
     * @return the buyer_name
     */
    public String getBuyer_name() {
        return buyer_name;
    }

    /**
     * @param buyer_tel the buyer_tel to set
     */
    public void setBuyer_tel(String buyer_tel) {
        this.buyer_tel = buyer_tel;
    }

    /**
     * @return the buyer_tel
     */
    public String getBuyer_tel() {
        return buyer_tel;
    }

    /**
     * @param buyer_addr the buyer_addr to set
     */
    public void setBuyer_addr(String buyer_addr) {
        this.buyer_addr = buyer_addr;
    }

    /**
     * @return the buyer_addr
     */
    public String getBuyer_addr() {
        return buyer_addr;
    }

    /**
     * @param buyer_postcode the buyer_postcode to set
     */
    public void setBuyer_postcode(String buyer_postcode) {
        this.buyer_postcode = buyer_postcode;
    }

    /**
     * @return the buyer_postcode
     */
    public String getBuyer_postcode() {
        return buyer_postcode;
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