package com.shinowit.action.InStockInfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeInStockDetailsInfo;
import com.shinowit.entity.TMeInStockInfo;
import com.shinowit.service.InStockInfoupdate;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-11-22.
 */
public class InStockInfoDetaUpdata extends ActionSupport {
    @Resource
    private InStockInfoupdate serciceupdate;

    private TMeInStockInfo inStockInfo;

    private TMeInStockDetailsInfo inStockDetailsInfo;

    public boolean success;

    public String message;

    public String instockinfodetailupdate(){
        boolean status = serciceupdate.instockdetailupdate(inStockInfo,inStockDetailsInfo);
        if(status==true){
            setSuccess(true);
            setMessage("更新成功");
            return SUCCESS;
        }else{
            setSuccess(false);
            setMessage("更新失败");
        }
        return SUCCESS;
    }

    public TMeInStockInfo getInStockInfo() {
        return inStockInfo;
    }

    public void setInStockInfo(TMeInStockInfo inStockInfo) {
        this.inStockInfo = inStockInfo;
    }

    public TMeInStockDetailsInfo getInStockDetailsInfo() {
        return inStockDetailsInfo;
    }

    public void setInStockDetailsInfo(TMeInStockDetailsInfo inStockDetailsInfo) {
        this.inStockDetailsInfo = inStockDetailsInfo;
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
}
