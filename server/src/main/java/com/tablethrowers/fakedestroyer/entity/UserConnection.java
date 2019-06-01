package com.tablethrowers.fakedestroyer.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name="users_connections")
public class UserConnection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "time_stamp")
    private long timestamp;

    @Column(name = "ip")
    private String ip;

    @JsonIgnore
    @JoinColumn(name = "id_webpage")
    @ManyToOne
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    private WebPage webPage;

    public UserConnection(long timestamp, String ip, WebPage webPage) {
        this.timestamp = timestamp;
        this.ip = ip;
        this.webPage = webPage;
    }

    public UserConnection() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public WebPage getWebPage() {
        return webPage;
    }

    public void setWebPage(WebPage webPage) {
        if(Objects.equals(this.webPage, webPage))
            return;
        WebPage oldWebPage = this.webPage;
        this.webPage = webPage;
    }

    @Override
    public String toString() {
        return "UserConnection{" +
                "id=" + id +
                ", timestamp=" + timestamp +
                ", ip='" + ip + '\'' +
                ", webPage=" + webPage +
                '}';
    }
}
