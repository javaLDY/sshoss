package com.shinowit.action.AdminiStrator;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TAuAuthorization;
import com.shinowit.entity.TAuOperInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-12-04.
 */
public class QuanXianSelectAction extends ActionSupport {
    @Resource
    private BaseDao<TAuAuthorization> baseDao;

    private int arry;

    private List<TAuAuthorization> children;

    private boolean success;

    public String quanxianselect(){
        children = baseDao.myfindByHql("from TAuAuthorization where roleinfo.roleId=?",arry);
        if(children.size()>0){
            setSuccess(true);
        }
        return SUCCESS;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public int getArry() {
        return arry;
    }

    public void setArry(int arry) {
        this.arry = arry;
    }

    public List<TAuAuthorization> getChildren() {
        return children;
    }

    public void setChildren(List<TAuAuthorization> children) {
        this.children = children;
    }
}
