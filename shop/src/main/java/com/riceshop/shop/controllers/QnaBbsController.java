package com.riceshop.shop.controllers;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.riceshop.shop.models.QnaBbs;
import com.riceshop.shop.service.QnaBbsDAO;
import com.riceshop.shop.service.QnaBbsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;;

@Controller
@RequestMapping("/api/qnabbs")
public class QnaBbsController {
    @Autowired
    QnaBbsService qnaBbsService;

    @RequestMapping(value = "/", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> writeQna(HttpSession session, @RequestBody Map<String, String> body, QnaBbs qnaBbs) {

        if (session.getAttribute("memberLogged") != null) {
            if ((Boolean) session.getAttribute("memberLogged")) {
                String title = body.get("title");
                String content = body.get("content");
                String username = body.get("username");
                Boolean isprivate = Boolean.parseBoolean(body.get("isprivate"));

                String createdAt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
                try {
                    qnaBbs.setTitle(title);
                    qnaBbs.setContent(content);
                    qnaBbs.setUsername(username);
                    qnaBbs.setCreatedAt(createdAt);
                    qnaBbs.setIsprivate(isprivate);

                    qnaBbs = qnaBbsService.getQnaById(qnaBbsService.writeQna(qnaBbs));

                    return new ResponseEntity<>(qnaBbs, HttpStatus.OK);
                } catch (Exception e) {
                    e.printStackTrace();
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            } else {
                return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @RequestMapping(value = "/answer/{id}", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> writeAnswer(HttpSession session, @PathVariable long id,
            @RequestBody Map<String, String> body, QnaBbs qnaBbs) {
        String title = body.get("title");
        String content = body.get("content");
        // String username = body.get("username");
        String createdAt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
        try {
            qnaBbs.setTitle(title);
            qnaBbs.setContent(content);
            qnaBbs.setUsername("관리자");
            qnaBbs.setCreatedAt(createdAt);
            qnaBbs = qnaBbsService.getQnaById(qnaBbsService.writeAnswer(id, qnaBbs));

            return new ResponseEntity<>(qnaBbs, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getListByPage(@RequestParam String page, HttpServletRequest request) {
        long bbsPage = 0;
        if (page == null) {
            page = "1";
            bbsPage = Long.parseLong(page);
        } else {
            bbsPage = Long.parseLong(page);
        }
        if (bbsPage < 1) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        try {
            List<QnaBbs> bbsList = qnaBbsService.getQnaBbsList(bbsPage);
            HttpHeaders headers = new HttpHeaders();
            Long count = qnaBbsService.getCount();
            headers.set("last-page", Math.ceil(count / 10) + 1 + "");

            return new ResponseEntity<>(bbsList, headers, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/answers", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getQnaBbsListWithAnswers(@RequestParam String page) {
        long bbsPage = 0;
        if (page == null) {
            page = "1";
            bbsPage = Long.parseLong(page);
        } else {
            bbsPage = Long.parseLong(page);
        }
        if (bbsPage < 1) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        try {
            List<QnaBbs> qnaBbsList = qnaBbsService.getQnaBbsListWithAnswers(bbsPage);
            for (QnaBbs qnabbs : qnaBbsList) {
                qnabbs.setContent(null);
            }
            HttpHeaders headers = new HttpHeaders();
            Long count = qnaBbsService.getCount();
            System.out.println("Count: " + count);
            headers.set("last-page", (Math.ceil((double) count / 10)) + "");
            System.out.println("LastPage: " + (Math.ceil((double) count / 10)));
            return new ResponseEntity<>(qnaBbsList, headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getQnaById(@PathVariable long id, QnaBbs qnaBbs) {
        try {
            qnaBbs = qnaBbsService.getQnaById(id);
            return new ResponseEntity<>(qnaBbs, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<?> removeQna(@PathVariable long id, HttpSession session, QnaBbs qnaBbs) {
        if (session.getAttribute("memberLogged") != null) {
            if ((Boolean) session.getAttribute("memberLogged")) {
                try {
                    qnaBbs = qnaBbsService.getQnaById(id);
                    if (qnaBbs.getUsername().equals(session.getAttribute("loggedUserID"))) {
                        Boolean isSuccess = qnaBbsService.removeQna(id);
                        if (isSuccess) {
                            return new ResponseEntity<>(true, HttpStatus.OK);
                        } else {
                            System.out.println("Internal Here1");
                            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                        }
                    } else {
                        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    System.out.println("Internal Here2");
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            } else {
                return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
        }

    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PATCH)
    @ResponseBody
    public ResponseEntity<?> updateQna(@PathVariable long id, HttpSession session, QnaBbs qnaBbs,
            @RequestBody Map<String, String> body) {
        if (session.getAttribute("memberLogged") != null) {
            if ((Boolean) session.getAttribute("memberLogged")) {
                try {
                    qnaBbs = qnaBbsService.getQnaById(id);
                    if (qnaBbs.getUsername().equals(session.getAttribute("loggedUserID"))) {
                        String title = body.get("title");
                        String content = body.get("content");
                        String createdAt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());

                        qnaBbsService.updateQna(id, title, content, createdAt);

                        return new ResponseEntity<>(qnaBbsService, HttpStatus.OK);
                    } else {
                        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            } else {
                return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @RequestMapping(value = "/answer/{id}", method = RequestMethod.PATCH)
    @ResponseBody
    public ResponseEntity<?> updateAnswer(@PathVariable long id, HttpSession session,
            @RequestBody Map<String, String> body) {
        if (session.getAttribute("adminLogged") != null) {
            if ((Boolean) session.getAttribute("adminLogged")) {
                try {
                    String title = body.get("title");
                    String content = body.get("content");
                    String createdAt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());

                    qnaBbsService.updateQna(id, title, content, createdAt);

                    return new ResponseEntity<>(qnaBbsService, HttpStatus.OK);
                } catch (Exception e) {
                    e.printStackTrace();
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            } else {
                return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @RequestMapping(value = "/answer/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<?> removeAnswer(@PathVariable long id, HttpSession session) {
        if (session.getAttribute("adminLogged") != null) {
            if ((Boolean) session.getAttribute("adminLogged")) {
                try {
                    qnaBbsService.removeQna(id);
                    return new ResponseEntity<>(qnaBbsService, HttpStatus.OK);
                } catch (Exception e) {
                    e.printStackTrace();
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            } else {
                return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @RequestMapping(value = "/search", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> searchQnaBbs(@RequestBody Map<String, String> body, @RequestParam String filter) {
        List<QnaBbs> qnaBbs;
        String value = body.get("value");
        try {

            if (filter.equals("title")) {
                qnaBbs = qnaBbsService.searchByTitle(value);
                return new ResponseEntity<>(qnaBbs, HttpStatus.OK);
            }

            if (filter.equals("username")) {
                qnaBbs = qnaBbsService.searchByUserID(value);
                return new ResponseEntity<>(qnaBbs, HttpStatus.OK);
            }

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/check", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> privateCheck(@RequestBody Map<String, String> body, HttpSession session) {
        long id = Long.parseLong(body.get("id"));
        try {

            QnaBbs qnaBbs = qnaBbsService.getQnaById(id);

            if (qnaBbs.getIsprivate()) {
                if (((String) session.getAttribute("loggedUserID")).equals(qnaBbs.getUsername())) {
                    return new ResponseEntity<>(true, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
                }
            } else {
                return new ResponseEntity<>(true, HttpStatus.OK);
            }

            // Boolean checked = qnaBbsService.checkPassword(password, Long.parseLong(id));

            // if (checked) {
            // session.setAttribute("authQna", id);
            // return new ResponseEntity<>(checked, HttpStatus.OK);
            // }
            // return new ResponseEntity<>(checked, HttpStatus.UNAUTHORIZED);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/check/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> checkAuthorized(HttpSession session, @PathVariable long id) {
        // String authQnaId = (String) session.getAttribute("authQna");

        try {
            if (session.getAttribute("adminLogged") != null) {
                if ((Boolean) session.getAttribute("adminLogged")) {
                    return new ResponseEntity<>(HttpStatus.OK);
                }
            } else {
                QnaBbs qnaBbs = qnaBbsService.getQnaById(id);

                if (qnaBbs.getIsprivate()) {
                    if (qnaBbs.getIsanswer()) {
                        qnaBbs = qnaBbsService.getQnaByGrpno(qnaBbs.getGrpno());
                        if (((String) session.getAttribute("loggedUserID")).equals(qnaBbs.getUsername())) {
                            return new ResponseEntity<>(true, HttpStatus.OK);
                        } else {
                            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
                        }
                    }
                    if (((String) session.getAttribute("loggedUserID")).equals(qnaBbs.getUsername())) {
                        return new ResponseEntity<>(true, HttpStatus.OK);
                    } else {
                        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
                    }
                } else {
                    return new ResponseEntity<>(true, HttpStatus.OK);
                }
            }
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}