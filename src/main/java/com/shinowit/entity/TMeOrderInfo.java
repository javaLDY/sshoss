package com.shinowit.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.Date;

/**
 * Created by user on 2014/11/6.
 */
@Entity
@Table(name = "TMe_OrderInfo")
public class TMeOrderInfo {
    private String billCode;
    private String postBillCode;
    private byte billStatus;
    private Date orderTime;
    private String recMan;
    private String linkTel;
    private String recAddress;
    private String postCode;
    private BigDecimal totalMoney;
    private String remark;
    private Collection<TMeOrderDetailsInfo> tMeOrderDetailsInfosByBillCode;
    private TAuOperInfo tAuOperInfoByOperId;
    private TBaDeliveryInfo tBaDeliveryInfoByDeliveryId;
    private TBaMemberInfo tBaMemberInfoByUserName;
    private TMeOutStockInfo tMeOutStockInfoByOutBillCode;

    @Id
    @Column(name = "BillCode")
    public String getBillCode() {
        return billCode;
    }

    public void setBillCode(String billCode) {
        this.billCode = billCode;
    }

    @Basic
    @Column(name = "PostBillCode")
    public String getPostBillCode() {
        return postBillCode;
    }

    public void setPostBillCode(String postBillCode) {
        this.postBillCode = postBillCode;
    }

    @Basic
    @Column(name = "BillStatus")
    public byte getBillStatus() {
        return billStatus;
    }

    public void setBillStatus(byte billStatus) {
        this.billStatus = billStatus;
    }


    @Basic
    @Column(name = "OrderTime")
    public Date getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(Date orderTime) {
        this.orderTime = orderTime;
    }


    @Basic
    @Column(name = "RecMan")
    public String getRecMan() {
        return recMan;
    }

    public void setRecMan(String recMan) {
        this.recMan = recMan;
    }

    @Basic
    @Column(name = "LinkTel")
    public String getLinkTel() {
        return linkTel;
    }

    public void setLinkTel(String linkTel) {
        this.linkTel = linkTel;
    }

    @Basic
    @Column(name = "RecAddress")
    public String getRecAddress() {
        return recAddress;
    }

    public void setRecAddress(String recAddress) {
        this.recAddress = recAddress;
    }

    @Basic
    @Column(name = "PostCode")
    public String getPostCode() {
        return postCode;
    }

    public void setPostCode(String postCode) {
        this.postCode = postCode;
    }

    @Basic
    @Column(name = "TotalMoney")
    public BigDecimal getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(BigDecimal totalMoney) {
        this.totalMoney = totalMoney;
    }

    @Basic
    @Column(name = "Remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @OneToMany(mappedBy = "TMeOrderInfoByBillCode")
    public Collection<TMeOrderDetailsInfo> getTMeOrderDetailsInfosByBillCode() {
        return tMeOrderDetailsInfosByBillCode;
    }

    public void setTMeOrderDetailsInfosByBillCode(Collection<TMeOrderDetailsInfo> tMeOrderDetailsInfosByBillCode) {
        this.tMeOrderDetailsInfosByBillCode = tMeOrderDetailsInfosByBillCode;
    }

    @ManyToOne
    @JoinColumn(name = "OperID", referencedColumnName = "OperID")
    public TAuOperInfo getTAuOperInfoByOperId() {
        return tAuOperInfoByOperId;
    }

    public void setTAuOperInfoByOperId(TAuOperInfo tAuOperInfoByOperId) {
        this.tAuOperInfoByOperId = tAuOperInfoByOperId;
    }

    @ManyToOne
    @JoinColumn(name = "DeliveryID", referencedColumnName = "DeliveryID")
    public TBaDeliveryInfo getTBaDeliveryInfoByDeliveryId() {
        return tBaDeliveryInfoByDeliveryId;
    }

    public void setTBaDeliveryInfoByDeliveryId(TBaDeliveryInfo tBaDeliveryInfoByDeliveryId) {
        this.tBaDeliveryInfoByDeliveryId = tBaDeliveryInfoByDeliveryId;
    }

    @ManyToOne
    @JoinColumn(name = "UserName", referencedColumnName = "UserName")
    public TBaMemberInfo getTBaMemberInfoByUserName() {
        return tBaMemberInfoByUserName;
    }

    public void setTBaMemberInfoByUserName(TBaMemberInfo tBaMemberInfoByUserName) {
        this.tBaMemberInfoByUserName = tBaMemberInfoByUserName;
    }

    @ManyToOne
    @JoinColumn(name = "OutBillCode", referencedColumnName = "OutBillCode")
    public TMeOutStockInfo getTMeOutStockInfoByOutBillCode() {
        return tMeOutStockInfoByOutBillCode;
    }

    public void setTMeOutStockInfoByOutBillCode(TMeOutStockInfo tMeOutStockInfoByOutBillCode) {
        this.tMeOutStockInfoByOutBillCode = tMeOutStockInfoByOutBillCode;
    }
}
