package com.shinowit.action.ProStatusInfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeProStatusInfo;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-11-16.
 */
public class ProStatusInfoupdate extends ActionSupport {
    @Resource
    private BaseDao<TMeProStatusInfo> baseDao;

    private boolean success;

    private String message;

    private TMeProStatusInfo pro;

    public String prostatusinfoupdate(){
        Object o = baseDao.update(pro);
        if(o==null){
            setSuccess(false);
            setMessage("更改失败,请重新更改");
            return  SUCCESS;
        }else{
            setSuccess(true);
            setMessage("更新成功,请查看");
        }
        return SUCCESS;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public TMeProStatusInfo getPro() {
        return pro;
    }

    public void setPro(TMeProStatusInfo pro) {
        this.pro = pro;
    }
}
