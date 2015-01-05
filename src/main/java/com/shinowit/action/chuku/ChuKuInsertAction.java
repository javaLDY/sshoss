package com.shinowit.action.chuku;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeOutStockDetailsInfo;
import com.shinowit.entity.TMeOutStockInfo;
import com.shinowit.service.ChuKuInsert;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-25.
 */
public class ChuKuInsertAction extends ActionSupport {
    @Resource
    private ChuKuInsert chukuservice;

    private boolean success;

    private String message;

    private TMeOutStockInfo outStockInfo;

    private List<TMeOutStockDetailsInfo> listvalue;

    public String chukuinsert(){
        try{
            boolean status = chukuservice.chukuinsert(outStockInfo,listvalue);
            if(status==true){
                setSuccess(true);
                setMessage("插入成功");
                return SUCCESS;
            }else{
                setSuccess(false);
                setMessage("插入失败");
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

    public TMeOutStockInfo getOutStockInfo() {
        return outStockInfo;
    }

    public void setOutStockInfo(TMeOutStockInfo outStockInfo) {
        this.outStockInfo = outStockInfo;
    }

    public List<TMeOutStockDetailsInfo> getListvalue() {
        return listvalue;
    }

    public void setListvalue(List<TMeOutStockDetailsInfo> listvalue) {
        this.listvalue = listvalue;
    }
}
