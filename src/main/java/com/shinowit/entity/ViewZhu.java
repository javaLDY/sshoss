package com.shinowit.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Date;



/**
 * Created by Administrator on 2014-12-07.
 */
@Entity
@Table(name = "View_zhu", schema = "dbo", catalog = "sshoss")
public class ViewZhu {
    private Integer id;
    private Date outTime;
    private Integer num;
    private BigDecimal price;
    private String merchandiseName;

    @Id
    @Basic
    @Column(name = "ID")
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    @Basic
    @Column(name = "OutTime")

    public Date getOutTime() {
        return outTime;
    }

    public void setOutTime(Date outTime) {
        this.outTime = outTime;
    }

    @Basic
    @Column(name = "Num")
    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
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
    @Column(name = "MerchandiseName")
    public String getMerchandiseName() {
        return merchandiseName;
    }

    public void setMerchandiseName(String merchandiseName) {
        this.merchandiseName = merchandiseName;
    }

}
