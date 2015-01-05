package com.shinowit.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Collection;

/**
 * Created by user on 2014/11/6.
 */
@Entity
@Table(name = "TMe_MerchandiseInfo")
public class TMeMerchandiseInfo {

    private Integer merchandiseId;
    private String merchandiseName;
    private String merchandiseAb;
    private BigDecimal price;
    private boolean saleStatus;
    private String spec;
    private String describe;
    private String picPath;
    private Integer clickCount;
    private String remark;
    private TMeMerchandiseCInfo tMeMerchandiseCInfoByMerchandiseCid;
    private TMeProStatusInfo tMeProStatusInfoByProStatusId;
    private TMeUnitInfo tMeUnitInfoByUnitId;

    @Id
    @Column(name = "MerchandiseID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getMerchandiseId() {
        return merchandiseId;
    }

    public void setMerchandiseId(Integer merchandiseId) {
        this.merchandiseId = merchandiseId;
    }
    @Basic
    @Column(name = "MerchandiseName")
    public String getMerchandiseName() {
        return merchandiseName;
    }

    public void setMerchandiseName(String merchandiseName) {
        this.merchandiseName = merchandiseName;
    }

    @Basic
    @Column(name = "MerchandiseAB")
    public String getMerchandiseAb() {
        return merchandiseAb;
    }

    public void setMerchandiseAb(String merchandiseAb) {
        this.merchandiseAb = merchandiseAb;
    }

    @Basic
    @Column(name = "Price")
    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    @Basic
    @Column(name = "SaleStatus")
    public boolean isSaleStatus() {
        return saleStatus;
    }

    public void setSaleStatus(boolean saleStatus) {
        this.saleStatus = saleStatus;
    }

    @Basic
    @Column(name = "Spec")
    public String getSpec() {
        return spec;
    }

    public void setSpec(String spec) {
        this.spec = spec;
    }

    @Basic
    @Column(name = "Describe")
    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    @Basic
    @Column(name = "PicPath")
    public String getPicPath() {
        return picPath;
    }

    public void setPicPath(String picPath) {
        this.picPath = picPath;
    }

    @Basic
    @Column(name = "ClickCount")
    public Integer getClickCount() {
        return clickCount;
    }

    public void setClickCount(Integer clickCount) {
        this.clickCount = clickCount;
    }

    @Basic
    @Column(name = "Remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TMeMerchandiseInfo that = (TMeMerchandiseInfo) o;


        if (saleStatus != that.saleStatus) return false;
        if (clickCount != null ? !clickCount.equals(that.clickCount) : that.clickCount != null) return false;
        if (describe != null ? !describe.equals(that.describe) : that.describe != null) return false;
        if (merchandiseAb != null ? !merchandiseAb.equals(that.merchandiseAb) : that.merchandiseAb != null)
            return false;
        if (merchandiseId != null ? !merchandiseId.equals(that.merchandiseId) : that.merchandiseId != null)
            return false;
        if (merchandiseName != null ? !merchandiseName.equals(that.merchandiseName) : that.merchandiseName != null)
            return false;
        if (picPath != null ? !picPath.equals(that.picPath) : that.picPath != null) return false;
        if (price != null ? !price.equals(that.price) : that.price != null) return false;
        if (remark != null ? !remark.equals(that.remark) : that.remark != null) return false;
        if (spec != null ? !spec.equals(that.spec) : that.spec != null) return false;

        return true;
    }


    @ManyToOne
    @JoinColumn(name = "MerchandiseCID", referencedColumnName = "MerchandiseCID")
    public TMeMerchandiseCInfo getTMeMerchandiseCInfoByMerchandiseCid() {
        return tMeMerchandiseCInfoByMerchandiseCid;
    }

    public void setTMeMerchandiseCInfoByMerchandiseCid(TMeMerchandiseCInfo tMeMerchandiseCInfoByMerchandiseCid) {
        this.tMeMerchandiseCInfoByMerchandiseCid = tMeMerchandiseCInfoByMerchandiseCid;
    }

    @ManyToOne
    @JoinColumn(name = "ProStatusID", referencedColumnName = "ProStatusID")
    public TMeProStatusInfo getTMeProStatusInfoByProStatusId() {
        return tMeProStatusInfoByProStatusId;
    }

    public void setTMeProStatusInfoByProStatusId(TMeProStatusInfo tMeProStatusInfoByProStatusId) {
        this.tMeProStatusInfoByProStatusId = tMeProStatusInfoByProStatusId;
    }

    @ManyToOne
    @JoinColumn(name = "UnitID", referencedColumnName = "UnitID")
    public TMeUnitInfo getTMeUnitInfoByUnitId() {
        return tMeUnitInfoByUnitId;
    }

    public void setTMeUnitInfoByUnitId(TMeUnitInfo tMeUnitInfoByUnitId) {
        this.tMeUnitInfoByUnitId = tMeUnitInfoByUnitId;
    }

}
