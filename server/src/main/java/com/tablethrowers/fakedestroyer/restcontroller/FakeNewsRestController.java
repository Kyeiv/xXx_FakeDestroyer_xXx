package com.tablethrowers.fakedestroyer.restcontroller;

import com.tablethrowers.fakedestroyer.entity.WebPage;
import com.tablethrowers.fakedestroyer.util.IDataAccessObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/")
public class FakeNewsRestController {

    @Autowired
    private IDataAccessObject dataAccessObject;

    @GetMapping("/webpage/{url}")
    public WebPage getWebPageMarks(@PathVariable String url) { //metoda do pobierania fake i notfake z serwera

        List<WebPage> resultList = dataAccessObject.getByStringValue(WebPage.class, "page_url", url);

        return resultList.get(0);
    }

}
