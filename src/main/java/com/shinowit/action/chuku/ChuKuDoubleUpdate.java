package com.shinowit.action.chuku;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeOutStockDetailsInfo;
import com.shinowit.entity.TMeOutStockInfo;
import com.shinowit.service.ChuKuDoubleUpdateServ;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-11-30.
 */
public class ChuKuDoubleUpdate extends ActionSupport {
    @Resource
    private ChuKuDoubleUpdateServ serviceupdate;

    private boolean success;

    private String message;

    private TMeOutStockDetailsInfo outStockDetailsInfo;

    private TMeOutStockInfo outStockInfo;

    public String outstockdoubleupdate(){
        try{
            boolean status = serviceupdate.servupdate(outStockInfo,outStockDetailsInfo);
            if(status==true){
                setSuccess(true);
                setMessage("更新成功");
                return SUCCESS;
            }else{
                setSuccess(false);
                setMessage("更新失败");
            }
        }catch(Exception e){
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

    public TMeOutStockDetailsInfo getOutStockDetailsInfo() {
        return outStockDetailsInfo;
    }

    public void setOutStockDetailsInfo(TMeOutStockDetailsInfo outStockDetailsInfo) {
        this.outStockDetailsInfo = outStockDetailsInfo;
    }

    public TMeOutStockInfo getOutStockInfo() {
        return outStockInfo;
    }

    public void setOutStockInfo(TMeOutStockInfo outStockInfo) {
        this.outStockInfo = outStockInfo;
    }
}
