package com.shinowit.action.chuku;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.service.ChuKuDoubleDeleteServ;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-11-29.
 */
public class ChuKuDoubleDelete extends ActionSupport {
    @Resource
    private ChuKuDoubleDeleteServ servicedelete;

    private boolean success;

    private String message;

    private String arry;

    public String doubledelete(){
        try{
            boolean status = servicedelete.servicedelete(arry);
            if(status==true){
                setSuccess(true);
                setMessage("删除成功");
            }else{
                setSuccess(false);
                setMessage("删除失败");
            }
        }catch (Exception e){
            e.printStackTrace();
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

    public String getArry() {
        return arry;
    }

    public void setArry(String arry) {
        this.arry = arry;
    }
}
