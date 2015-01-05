package com.shinowit.entity;

import javax.persistence.*;
import java.util.List;

/**
 * Created by Administrator on 2014-12-05.
 */
@Entity
@Table(name = "TAu_MenuInfo")
public class TAuMenuInfo {
    private Integer menuId;
    private String text;
    private String id;
    private Integer parentNode;
    private String moudle;
    private String tag;
    private String src;
    private TAuMenuInfo tAuMenuInfoByMenuId;

    @Id
    @Column(name = "MenuID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getMenuId() {
        return menuId;
    }

    public void setMenuId(Integer menuId) {
        this.menuId = menuId;
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
    @Column(name = "id")
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }


    @Basic
    @Column(name = "parent_node")

    public Integer getParentNode() {
        return parentNode;
    }

    public void setParentNode(Integer parentNode) {
        this.parentNode = parentNode;
    }

    @Basic
    @Column(name = "moudle")
    public String getMoudle() {
        return moudle;
    }

    public void setMoudle(String moudle) {
        this.moudle = moudle;
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
    @Column(name = "src")
    public String getSrc() {
        return src;
    }

    public void setSrc(String src) {
        this.src = src;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TAuMenuInfo that = (TAuMenuInfo) o;

        if (menuId != that.menuId) return false;
        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (moudle != null ? !moudle.equals(that.moudle) : that.moudle != null) return false;
        if (parentNode != null ? !parentNode.equals(that.parentNode) : that.parentNode != null) return false;
        if (src != null ? !src.equals(that.src) : that.src != null) return false;
        if (tag != null ? !tag.equals(that.tag) : that.tag != null) return false;
        if (text != null ? !text.equals(that.text) : that.text != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = menuId;
        result = 31 * result + (text != null ? text.hashCode() : 0);
        result = 31 * result + (id != null ? id.hashCode() : 0);
        result = 31 * result + (parentNode != null ? parentNode.hashCode() : 0);
        result = 31 * result + (moudle != null ? moudle.hashCode() : 0);
        result = 31 * result + (tag != null ? tag.hashCode() : 0);
        result = 31 * result + (src != null ? src.hashCode() : 0);
        return result;
    }

    @OneToOne
    @JoinColumn(name = "MenuID", referencedColumnName = "MenuID", nullable = false)
    public TAuMenuInfo gettAuMenuInfoByMenuId() {
        return tAuMenuInfoByMenuId;
    }

    public void settAuMenuInfoByMenuId(TAuMenuInfo tAuMenuInfoByMenuId) {
        this.tAuMenuInfoByMenuId = tAuMenuInfoByMenuId;
    }
}
