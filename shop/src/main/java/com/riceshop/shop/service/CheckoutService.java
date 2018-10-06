package com.riceshop.shop.service;

import java.util.List;

import com.riceshop.shop.models.Checkout;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CheckoutService {
    @Autowired
    CheckoutDAO checkoutDAO;

    public Checkout getCheckoutById(long id) {
        return checkoutDAO.getCheckoutById(id);
    }

    public Checkout getUserCheckedListById(String userID, long id) {
        return checkoutDAO.getUserCheckedListById(userID, id);
    }

    public void updateSongjang(Checkout checkout) {
        checkoutDAO.updateSongjang(checkout);
    }

    public void setCancel(long id) {
        checkoutDAO.setCancel(id);
    }

    public long checkout(Checkout checkout) {
        return checkoutDAO.checkout(checkout);
    }

    public List<Checkout> getCheckoutList() {
        return checkoutDAO.getCheckoutList();
    }

    public List<Checkout> getUncheckedList() {
        return checkoutDAO.getUncheckedList();
    }

    public List<Checkout> getCancelledList() {
        return checkoutDAO.getCancelledList();
    }

    public List<Checkout> getCheckedList() {
        return checkoutDAO.getCheckedList();
    }

    public List<Checkout> getNeedSongjang() {
        return checkoutDAO.getNeedSongjang();
    }

    public List<Checkout> getCheckoutListByUserID(String userID) {
        return checkoutDAO.getCheckoutListByUserID(userID);
    }

    public List<Checkout> getCompletedList() {
        return checkoutDAO.getCompletedList();
    }

    public List<Checkout> getPaybackedList() {
        return checkoutDAO.getPaybackedList();
    }

    public List<Checkout> searchByUsername(String value) {
        return checkoutDAO.searchByUsername(value);
    }

    public List<Checkout> searchByEmail(String value) {
        return checkoutDAO.searchByEmail(value);
    }

    public List<Checkout> searchByAddress(String value) {
        return checkoutDAO.searchByAddress(value);
    }

    public List<Checkout> searchByPhone(String value) {
        return checkoutDAO.searchByPhone(value);
    }

    public List<Checkout> searchByUserID(String value) {
        return checkoutDAO.searchByUserID(value);
    }

    public void setCheck(long id) {
        checkoutDAO.setCheck(id);
    }

    public void setPayback(long id) {
        checkoutDAO.setPayback(id);
    }

    public void setComplete(long id) {
        checkoutDAO.setComplete(id);
    }

    public void cancelCheck(long id) {
        checkoutDAO.cancelCheck(id);
    }

    public List<Checkout> getCheckoutListOnlyChecked(String userID) {
        return checkoutDAO.getCheckoutListOnlyChecked(userID);
    }

    public List<Checkout> getCheckoutListOnlyUnchecked(String userID) {
        return checkoutDAO.getCheckoutListOnlyUnchecked(userID);
    }

    public List<Checkout> getCheckoutListOnlyCancelled(String userID) {
        return checkoutDAO.getCheckoutListOnlyCancelled(userID);
    }

    public List<Checkout> getCheckoutListOnlyCompleted(String userID) {
        return checkoutDAO.getCheckoutListOnlyCompleted(userID);
    }

    public List<Checkout> getCheckoutListOnlyPaybacked(String userID) {
        return checkoutDAO.getCheckoutListOnlyPaybacked(userID);
    }
}