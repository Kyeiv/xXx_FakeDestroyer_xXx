package com.tablethrowers.fakedestroyer.util;

public class WebPageFrontendWrapper {

    private String pageUrl;
    private int fake;
    private int notFake;
    private double ratio;

    public WebPageFrontendWrapper(String pageUrl, int fake, int notFake, double ratio) {
        this.pageUrl = pageUrl;
        this.fake = fake;
        this.notFake = notFake;
        this.ratio = ratio;
    }

    public WebPageFrontendWrapper() {
    }

    public String getPageUrl() {
        return pageUrl;
    }

    public void setPageUrl(String pageUrl) {
        this.pageUrl = pageUrl;
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

    public double getRatio() {
        return ratio;
    }

    public void setRatio(double ratio) {
        this.ratio = ratio;
    }
}
