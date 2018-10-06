package com.riceshop.shop.controllers;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.riceshop.shop.models.ImageItem;
import com.riceshop.shop.service.MemberService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;;

@RequestMapping("/api/uploads")
@Controller
public class UploadController {
    @Autowired
    MemberService memberService;

    private final String uploadPath = "/riceshop/upload/";
    private final String tempPath = "/riceshop/upload/temp/";

    @RequestMapping(value = "/image", method = RequestMethod.GET)
    public ResponseEntity<?> image(@RequestParam(value = "imagename", required = true) String imagename,
            @RequestParam(value = "istemp", required = false) Boolean istemp, HttpServletRequest request,
            HttpServletResponse response) {

        if (istemp != null) {
            if (istemp) {
                File f = new File(tempPath + imagename);

                InputStream is = null;

                try {
                    is = new FileInputStream(f);
                    OutputStream oos = response.getOutputStream();
                    byte[] buf = new byte[8192];
                    int c = 0;
                    while ((c = is.read(buf, 0, buf.length)) > 0) {
                        oos.write(buf, 0, c);
                        oos.flush();
                    }
                    oos.close();
                    is.close();
                    return new ResponseEntity<>(true, HttpStatus.OK);

                } catch (Exception e) {
                    e.printStackTrace();
                    return new ResponseEntity<>(true, HttpStatus.INTERNAL_SERVER_ERROR);
                }
            } else {
                File f = new File(uploadPath + imagename);

                InputStream is = null;

                try {
                    is = new FileInputStream(f);
                    OutputStream oos = response.getOutputStream();
                    byte[] buf = new byte[8192];
                    int c = 0;
                    while ((c = is.read(buf, 0, buf.length)) > 0) {
                        oos.write(buf, 0, c);
                        oos.flush();
                    }
                    oos.close();
                    is.close();
                    return new ResponseEntity<>(true, HttpStatus.OK);

                } catch (Exception e) {
                    e.printStackTrace();
                    return new ResponseEntity<>(true, HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        // String saveName = request.getQueryString();
        // if (saveName == null) {
        // return;
        // }

    }

    @RequestMapping(value = "/editor/image", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> editorUploadImage(ImageItem imageItem, @RequestParam("file") MultipartFile file,
            HttpSession session) {

            System.out.println("HERE!!!!!");
        if (session.getAttribute("adminLogged") != null) {
            if ((Boolean) session.getAttribute("adminLogged")) {
                String saveName = String.valueOf(new Date().getTime());

                // OutputStream fos = null;
                OutputStream fosTemp = null;

                try {
                    // fos = new FileOutputStream(uploadPath + File.separator + saveName + ".jpg");
                    // fos.write(file.getBytes());

                    fosTemp = new FileOutputStream(tempPath + File.separator + saveName + ".jpg");
                    fosTemp.write(file.getBytes());
                    imageItem.setImageName(saveName + ".jpg");

                    return new ResponseEntity<>(imageItem, HttpStatus.OK);
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    try {
                        // if (fos != null) {
                        // fos.close();
                        // }
                        if (fosTemp != null) {
                            fosTemp.close();
                        }
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            } else {
                return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> onPostCompleted(@RequestBody Map<?, ?> body, HttpSession session) {

        if (session.getAttribute("adminLogged") != null) {
            if ((Boolean) session.getAttribute("adminLogged")) {
                List willUploadImageSrc = (List) body.get("imageSrcs");
                File tempDir = new File(tempPath);
                try {
                    InputStream is = null;
                    OutputStream oos = null;

                    for (int i = 0; i < willUploadImageSrc.size(); i++) {
                        is = new FileInputStream(tempPath + willUploadImageSrc.get(i));
                        oos = new FileOutputStream(uploadPath + willUploadImageSrc.get(i));
                        byte[] buffer = new byte[8192];
                        int length;
                        while ((length = is.read(buffer)) > 0) {
                            oos.write(buffer, 0, length);
                        }
                        File f = new File(tempPath + willUploadImageSrc.get(i));

                        if (f.exists()) {
                            if (f.delete()) {
                                System.out.println("Deleted Successfully");
                            } else {
                                oos.close();
                                is.close();
                                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                            }
                        }
                    }

                    File[] files = tempDir.listFiles();
                    if (files != null) {
                        for (File f : files) {
                            f.delete();
                        }
                    }

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

    @RequestMapping(value = "/unload", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> onUnloadEditor(HttpSession session) {
        System.out.println("Unloaded!!!");
        if(session.getAttribute("adminLogged") != null) {
            if((Boolean) session.getAttribute("adminLogged")){
                try {
                    File tempDir = new File(tempPath);
                    File[] files = tempDir.listFiles();
                    if (files != null) {
                        for (File f : files) {
                            f.delete();
                        }
                    }
                    return new ResponseEntity<>(true, HttpStatus.OK);
                } catch (Exception e) {
                    e.printStackTrace();
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            } else {
                return new ResponseEntity<>(false, HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<>(false, HttpStatus.OK);
        }

        
    }
}