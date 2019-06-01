package com.tablethrowers.fakedestroyer.restcontroller;

import com.tablethrowers.fakedestroyer.entity.Comment;
import com.tablethrowers.fakedestroyer.entity.UserConnection;
import com.tablethrowers.fakedestroyer.entity.WebPage;
import com.tablethrowers.fakedestroyer.util.IDataAccessObject;
import com.tablethrowers.fakedestroyer.util.WebPageWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/")
public class FakeNewsRestController {

    @Autowired
    private IDataAccessObject dataAccessObject;

    /*
     * Pobieranie danych o stronie po urlu - jeśli taki nie istnieje zwraca obiekt wypelniony pustymi/zerowymi polami
     *
     */
    @GetMapping("/webpage/{url}")
    public ResponseEntity<WebPageWrapper> getWebPageData(@PathVariable String url, @RequestParam String ip, @RequestParam String domain) {

        System.out.println("WESZŁO DO POBIERANIA DANYCH STRONY");

        List<UserConnection> userLogs = dataAccessObject.getByStringValue(UserConnection.class, "ip", ip);

        Boolean canMark = false;

        if(!userLogs.isEmpty()) {
            for (UserConnection uc : userLogs) {
                if (uc.getWebPage().getPage_url().equals(url))
                    if (uc.getTimestamp() + 86400000L > new Date().getTime()) {
                        canMark = false;
                        break;
                    } else {
                        canMark = true;
                    }
            }
        } else {
            canMark = true;
        }

        List<WebPage> resultList = dataAccessObject.getByStringValue(WebPage.class, "page_url", url);

        WebPage webPage;
        WebPageWrapper webPageWrapper = new WebPageWrapper();

        if(resultList.isEmpty()) {
            webPage = new WebPage();
            webPage.setPage_url("");
            webPage.setName("");
            webPage.setFake(0);
            webPage.setNotFake(0);
            webPage.setId(0);
        } else {
            webPage = resultList.get(0);
        }

        webPageWrapper.setWebpage(webPage);
        webPageWrapper.setCanMark(canMark);

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Access-Control-Allow-Origin", "*");
        responseHeaders.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        return ResponseEntity.ok().headers(responseHeaders).body(webPageWrapper);
    }


    /*
     * Ocenianie strony. Jeśli takowa nie istnieje - dodaje ją do bazy i wstawia pierwszą ocenę
     * value == 0 -> ocena fake, value != 0 -> ocena notFake
     *
     */
    @PostMapping("/webpage/{url}/mark/{value}/{comment}")
    public void markWebPage(@PathVariable String url, @PathVariable int value, @PathVariable String comment, @RequestParam String ip, @RequestParam String domain){

        System.out.println("WESZŁO DO OCENIANIA STRONY");

        List<UserConnection> userLogs = dataAccessObject.getByStringValue(UserConnection.class, "ip", ip);
        UserConnection userConnection = null;

        Boolean canMark = false;

        if(!userLogs.isEmpty()) {
            for (UserConnection uc : userLogs) {
                if (uc.getWebPage().getPage_url().equals(url))
                    if (uc.getTimestamp() + 86400000L > new Date().getTime()) {
                        canMark = false;
                        break;
                    } else {
                        userConnection = uc;
                        canMark = true;
                    }
            }
        } else {
            canMark = true;
        }

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Access-Control-Allow-Origin", "*");
        responseHeaders.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        if(!canMark)
            return;


        List<WebPage> webPages = dataAccessObject.getByStringValue(WebPage.class, "page_url", url);

        WebPage webPage;

        if(webPages.isEmpty()){
            webPage = new WebPage();
            webPage.setId(0);
            webPage.setNotFake(0);
            webPage.setFake(0);
            webPage.setName("");
            webPage.setPage_url(url);
        } else {
            webPage = webPages.get(0);
        }

        if (value == 0) {
            webPage.setFake(webPage.getFake() + 1);
        } else {
            webPage.setNotFake(webPage.getNotFake() + 1);
        }

        if(userLogs.isEmpty()){
            userConnection = new UserConnection();
            userConnection.setId(0);
        }

        userConnection.setIp(ip);
        userConnection.setTimestamp(new Date().getTime());
        userConnection.setWebPage(webPage);

        dataAccessObject.save(userConnection);

        if(!comment.equals("null2"))
            leaveComment(url, comment);
    }


    /*
     * Wysyłanie komentarza do konkretnej strony - jak nie istnieje to sie tworzy i dodaje pierwszy komentarz
     *
     */
    @PostMapping("/webpage/{url}/add-comment/{comment}")
    public void leaveComment(@PathVariable String url, @PathVariable String comment){

        System.out.println("WESZŁO DO ZAPISU KOMENTARZA WEWNATRZ OCENY STRONY");

        List<WebPage> webPages = dataAccessObject.getByStringValue(WebPage.class, "page_url", url);

        WebPage webPage;

        if(webPages.isEmpty()){
            webPage = new WebPage();
            webPage.setId(0);
            webPage.setNotFake(0);
            webPage.setFake(0);
            webPage.setName("");
            webPage.setPage_url(url);
        } else {
            webPage = webPages.get(0);
        }

        Comment newComment = new Comment();

        newComment.setId(0);
        newComment.setWebPage(webPage);
        newComment.setDescription(comment);
        newComment.setDislikes(0);
        newComment.setLikes(0);

        dataAccessObject.save(newComment);
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

        System.out.println("WESZŁO DO POBIERANIA KOMENTARZY DO URLA");

        return ResponseEntity.ok().headers(responseHeaders).body(webPage.getComments());
    }


    /*
     * Ocenianie komentarza o podanym id
     * value == 0 -> dislike, value != 0 -> like
     *
     */
    @PostMapping("/comment/{id}/mark/{value}")
    public void markComment(@PathVariable int id, @PathVariable int value){

        Comment comment = dataAccessObject.getById(Comment.class, id);

        if(value == 0){
            comment.setDislikes(comment.getDislikes() + 1);
        } else {
            comment.setLikes(comment.getLikes() + 1);
        }

        System.out.println("WESZŁO DO OCENIANIA KOMENTARZA");

        dataAccessObject.save(comment);
    }
}