package com.shinowit.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Collection;

/**
 * Created by user on 2014/11/6.
 */
@Entity
@Table(name = "TMe_InStockInfo")
public class TMeInStockInfo {
    private Integer billCode;
    private Byte inType;
    private Timestamp inTime;
    private String handler;
    private BigDecimal totalMoney;
    private String remark;
//    private Collection<TMeInStockDetailsInfo> tMeInStockDetailsInfosByBillCode;
    private TAuOperInfo tAuOperInfoByOperId;
    private TBaSupplierInfo tBaSupplierInfoBySupplierId;

    @Id
    @Column(name = "BillCode")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getBillCode() {
        return billCode;
    }

    public void setBillCode(Integer billCode) {
        this.billCode = billCode;
    }
    @Basic
    @Column(name = "InType")
    public Byte getInType() {
        return inType;
    }

    public void setInType(Byte inType) {
        this.inType = inType;
    }

    @Basic
    @Column(name = "InTime")
    public Timestamp getInTime() {
        return inTime;
    }

    public void setInTime(Timestamp inTime) {
        this.inTime = inTime;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TMeInStockInfo that = (TMeInStockInfo) o;


        if (billCode != null ? !billCode.equals(that.billCode) : that.billCode != null) return false;
        if (handler != null ? !handler.equals(that.handler) : that.handler != null) return false;
        if (inTime != null ? !inTime.equals(that.inTime) : that.inTime != null) return false;
        if (inType != null ? !inType.equals(that.inType) : that.inType != null) return false;
        if (remark != null ? !remark.equals(that.remark) : that.remark != null) return false;
        if (totalMoney != null ? !totalMoney.equals(that.totalMoney) : that.totalMoney != null) return false;

        return true;
    }

//
//    @OneToMany(mappedBy = "TMeInStockInfoByBillCode")
//    public Collection<TMeInStockDetailsInfo> getTMeInStockDetailsInfosByBillCode() {
//        return tMeInStockDetailsInfosByBillCode;
//    }
//
//    public void setTMeInStockDetailsInfosByBillCode(Collection<TMeInStockDetailsInfo> tMeInStockDetailsInfosByBillCode) {
//        this.tMeInStockDetailsInfosByBillCode = tMeInStockDetailsInfosByBillCode;
//    }

    @ManyToOne
    @JoinColumn(name = "OperID", referencedColumnName = "OperID")
    public TAuOperInfo getTAuOperInfoByOperId() {
        return tAuOperInfoByOperId;
    }

    public void setTAuOperInfoByOperId(TAuOperInfo tAuOperInfoByOperId) {
        this.tAuOperInfoByOperId = tAuOperInfoByOperId;
    }

    @ManyToOne
    @JoinColumn(name = "SupplierID", referencedColumnName = "SupplierID")
    public TBaSupplierInfo getTBaSupplierInfoBySupplierId() {
        return tBaSupplierInfoBySupplierId;
    }

    public void setTBaSupplierInfoBySupplierId(TBaSupplierInfo tBaSupplierInfoBySupplierId) {
        this.tBaSupplierInfoBySupplierId = tBaSupplierInfoBySupplierId;
    }
}
