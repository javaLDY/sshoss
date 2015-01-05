package com.shinowit.entity;

import javax.persistence.*;
import java.sql.Date;

/**
 * Created by Administrator on 2014-12-07.
 */
@Entity
@Table(name = "View_Pie", schema = "dbo", catalog = "sshoss")
public class ViewPie {
    private String merchandiseName;
    private Integer num;
    private Integer id;
    private Date inTime;

    @Basic
    @Column(name = "MerchandiseName")
    public String getMerchandiseName() {
        return merchandiseName;
    }

    public void setMerchandiseName(String merchandiseName) {
        this.merchandiseName = merchandiseName;
    }

    @Basic
    @Column(name = "Num")
    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }

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
    @Column(name = "InTime")
    public Date getInTime() {
        return inTime;
    }

    public void setInTime(Date inTime) {
        this.inTime = inTime;
    }

}
