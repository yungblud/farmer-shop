package com.riceshop.shop.models;

public class SignupError {
    private int errorCode;
    private String errorLog;

    /**
     * @param errorCode the errorCode to set
     */
    public void setErrorCode(int errorCode) {
        this.errorCode = errorCode;
    }
    /**
     * @param errorLog the errorLog to set
     */
    public void setErrorLog(String errorLog) {
        this.errorLog = errorLog;
    }

    /**
     * @return the errorCode
     */
    public int getErrorCode() {
        return errorCode;
    }
    /**
     * @return the errorLog
     */
    public String getErrorLog() {
        return errorLog;
    }
}