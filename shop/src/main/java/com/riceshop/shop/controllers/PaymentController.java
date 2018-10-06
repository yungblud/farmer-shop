package com.riceshop.shop.controllers;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.nio.charset.Charset;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.core.JsonParser;
import com.riceshop.shop.models.Checkout;
import com.riceshop.shop.models.IamportResponse;
import com.riceshop.shop.models.Member;
import com.riceshop.shop.models.PostItem;
import com.riceshop.shop.service.CheckoutService;

import org.apache.commons.io.IOUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.json.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@RequestMapping("/api/payment")
@Controller
public class PaymentController {

    @Autowired
    CheckoutService checkoutService;

    @RequestMapping(value = "/complete", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> checkout(@RequestParam Map<String, String> body, Checkout checkout, HttpSession session) {
        if (session.getAttribute("memberLogged") != null) {
            if ((Boolean) session.getAttribute("memberLogged")) {
                String imp_uid = body.get("imp_uid").toString();
                String merchant_uid = body.get("merchant_uid").toString();
                String paid_amount = body.get("paid_amount").toString();
                String apply_num = body.get("apply_num").toString();
                String buyer_email = body.get("buyer_email").toString();
                String buyer_name = body.get("buyer_name").toString();
                String buyer_tel = body.get("buyer_tel").toString();
                String buyer_addr = body.get("buyer_addr").toString();
                String buyer_postcode = body.get("buyer_postcode").toString();
                String ordered_list = body.get("ordered_list").toString();
                String ordered_number = body.get("ordered_number").toString();
                String buyer_id = body.get("buyer_id").toString();
                String item_number = body.get("item_number").toString();

                String createdAt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());

                checkout.setImp_uid(imp_uid);
                checkout.setMerchant_uid(merchant_uid);
                checkout.setPaid_amount(paid_amount);
                checkout.setApply_num(apply_num);
                checkout.setBuyer_email(buyer_email);
                checkout.setBuyer_name(buyer_name);
                checkout.setBuyer_tel(buyer_tel);
                checkout.setBuyer_addr(buyer_addr);
                checkout.setBuyer_postcode(buyer_postcode);
                checkout.setOrdered_list(ordered_list);
                checkout.setOrdered_number(ordered_number);
                checkout.setCreatedAt(createdAt);
                checkout.setBuyer_id(buyer_id);
                checkout.setItem_number(item_number);

                try {
                    checkout = checkoutService.getCheckoutById(checkoutService.checkout(checkout));

                    return new ResponseEntity<>(true, HttpStatus.OK);
                } catch (Exception e) {
                    e.printStackTrace();
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            } else {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

    }

    @RequestMapping(value = "/token", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> getToken(HttpSession session) {
        if (session.getAttribute("memberLogged") != null) {
            if ((Boolean) session.getAttribute("memberLogged")) {
                try {
                    String url = "https://api.iamport.kr/users/getToken";

                    HttpClient httpclient = HttpClients.createDefault();
                    HttpPost httppost = new HttpPost(url);

                    // Request parameters and other properties.
                    List<NameValuePair> params = new ArrayList<NameValuePair>(2);
                    params.add(new BasicNameValuePair("imp_key", "YOUR_IMPORT_KEY"));
                    params.add(new BasicNameValuePair("imp_secret",
                            "YOUR_IMPORT_SECRET_KEY"));
                    httppost.setEntity(new UrlEncodedFormEntity(params, "UTF-8"));

                    // Execute and get the response.
                    HttpResponse response = httpclient.execute(httppost);
                    HttpEntity entity = response.getEntity();

                    if (entity != null) {
                        InputStream instream = entity.getContent();

                        try {
                            // do something useful
                            // String rspStr = IOUtils.toString(instream, "utf-8");
                            // System.out.println(IOUtils.toString(instream, "utf-8"));
                            // String replaced = IOUtils.toString(instream, "utf-8").replaceAll("\\", "");
                            // System.out.println(replaced);
                            IamportResponse iamportResponse = new IamportResponse();
                            iamportResponse.setResponseJSON(IOUtils.toString(instream, "utf-8"));
                            return new ResponseEntity<>(iamportResponse, HttpStatus.OK);
                        } catch (Exception e) {
                            e.printStackTrace();
                        } finally {
                            instream.close();

                        }

                    }
                    return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
            } else {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        // add reuqest header
    }

    @RequestMapping(value = "/merchantuid", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> getMerchantUid(@RequestBody Map<String, String> body, HttpSession session) {
        if (session.getAttribute("memberLogged") != null) {
            if ((Boolean) session.getAttribute("memberLogged")) {
                String merchant_uid = body.get("merchant_uid");
                System.out.println("merchantuid: " + merchant_uid);
                String accessToken = body.get("accessToken");
                System.out.println(accessToken);
                String amount = body.get("amount");
                System.out.println(amount);
                try {
                    String url = "https://api.iamport.kr/payments/prepare";

                    HttpClient httpclient = HttpClients.createDefault();
                    HttpPost httppost = new HttpPost(url);

                    // Request parameters and other properties.
                    List<NameValuePair> params = new ArrayList<NameValuePair>(2);
                    params.add(new BasicNameValuePair("merchant_uid", merchant_uid));
                    params.add(new BasicNameValuePair("amount", amount));
                    httppost.setEntity(new UrlEncodedFormEntity(params, "UTF-8"));
                    httppost.setHeader("Authorization", accessToken);

                    // Execute and get the response.
                    HttpResponse response = httpclient.execute(httppost);
                    HttpEntity entity = response.getEntity();

                    if (entity != null) {
                        InputStream instream = entity.getContent();

                        try {
                            // do something useful
                            // String rspStr = IOUtils.toString(instream, "utf-8");
                            // System.out.println(IOUtils.toString(instream, "utf-8"));
                            // String replaced = IOUtils.toString(instream, "utf-8").replaceAll("\\", "");
                            // System.out.println(replaced);
                            IamportResponse iamportResponse = new IamportResponse();
                            iamportResponse.setResponseJSON(IOUtils.toString(instream, "utf-8"));
                            System.out.println(IOUtils.toString(instream, "utf-8"));
                            return new ResponseEntity<>(iamportResponse, HttpStatus.OK);
                        } catch (Exception e) {
                            e.printStackTrace();
                        } finally {
                            instream.close();

                        }

                    }
                    return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
            } else {
                return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
        }

    }

    @RequestMapping(value = "/user/{userID}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getCheckoutListByUserID(@PathVariable String userID, HttpSession session) {
        if (session.getAttribute("memberLogged") != null) {
            if ((Boolean) session.getAttribute("memberLogged") && session.getAttribute("loggedUserID").equals(userID)) {
                try {
                    List<Checkout> checkouts = checkoutService.getCheckoutListByUserID(userID);

                    return new ResponseEntity<>(checkouts, HttpStatus.OK);
                } catch (Exception e) {
                    e.printStackTrace();
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

    }

    @RequestMapping(value = "/user/{userID}/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getUserCheckedListById(@PathVariable String userID, @PathVariable String id,
            HttpSession session) {
        if (session.getAttribute("memberLogged") != null) {
            if ((Boolean) session.getAttribute("memberLogged") && session.getAttribute("loggedUserID").equals(userID)) {
                try {
                    Checkout checkout = checkoutService.getUserCheckedListById(userID, Long.parseLong(id));
                    return new ResponseEntity<>(checkout, HttpStatus.OK);
                } catch (Exception e) {
                    e.printStackTrace();
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getCheckoutList(@RequestParam("filter") String filter, HttpSession session) {
        if (!(Boolean) session.getAttribute("adminLogged")) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        List<Checkout> checkouts;
        try {
            if (filter.equals("all")) {
                checkouts = checkoutService.getCheckoutList();
                return new ResponseEntity<>(checkouts, HttpStatus.OK);
            }

            if (filter.equals("checked")) {
                checkouts = checkoutService.getCheckedList();
                return new ResponseEntity<>(checkouts, HttpStatus.OK);
            }
            if (filter.equals("unchecked")) {
                checkouts = checkoutService.getUncheckedList();
                return new ResponseEntity<>(checkouts, HttpStatus.OK);
            }
            if (filter.equals("cancelled")) {
                checkouts = checkoutService.getCancelledList();
                return new ResponseEntity<>(checkouts, HttpStatus.OK);
            }
            if (filter.equals("needsongjang")) {
                checkouts = checkoutService.getNeedSongjang();
                return new ResponseEntity<>(checkouts, HttpStatus.OK);
            }

            if (filter.equals("completed")) {
                checkouts = checkoutService.getCompletedList();
                return new ResponseEntity<>(checkouts, HttpStatus.OK);
            }

            if (filter.equals("paybacked")) {
                checkouts = checkoutService.getPaybackedList();
                return new ResponseEntity<>(checkouts, HttpStatus.OK);
            }

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/user", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> getUserCheckoutList(@RequestParam("filter") String filter, HttpSession session,
            @RequestBody Map<String, String> body) {
        if (session.getAttribute("memberLogged") != null) {
            if ((Boolean) session.getAttribute("memberLogged")) {
                String userID = body.get("userID");

                if (session.getAttribute("loggedUserID").equals(userID)) {
                    List<Checkout> checkouts;
                    try {
                        if (filter.equals("all")) {
                            checkouts = checkoutService.getCheckoutListByUserID(userID);
                            return new ResponseEntity<>(checkouts, HttpStatus.OK);
                        }
                        if (filter.equals("checked")) {
                            checkouts = checkoutService.getCheckoutListOnlyChecked(userID);
                            return new ResponseEntity<>(checkouts, HttpStatus.OK);
                        }
                        if (filter.equals("unchecked")) {
                            checkouts = checkoutService.getCheckoutListOnlyUnchecked(userID);
                            return new ResponseEntity<>(checkouts, HttpStatus.OK);
                        }
                        if (filter.equals("cancelled")) {
                            checkouts = checkoutService.getCheckoutListOnlyCancelled(userID);
                            return new ResponseEntity<>(checkouts, HttpStatus.OK);
                        }
                        if (filter.equals("completed")) {
                            checkouts = checkoutService.getCheckoutListOnlyCompleted(userID);
                            return new ResponseEntity<>(checkouts, HttpStatus.OK);
                        }
                        if (filter.equals("paybacked")) {
                            checkouts = checkoutService.getCheckoutListOnlyPaybacked(userID);
                            return new ResponseEntity<>(checkouts, HttpStatus.OK);
                        }
                        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
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
        } else {
            return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getCheckoutById(@PathVariable long id, HttpSession session) {
        if (!(Boolean) session.getAttribute("adminLogged")) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        try {
            Checkout checkout = checkoutService.getCheckoutById(id);
            return new ResponseEntity<>(checkout, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/search", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> search(@RequestParam("filter") String filter, @RequestParam("value") String value,
            HttpSession session) {
        List<Checkout> checkouts;
        if (!(Boolean) session.getAttribute("adminLogged")) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        try {
            if (filter.equals("username")) {
                checkouts = checkoutService.searchByUsername(value);
                return new ResponseEntity<>(checkouts, HttpStatus.OK);
            }
            if (filter.equals("email")) {
                checkouts = checkoutService.searchByEmail(value);
                return new ResponseEntity<>(checkouts, HttpStatus.OK);
            }
            if (filter.equals("address")) {
                checkouts = checkoutService.searchByAddress(value);
                return new ResponseEntity<>(checkouts, HttpStatus.OK);
            }

            if (filter.equals("userphone")) {
                checkouts = checkoutService.searchByPhone(value);
                return new ResponseEntity<>(checkouts, HttpStatus.OK);
            }

            if (filter.equals("userID")) {
                checkouts = checkoutService.searchByUserID(value);
                return new ResponseEntity<>(checkouts, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/check/{id}/{songjang}", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> setCheck(@PathVariable long id, @PathVariable String songjang, HttpSession session) {
        if (!(Boolean) session.getAttribute("adminLogged")) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        try {
            checkoutService.setCheck(id);
            Checkout checkout = checkoutService.getCheckoutById(id);
            if (!songjang.equals("none")) {
                checkout.setSongjang(songjang);
                checkoutService.updateSongjang(checkout);
                return new ResponseEntity<>(HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/cancel/check/{id}", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> cancelCheck(@PathVariable long id, HttpSession session) {
        if (!(Boolean) session.getAttribute("adminLogged")) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        try {
            checkoutService.cancelCheck(id);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/cancel/{id}", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> setCancel(@PathVariable long id, HttpSession session) {
        if (session.getAttribute("memberLogged") != null) {
            if ((Boolean) session.getAttribute("memberLogged")) {
                try {
                    checkoutService.setCancel(id);
                    return new ResponseEntity<>(HttpStatus.OK);
                } catch (Exception e) {
                    e.printStackTrace();
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            } else {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @RequestMapping(value = "/payback/{id}", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> setPayback(@PathVariable long id, HttpSession session) {
        if (!(Boolean) session.getAttribute("adminLogged")) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        try {
            checkoutService.setPayback(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/complete/{id}", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> setComplete(@PathVariable long id, HttpSession session,
            @RequestBody Map<String, String> body) {

        if (
        // session.getAttribute("memberLogged") != null
        // ||
        (Boolean) session.getAttribute("adminLogged")) {
            if (
            // (Boolean) session.getAttribute("memberLogged") ||
            (Boolean) session.getAttribute("adminLogged")) {
                String userID = body.get("userID");
                if (
                // session.getAttribute("loggedUserID").equals(userID)
                // ||
                (Boolean) session.getAttribute("adminLogged")) {
                    try {
                        checkoutService.setComplete(id);
                        return new ResponseEntity<>(true, HttpStatus.OK);
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
        } else {
            return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
        }
    }

}