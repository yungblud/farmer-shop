package com.riceshop.shop.models;

public class SettingError {
    private int errorCode;
    private String errorLog;

    /**
     * @param errorCode the errorCode to set
     */
    public void setErrorCode(int errorCode) {
        this.errorCode = errorCode;
    }
    /**
     * @return the errorCode
     */
    public int getErrorCode() {
        return errorCode;
    }
    /**
     * @param errorLog the errorLog to set
     */
    public void setErrorLog(String errorLog) {
        this.errorLog = errorLog;
    }
    /**
     * @return the errorLog
     */
    public String getErrorLog() {
        return errorLog;
    }
}