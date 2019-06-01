package com.tablethrowers.fakedestroyer.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="webpages")
public class WebPage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="page_url")
    private String page_url;

    @Column(name="fake")
    private int fake;

    @Column(name="not_fake")
    private int notFake;

    @Column(name="name")
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "webPage")
    @LazyCollection(LazyCollectionOption.FALSE)
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    private List<Comment> comments;

    public WebPage() {
    }

    public WebPage(String page_url, int fake, int notFake, String name, List<Comment> comments) {
        this.page_url = page_url;
        this.fake = fake;
        this.notFake = notFake;
        this.name = name;
        this.comments = comments;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPage_url() {
        return page_url;
    }

    public void setPage_url(String page_url) {
        this.page_url = page_url;
    }

    public int getFake() {
        return fake;
    }

    public void setFake(int fake) {
        this.fake = fake;
    }

    public int getNotFake() {
        return notFake;
    }

    public void setNotFake(int notFake) {
        this.notFake = notFake;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void addComment(Comment comment){
        if(comments == null){
            comments = new ArrayList<>();
            comments.add(comment);
            comment.setWebPage(this);
            return;
        }
        if(comments.contains(comment))
            return;
        comments.add(comment);
        comment.setWebPage(this);
    }

    public void removeComment(Comment comment){
        if(!comments.contains(comment))
            return;
        comments.remove(comment);
        comment.setWebPage(null);
    }

    @Override
    public String toString() {
        return "WebPage{" +
                "id=" + id +
                ", page_url='" + page_url + '\'' +
                ", fake=" + fake +
                ", notFake=" + notFake +
                ", name='" + name + '\'' +
                '}';
    }
}
