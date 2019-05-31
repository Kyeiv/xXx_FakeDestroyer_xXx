package com.tablethrowers.fakedestroyer.restcontroller;

import com.tablethrowers.fakedestroyer.entity.WebPage;
import com.tablethrowers.fakedestroyer.util.IDataAccessObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class FakeNewsRestController {

    @Autowired
    private IDataAccessObject dataAccessObject;


    /*
     * Pobieranie danych o stronie po urlu
     *
     */
    @GetMapping("/webpage/{url}")
    public WebPage getWebPageData(@PathVariable String url) { //pobieranie danych strony po urlu

        List<WebPage> resultList = dataAccessObject.getByStringValue(WebPage.class, "page_url", url);

        return resultList.get(0);
    }


    /*
     * Ocenianie strony
     * value == 0 -> ocena fake, value != 0 -> ocena notFake
     *
     */
    @PutMapping("/webpage/{url}/{value}")
    public void markWebPage(@PathVariable String url, @PathVariable int value){

        WebPage webPage = getWebPageData(url);

        if (value == 0) {
            webPage.setFake(webPage.getFake() + 1);
        } else {
            webPage.setNotFake(webPage.getNotFake() + 1);
        }

        dataAccessObject.save(webPage);
    }

}
