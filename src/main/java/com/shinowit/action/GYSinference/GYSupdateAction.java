package com.shinowit.action.GYSinference;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TBaSupplierInfo;

import javax.annotation.Resource;

/**
 * Created by user on 2014/11/12.
 */
public class GYSupdateAction extends ActionSupport {

    @Resource
    private BaseDao<TBaSupplierInfo> basdao;

    private boolean isno;

    private String message;

    private TBaSupplierInfo supper;

    private boolean success;

    public String gysupdate(){
        Object obj = basdao.update(supper);
        if(obj!=null){
            setSuccess(true);
            setIsno(true);
            setMessage("更新成功,请查看");
            return SUCCESS;
        }else{
            setSuccess(false);
            setIsno(false);
            setMessage("更新失败!");
        }
            setSuccess(false);
            setIsno(false);
            setMessage("系统原因！更新失败");
        return SUCCESS;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public boolean isIsno() {
        return isno;
    }

    public void setIsno(boolean isno) {
        this.isno = isno;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public TBaSupplierInfo getSupper() {
        return supper;
    }

    public void setSupper(TBaSupplierInfo supper) {
        this.supper = supper;
    }
}
