package com.shinowit.entity;


import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Collection;

/**
 * Created by user on 2014/11/6.
 */
@Entity
@Table(name = "TMe_OutStockInfo")
public class TMeOutStockInfo {
    private Integer outBillCode;
    private Timestamp outTime;
    private String handler;
    private Byte outType;
    private BigDecimal totalMoney;
    private String remark;
    private String outstockinfo;
    private Collection<TMeOrderInfo> tMeOrderInfosByOutBillCode;
    private Collection<TMeOutStockDetailsInfo> tMeOutStockDetailsInfosByOutBillCode;
    private TAuOperInfo tAuOperInfoByOperId;


    @Id
    @Column(name = "OutBillCode")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getOutBillCode() {
        return outBillCode;
    }

    public void setOutBillCode(Integer outBillCode) {
        this.outBillCode = outBillCode;
    }


    @Basic
    @Column(name = "OutTime")
    public Timestamp getOutTime() {
        return outTime;
    }

    public void setOutTime(Timestamp outTime) {
        this.outTime = outTime;
    }

    @Basic
    @Column(name = "Handler")
    public String getHandler() {
        return handler;
    }

    public void setHandler(String handler) {
        this.handler = handler;
    }

    @Basic
    @Column(name = "OutType")
    public Byte getOutType() {
        return outType;
    }

    public void setOutType(Byte outType) {
        this.outType = outType;
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

    @Basic
    @Column(name = "OutStockInfoName",length = 30)

    public String getOutstockinfo() {
        return outstockinfo;
    }

    public void setOutstockinfo(String outstockinfo) {
        this.outstockinfo = outstockinfo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TMeOutStockInfo that = (TMeOutStockInfo) o;


        if (handler != null ? !handler.equals(that.handler) : that.handler != null) return false;
        if (outBillCode != null ? !outBillCode.equals(that.outBillCode) : that.outBillCode != null) return false;
        if (outTime != null ? !outTime.equals(that.outTime) : that.outTime != null) return false;
        if (outType != null ? !outType.equals(that.outType) : that.outType != null) return false;
        if (remark != null ? !remark.equals(that.remark) : that.remark != null) return false;
        if (totalMoney != null ? !totalMoney.equals(that.totalMoney) : that.totalMoney != null) return false;

        return true;
    }

    @OneToMany(mappedBy = "TMeOutStockInfoByOutBillCode")
    public Collection<TMeOrderInfo> getTMeOrderInfosByOutBillCode() {
        return tMeOrderInfosByOutBillCode;
    }

    public void setTMeOrderInfosByOutBillCode(Collection<TMeOrderInfo> tMeOrderInfosByOutBillCode) {
        this.tMeOrderInfosByOutBillCode = tMeOrderInfosByOutBillCode;
    }

    @OneToMany(mappedBy = "TMeOutStockInfoByOutBillCode")
    public Collection<TMeOutStockDetailsInfo> getTMeOutStockDetailsInfosByOutBillCode() {
        return tMeOutStockDetailsInfosByOutBillCode;
    }

    public void setTMeOutStockDetailsInfosByOutBillCode(Collection<TMeOutStockDetailsInfo> tMeOutStockDetailsInfosByOutBillCode) {
        this.tMeOutStockDetailsInfosByOutBillCode = tMeOutStockDetailsInfosByOutBillCode;
    }

    @ManyToOne
    @JoinColumn(name = "OperID", referencedColumnName = "OperID")
    public TAuOperInfo getTAuOperInfoByOperId() {
        return tAuOperInfoByOperId;
    }

    public void setTAuOperInfoByOperId(TAuOperInfo tAuOperInfoByOperId) {
        this.tAuOperInfoByOperId = tAuOperInfoByOperId;
    }
}
