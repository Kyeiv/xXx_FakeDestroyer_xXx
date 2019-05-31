package com.tablethrowers.fakedestroyer.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name="comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="description")
    private String description;

    @Column(name="likes")
    private int likes;

    @Column(name="dislikes")
    private int dislikes;

    @JsonIgnore
    @JoinColumn(name="webpage_id")
    @ManyToOne
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    private WebPage webPage;

    public Comment() {
    }

    public Comment(String description, int likes, int dislikes, WebPage webPage) {
        this.description = description;
        this.likes = likes;
        this.dislikes = dislikes;
        this.webPage = webPage;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public int getDislikes() {
        return dislikes;
    }

    public void setDislikes(int dislikes) {
        this.dislikes = dislikes;
    }

    public WebPage getWebPage() {
        return webPage;
    }

    public void setWebPage(WebPage webPage) {
        if(Objects.equals(this.webPage, webPage))
            return;
        WebPage oldWebPage = this.webPage;
        this.webPage = webPage;
        if(oldWebPage!=null)
            oldWebPage.removeComment(this);
        if(webPage!=null)
            webPage.addComment(this);
    }
}
