package com.shinowit.entity;



import javax.persistence.*;
import java.util.Collection;

/**
 * Created by user on 2014/11/6.
 */
@Entity
@Table(name = "TMe_MerchandiseCInfo")
public class TMeMerchandiseCInfo {
    private Integer merchandiseCid;
    private String merchandiseCName;
    private Integer sortId;
    private Boolean state;


    @Id
    @Column(name = "MerchandiseCID")
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    public Integer getMerchandiseCid() {
        return merchandiseCid;
    }

    public void setMerchandiseCid(Integer merchandiseCid) {
        this.merchandiseCid = merchandiseCid;
    }

    @Basic
    @Column(name = "MerchandiseCName")
    public String getMerchandiseCName() {
        return merchandiseCName;
    }

    public void setMerchandiseCName(String merchandiseCName) {
        this.merchandiseCName = merchandiseCName;
    }

    @Basic
    @Column(name = "SortID")
    public Integer getSortId() {
        return sortId;
    }

    public void setSortId(Integer sortId) {
        this.sortId = sortId;
    }

    @Basic
    @Column(name = "State")
    public Boolean getState() {
        return state;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TMeMerchandiseCInfo that = (TMeMerchandiseCInfo) o;


        if (merchandiseCName != null ? !merchandiseCName.equals(that.merchandiseCName) : that.merchandiseCName != null)
            return false;
        if (merchandiseCid != null ? !merchandiseCid.equals(that.merchandiseCid) : that.merchandiseCid != null)
            return false;
        if (sortId != null ? !sortId.equals(that.sortId) : that.sortId != null) return false;
        if (state != null ? !state.equals(that.state) : that.state != null) return false;

        return true;
    }

}
