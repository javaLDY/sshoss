package com.shinowit.entity;

import javax.persistence.*;

/**
 * Created by Administrator on 2014-12-02.
 */
@Entity
public class Newmenuinfo {
    private String src;
    private int menuinfoid;
    private String text;
    private String module;
    private String tag;
    private boolean leaf;
    private TAuMenuInfo tAuMenuInfoByMenuId;

    private String id;
    @Basic
    @Column(name = "src")
    public String getSrc() {
        return src;
    }

    public void setSrc(String src) {
        this.src = src;
    }

    @Id
    @Column(name = "menuinfoid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getMenuinfoid() {
        return menuinfoid;
    }

    public void setMenuinfoid(int menuinfoid) {
        this.menuinfoid = menuinfoid;
    }


    @Basic
    @Column(name = "text")
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    @Basic
    @Column(name = "module")
    public String getModule() {
        return module;
    }

    public void setModule(String module) {
        this.module = module;
    }

    @Basic
    @Column(name = "tag")
    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    @Basic
    @Column(name = "leaf")
    public boolean isLeaf() {
        return leaf;
    }

    public void setLeaf(boolean leaf) {
        this.leaf = leaf;
    }



    @Basic
    @Column(name = "id")
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Newmenuinfo that = (Newmenuinfo) o;

        if (menuinfoid != that.menuinfoid) return false;
        if (text != null ? !text.equals(that.text) : that.text != null) return false;
        if (module != null ? !module.equals(that.module) : that.module != null) return false;
        if (src != null ? !src.equals(that.src) : that.src != null) return false;
        if (tag != null ? !tag.equals(that.tag) : that.tag != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = src != null ? src.hashCode() : 0;
        result = 31 * result + menuinfoid;
        result = 31 * result + (text != null ? text.hashCode() : 0);
        result = 31 * result + (module != null ? module.hashCode() : 0);
        result = 31 * result + (tag != null ? tag.hashCode() : 0);
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "MenuID", referencedColumnName = "MenuID")
    public TAuMenuInfo getTAuMenuInfoByMenuId() {
        return tAuMenuInfoByMenuId;
    }

    public void setTAuMenuInfoByMenuId(TAuMenuInfo tAuMenuInfoByMenuId) {
        this.tAuMenuInfoByMenuId = tAuMenuInfoByMenuId;
    }
}
