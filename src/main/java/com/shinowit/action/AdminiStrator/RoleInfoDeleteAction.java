package com.shinowit.action.AdminiStrator;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.dao.UpdateRoleDao;
import com.shinowit.entity.TAuRoleInfo;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-12-02.
 */
public class RoleInfoDeleteAction extends ActionSupport {
    @Resource
    private UpdateRoleDao updatedao;

    private boolean success;

    private String message;

    private Integer arry;

    private boolean booleanarry;

    public String roledelete(){
       try {
           boolean status = updatedao.rolejinrong(arry,booleanarry);
           if(status==true){
               setSuccess(true);
               setMessage("禁用成功");
               return SUCCESS;
           }else{
               setSuccess(false);
               setMessage("禁用失败");
           }
       }catch (Exception e){
           e.printStackTrace();
       }
        setSuccess(false);
        setMessage("禁用失败");
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

    public Integer getArry() {
        return arry;
    }

    public void setArry(Integer arry) {
        this.arry = arry;
    }

    public boolean isBooleanarry() {
        return booleanarry;
    }

    public void setBooleanarry(boolean booleanarry) {
        this.booleanarry = booleanarry;
    }
}
