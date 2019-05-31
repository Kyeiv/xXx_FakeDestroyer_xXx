package com.tablethrowers.fakedestroyer.restcontroller;

import com.tablethrowers.fakedestroyer.entity.Comment;
import com.tablethrowers.fakedestroyer.entity.WebPage;
import com.tablethrowers.fakedestroyer.util.IDataAccessObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<WebPage> getWebPageData(@PathVariable String url) { //pobieranie danych strony po urlu

        List<WebPage> resultList = dataAccessObject.getByStringValue(WebPage.class, "page_url", url);

        System.out.println("WESZŁO DO POBIERANIA DANYCH STRONY");

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Access-Control-Allow-Origin", "*");
        responseHeaders.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        return ResponseEntity.ok().headers(responseHeaders).body(resultList.get(0));
    }


    /*
     * Ocenianie strony
     * value == 0 -> ocena fake, value != 0 -> ocena notFake
     *
     */
    @PutMapping("/webpage/{url}/{value}")
    public void markWebPage(@PathVariable String url, @PathVariable int value){

        WebPage webPage = dataAccessObject.getByStringValue(WebPage.class, "page_url", url).get(0);

        if (value == 0) {
            webPage.setFake(webPage.getFake() + 1);
        } else {
            webPage.setNotFake(webPage.getNotFake() + 1);
        }

        dataAccessObject.save(webPage);

        System.out.println("WESZŁO DO INKREMENTACJI FAKE/NOTFAKE");
    }


    /*
     * Wysyłanie komentarza do konkretnej strony
     *
     */
    @PostMapping("/webpage/{url}/add-comment/{comment}")
    public void leaveComment(@PathVariable String url, @PathVariable String comment){

        WebPage webPage = dataAccessObject.getByStringValue(WebPage.class, "page_url", url).get(0);

        Comment newComment = new Comment();

        newComment.setId(0);
        newComment.setWebPage(webPage);
        newComment.setDescription(comment);
        newComment.setDislikes(0);
        newComment.setLikes(0);

        dataAccessObject.save(newComment);

        System.out.println("WESZŁO DO ZAPISU KOMENTARZA");
    }


    /*
     * Pobieranie komentarzy dla wybranego urla
     *
     */
    @GetMapping("/comment/{url}")
    public ResponseEntity<List<Comment>> getCommentsForWebPage(@PathVariable String url){

        WebPage webPage = dataAccessObject.getByStringValue(WebPage.class, "page_url", url).get(0);

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Access-Control-Allow-Origin", "*");
        responseHeaders.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        return ResponseEntity.ok().headers(responseHeaders).body(webPage.getComments());
    }
}
