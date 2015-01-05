package com.shinowit.action.GYSinference;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TBaSupplierInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by user on 2014/11/12.
 */
public class GYSdeleteAction extends ActionSupport {

    @Resource
    private BaseDao<TBaSupplierInfo> basedao;

    private boolean success;

    private String message;

    private String arry;

    public String gysdelete(){
        String []sArrays=arry.split(",");
        for(String s:sArrays){
            int i=basedao.executeHQL("delete from TBaSupplierInfo where supplierId=?",Integer.valueOf(s));
            if(i<1){
                setSuccess(false);
                setMessage("网络异常删除失败！");
            }
            if(i==1){
                setSuccess(true);
                setMessage("删除成功");
            }
        }
        return SUCCESS;
    }

    public String getArry() {
        return arry;
    }

    public void setArry(String arry) {
        this.arry = arry;
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
