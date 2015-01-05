package com.shinowit.action.DingDan;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.dao.DingDanOutStoreDao;
import com.shinowit.entity.TMeOrderDetailsInfo;
import com.shinowit.entity.TMeOrderInfo;
import com.shinowit.service.DingDanService;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-12-09.
 */
public class DingDanInsertAction extends ActionSupport {
    @Resource
    private DingDanService dingdandao;

    private boolean success;

    private String message;

    private List<TMeOrderDetailsInfo> listvalue;

    private TMeOrderInfo ding;

    public String dingdaninsert(){
        try {
            boolean status = dingdandao.dingdaninsert(ding,listvalue);
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
        setSuccess(false);
        setMessage("插入失败");
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

    public List<TMeOrderDetailsInfo> getListvalue() {
        return listvalue;
    }

    public void setListvalue(List<TMeOrderDetailsInfo> listvalue) {
        this.listvalue = listvalue;
    }

    public TMeOrderInfo getDing() {
        return ding;
    }

    public void setDing(TMeOrderInfo ding) {
        this.ding = ding;
    }
}
