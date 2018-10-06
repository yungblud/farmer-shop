package com.riceshop.shop.crawler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import com.riceshop.shop.models.Parcel;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class Crawler {
    private HashSet<String> links;

    public Crawler() {
        links = new HashSet<String>();
    }

    public List<Parcel> getPageHTML(String URL) {
        if (!links.contains(URL)) {
            try {
                // 4. (i) If not add it to the index
                if (links.add(URL)) {
                    System.out.println(URL);
                }

                // 2. Fetch the HTML code
                Document document = Jsoup.connect(URL).get();
                // System.out.println(document);
                // return document;
                // 3. Parse the HTML to extract links to other URLs
                Elements body = document.select("body");
                Elements board_area = body.select(".board_area");
                Elements tdElements = board_area.select("table.mb15 tbody tr td");
                List<Map<String, String>> results = new ArrayList<Map<String, String>>();
                int count = 0;
                
                List<Parcel> parcels = new ArrayList<>();
                // Parcel parcel = new Parcel();
                for(int i = 0;i<tdElements.size();i++) {
                    
                    // results.add(i, tdElements.get(i).childNode(0).toString());
                    Map<String, String> temp = new HashMap<>();
                    if(i % 4 == 0) {
                        // System.out.println(tdElements.get(i).childNode(0).toString());
                        // parcel.setStep(tdElements.get(i).childNode(0).toString());
                        temp.put("step", tdElements.get(i).childNode(0).toString());
                    } else if(i % 4 == 1) {
                        // System.out.println(tdElements.get(i).childNode(0).toString());
                        // parcel.setDate(tdElements.get(i).childNode(0).toString());
                        temp.put("date", tdElements.get(i).childNode(0).toString());
                    } else if(i % 4 == 2) {
                        // System.out.println(tdElements.get(i).childNode(0).toString());
                        // parcel.setStatus(tdElements.get(i).childNode(0).toString());
                        temp.put("status", tdElements.get(i).childNode(0).toString());
                    } else if(i % 4 == 3) {
                        // System.out.println(tdElements.get(i).children().first().text());
                        // parcel.setLocation(tdElements.get(i).children().first().text());
                        temp.put("location", tdElements.get(i).children().first().text());
                        // parcels.add(count, parcel);
                        // parcel = new Parcel();
                    }
                    
                    results.add(count, temp);
                    temp = new HashMap<>();
                    count++;
                }
                count = 0;

                Parcel parcel = new Parcel();
                for(int i = 0;i<results.size();i++) {
                    if(i%4 == 0) {
                        parcel.setStep(results.get(i).get("step"));
                    } else if(i%4 == 1) {
                        parcel.setDate(results.get(i).get("date"));
                    } else if(i%4 == 2) {
                        parcel.setStatus(results.get(i).get("status"));
                    } else if(i%4 == 3) {
                        parcel.setLocation(results.get(i).get("location"));
                        parcels.add(count, parcel);
                        parcel = new Parcel();
                        count++;
                    }
                }

                // 5. For each extracted URL... go back to Step 4.
                // for (Element page : linksOnPage) {
                //     getPageHTML(page.attr("abs:href"));
                // }
                return parcels;
            } catch (IOException e) {
                System.err.println("For '" + URL + "': " + e.getMessage());
                return null;
                
            }
            
        }
        return null;
    }
}