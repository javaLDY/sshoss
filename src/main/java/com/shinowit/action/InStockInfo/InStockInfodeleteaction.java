package com.shinowit.action.InStockInfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.service.InStockInfoDelete;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-11-20.
 */
public class InStockInfodeleteaction extends ActionSupport {

    private boolean success;

    private String message;

    private String arry;

    @Resource
    private InStockInfoDelete servicecdelete;

    public String instockinfodetatildelete(){
        boolean status = servicecdelete.instockdelete(arry);
        if(status==true){
            setSuccess(true);
            setMessage("删除成功");
            return SUCCESS;
        }else{
            setSuccess(false);
            setMessage("删除失败!请重新删除");
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
