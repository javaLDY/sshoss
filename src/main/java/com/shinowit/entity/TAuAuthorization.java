package com.shinowit.entity;

import javax.persistence.*;
import java.util.List;

/**
 * Created by Administrator on 2014-12-02.
 */
@Entity
@Table(name = "TAu_Authorization")
public class TAuAuthorization {
    private Integer id;
    private TAuMenuInfo tAuMenuInfoByMenuId;
    private TAuRoleInfo roleinfo;

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @ManyToOne
    @JoinColumn(name = "MenuID", referencedColumnName = "MenuID")
    public TAuMenuInfo getTAuMenuInfoByMenuId() {
        return tAuMenuInfoByMenuId;
    }

    public void setTAuMenuInfoByMenuId(TAuMenuInfo tAuMenuInfoByMenuId) {
        this.tAuMenuInfoByMenuId = tAuMenuInfoByMenuId;
    }

    @ManyToOne
    @JoinColumn(name = "RoleID",referencedColumnName = "RoleID")

    public TAuRoleInfo getRoleinfo() {
        return roleinfo;
    }

    public void setRoleinfo(TAuRoleInfo roleinfo) {
        this.roleinfo = roleinfo;
    }


}
