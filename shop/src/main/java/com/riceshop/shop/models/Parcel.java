package com.riceshop.shop.models;

public class Parcel {
    private String step;
    private String date;
    private String status;
    private String location;

    /**
     * @return the status
     */
    public String getStatus() {
        return status;
    }
    /**
     * @param status the status to set
     */
    public void setStatus(String status) {
        this.status = status;
    }

    /**
     * @return the step
     */
    public String getStep() {
        return step;
    }
    /**
     * @param step the step to set
     */
    public void setStep(String step) {
        this.step = step;
    }
    /**
     * @return the date
     */
    public String getDate() {
        return date;
    }
    /**
     * @param date the date to set
     */
    public void setDate(String date) {
        this.date = date;
    }

    /**
     * @return the location
     */
    public String getLocation() {
        return location;
    }
    /**
     * @param location the location to set
     */
    public void setLocation(String location) {
        this.location = location;
    }

}