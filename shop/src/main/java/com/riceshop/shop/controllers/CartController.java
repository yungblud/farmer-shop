package com.riceshop.shop.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.riceshop.shop.models.Cart;
import com.riceshop.shop.models.CartError;
import com.riceshop.shop.models.CartLog;

import org.omg.PortableServer.IdAssignmentPolicy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMethod;;

@RequestMapping("/api/cart")
@Controller
public class CartController {


    @RequestMapping(value="/", method=RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> addCart(@RequestBody Map<String, String> body, HttpServletRequest request,
            HttpSession session) {
        Map<String, String[]> cartMap = (Map<String, String[]>) session.getAttribute("cartSessionId");

        String id = body.get("id").toString();
        String title = body.get("title");
        String amount = body.get("amount");
        String thumbnailImage = body.get("thumbnailImage");
        String totalPrice = body.get("totalPrice");
        String option = body.get("option");
        String ver = body.get("ver");

        try {
            if (amount.equals("0") || Integer.parseInt(amount) <= 0) {
                CartError cartError = new CartError();
                cartError.setErrorCode(100);
                cartError.setErrorLog("수량이 제대로 선택되지 않았습니다.");
                return new ResponseEntity<>(cartError, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            e.printStackTrace();
            CartError cartError = new CartError();
            cartError.setErrorCode(100);
            cartError.setErrorLog("수량이 제대로 선택되지 않았습니다.");
            return new ResponseEntity<>(cartError, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (cartMap == null) {
            cartMap = new HashMap<String, String[]>();
        }

        System.out.println("cartmap 0 : " + cartMap.get((cartMap.size() - 1) + ""));

        Iterator<String> keys = cartMap.keySet().iterator();
        int i = 0;
            while (keys.hasNext()) {
                
                String key = keys.next();
                String[] eachCartSession = cartMap.get(key);
                if(eachCartSession[0].equals(id) && eachCartSession[5].equals(option)) {
                    // System.out.println(cartMap.get(i + "")[0]);
                    System.out.println("같은 상품을 주문");
                    int beforeAmount = Integer.parseInt(cartMap.get(key)[2]);
                    int updatedAmount = Integer.parseInt(amount);
                    String[] updatedCartDetailArray = { id, title, amount, thumbnailImage, totalPrice, option, key };
                    cartMap.put(key + "", updatedCartDetailArray);
                    session.setAttribute("cartSessionId", cartMap);

                    CartLog cartLog = new CartLog();
                    
                    cartLog.setCartLog("이미 장바구니에 담겨있어서 수량을 조정하였습니다.");
                    return new ResponseEntity<>(cartLog, HttpStatus.OK);
                }
                // for (int i = 0; i < 5; i++) {
                //     System.out.println("hey!: " + eachCartSession[i]);
                // }
                i++;
            }

        // if (cartMap.get(id) != null ) {
            
            // int amountResult = beforeAmount + updatedAmount;
            
            // if(cartMap.get(id))
            

            // cartMap.forEach((k,v)->for(int i = 0;i<4;i+);
            

            // System.out.println(cartMap.get("1")[0]);
            // System.out.println(cartMap.get("1")[1]);
            // System.out.println(cartMap.get("1")[2]);
            // System.out.println(cartMap.get("1")[3]);

            // return new ResponseEntity<>(cartLog, HttpStatus.OK);
        // } else {
            String[] cartDetailArray = { id, title, amount, thumbnailImage, totalPrice, option, cartMap.size() + 1 + "" };
            cartMap.put(cartMap.size() + 1 + "", cartDetailArray);
            System.out.println("cartID: " + cartMap.size() + 1);
            System.out.println("length2: " +cartMap.size());
            session.setAttribute("cartSessionId", cartMap);

            // Iterator<String> keys = cartMap.keySet().iterator();
            // while (keys.hasNext()) {
            //     String key = keys.next();
            //     String[] eachCartSession = cartMap.get(key);
            //     for (int i = 0; i < 4; i++) {
            //         System.out.println(eachCartSession[i]);
            //     }
            // }

            CartLog cartLog = new CartLog();
            if(ver != null) {
                cartLog.setCartLog("바로 결제페이지로 이동합니다.");
                return new ResponseEntity<>(cartLog, HttpStatus.OK);
            } 

            
            cartLog.setCartLog("장바구니에 담겼습니다.");
            return new ResponseEntity<>(cartLog, HttpStatus.OK);
            
        // }


    }   

    @RequestMapping(value="/", method=RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getCartList(HttpSession session) {
        System.out.println("Hey you are in here");
        Map<String, String[]> cartMap = (Map<String, String[]>) session.getAttribute("cartSessionId");
        if(cartMap == null) {
            return new ResponseEntity<>(null, HttpStatus.OK);
        }
        Iterator<String> keys = cartMap.keySet().iterator();
        // ArrayList<String[]> responseBody = new ArrayList<>();
        ArrayList<Cart> cartList = new ArrayList<>();

        System.out.println("length: " +cartMap.size());
        while (keys.hasNext()) {
            
            String key = keys.next();
            System.out.println("key: " +key);
            String[] eachCartSession = cartMap.get(key);
            System.out.println("eachCart: " + eachCartSession[5]);
            // for (int i = 0; i < 4; i++) {
            //     System.out.println(eachCartSession[i]);
                
            // }
            // responseBody.add(eachCartSession);
            if(eachCartSession[1].length() > 20) {
                eachCartSession[1] = eachCartSession[1].substring(0, 20) + "....";
            }
            Cart cart = new Cart();
            cart.setCartId(Integer.parseInt(eachCartSession[6]));
            cart.setId(Integer.parseInt(eachCartSession[0]));
            cart.setTitle(eachCartSession[1]);
            cart.setAmount(Integer.parseInt(eachCartSession[2]));
            cart.setThumbnailImage(eachCartSession[3]);
            cart.setTotalPrice(Integer.parseInt(eachCartSession[4]));
            cart.setOption(eachCartSession[5]);
            cartList.add(cart);
        }

        return new ResponseEntity<>(cartList, HttpStatus.OK);

    }   

    @RequestMapping(value="/", method=RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<?> removeCartList(HttpSession session) {

        session.setAttribute("cartSessionId", null);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value="/{id}", method=RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<?> removeCartById(@PathVariable int id, HttpServletRequest request, HttpSession session) {
        System.out.println("id: " + id);
        Map<String, String[]> cartMap = (Map<String, String[]>) session.getAttribute("cartSessionId");
        cartMap.remove(id + "");

        Iterator<String> keys = cartMap.keySet().iterator();
        // ArrayList<String[]> responseBody = new ArrayList<>();
        ArrayList<Cart> cartList = new ArrayList<>();
        while (keys.hasNext()) {
            String key = keys.next();
            String[] eachCartSession = cartMap.get(key);
            // for (int i = 0; i < 4; i++) {
            //     System.out.println(eachCartSession[i]);
                
            // }
            // responseBody.add(eachCartSession);
            Cart cart = new Cart();
            System.out.println("real CartID: " + eachCartSession[6]);
            cart.setId(Integer.parseInt(eachCartSession[0]));
            cart.setTitle(eachCartSession[1]);
            cart.setAmount(Integer.parseInt(eachCartSession[2]));
            cart.setThumbnailImage(eachCartSession[3]);
            cart.setTotalPrice(Integer.parseInt(eachCartSession[4]));
            cart.setOption(eachCartSession[5]);
            cart.setCartId(Integer.parseInt(eachCartSession[6]));
            cartList.add(cart);
        }

        return new ResponseEntity<>(cartList, HttpStatus.OK);

    }
}