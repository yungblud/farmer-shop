package com.riceshop.shop.service;

import java.util.List;

import com.riceshop.shop.models.QnaBbs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QnaBbsService {
    @Autowired
    QnaBbsDAO qnaBbsDAO;

    public long writeQna(QnaBbs qnaBbs) {
        return qnaBbsDAO.writeQna(qnaBbs);
    }

    public QnaBbs getQnaById(long id) {
        return qnaBbsDAO.getQnaById(id);
    }

    public QnaBbs getQnaByGrpno(long grpno) {
        return qnaBbsDAO.getQnaByGrpno(grpno);
    }

    public long getCount() {
        return qnaBbsDAO.getCount();
    }

    public List<QnaBbs> getQnaBbsListWithAnswers(long page) {
        return qnaBbsDAO.getQnaBbsListWithAnswers(page);
    }

    public List<QnaBbs> getQnaBbsList(long page) {
        return qnaBbsDAO.getQnaBbsList(page);
    }

    public long writeAnswer(long id, QnaBbs answerQnsBbs) {
        return qnaBbsDAO.writeAnswer(id, answerQnsBbs);
    }

    public boolean removeQna(long id) {
        return qnaBbsDAO.removeQna(id);
    }

    public void updateQna(long id, String title, String content, String createdAt) {
        qnaBbsDAO.updateQna(id, title, content, createdAt);
    }

    public List<QnaBbs> searchByUserID(String userID) {
        return qnaBbsDAO.searchByUserID(userID);
    }

    public List<QnaBbs> searchByTitle(String title) {
        return qnaBbsDAO.searchByTitle(title);
    }

    public List<QnaBbs> searchByContent(String content) {
        return qnaBbsDAO.searchByContent(content);
    }

    // public Boolean checkPassword(String password, long id) {
    //     return qnaBbsDAO.checkPassword(password, id);
    // }
}