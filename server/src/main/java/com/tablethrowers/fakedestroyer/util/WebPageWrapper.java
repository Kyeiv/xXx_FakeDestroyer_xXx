package com.tablethrowers.fakedestroyer.util;

import com.tablethrowers.fakedestroyer.entity.WebPage;

public class WebPageWrapper {

    private WebPage webpage;
    private Boolean canMark;

    public WebPageWrapper() {
    }

    public WebPage getWebpage() {
        return webpage;
    }

    public void setWebpage(WebPage webpage) {
        this.webpage = webpage;
    }

    public Boolean getCanMark() {
        return canMark;
    }

    public void setCanMark(Boolean canMark) {
        this.canMark = canMark;
    }
}
