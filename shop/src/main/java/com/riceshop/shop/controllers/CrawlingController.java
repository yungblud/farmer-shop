package com.riceshop.shop.controllers;


import java.util.List;

import com.riceshop.shop.crawler.Crawler;
import com.riceshop.shop.models.Parcel;

import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMethod;;

@Controller
@RequestMapping("/api/crawling")
public class CrawlingController {


    @RequestMapping(value="/{songjang}", method=RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> htmlCrawl(@PathVariable String songjang) {
        Crawler crawler = new Crawler();
        // crawler.getPageHTML("https://www.doortodoor.co.kr/parcel/doortodoor.do?fsp_action=PARC_ACT_002&fsp_cmd=retrieveInvNoACT&invc_no=615349675940");
        List<Parcel> parcels = crawler.getPageHTML("https://www.doortodoor.co.kr/parcel/doortodoor.do?fsp_action=PARC_ACT_002&fsp_cmd=retrieveInvNoACT&invc_no=" + songjang);
        return new ResponseEntity<>(parcels, HttpStatus.OK);
    }
}