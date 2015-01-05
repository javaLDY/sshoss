package com.shinowit.action.InStockInfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeInStockDetailsInfo;
import com.shinowit.entity.TMeInStockInfo;
import com.shinowit.service.InStockDateil;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-18.
 */
public class InStockInfoinsertaction extends ActionSupport {

    private boolean success;

    private String message;

    private TMeInStockInfo instock;

    private List<TMeInStockDetailsInfo> instockdetail;

    @Resource
    private InStockDateil serviceinstockdateil;
    public String instockinfoinsert(){
        boolean status = serviceinstockdateil.instockdetails(instock,instockdetail);
        if(status==true){
            setSuccess(true);
            setMessage("插入成功");
        }else{
            setSuccess(false);
            setMessage("插入失败");
        }
        return SUCCESS;
    }

    public List<TMeInStockDetailsInfo> getInstockdetail() {
        return instockdetail;
    }

    public void setInstockdetail(List<TMeInStockDetailsInfo> instockdetail) {
        this.instockdetail = instockdetail;
    }

    public TMeInStockInfo getInstock() {
        return instock;
    }

    public void setInstock(TMeInStockInfo instock) {
        this.instock = instock;
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
