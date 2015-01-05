package com.shinowit.action.InStockInfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeInStockDetailsInfo;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-11-20.
 */
public class InStockInfoDetaildelete extends ActionSupport {
    @Resource
    private BaseDao<TMeInStockDetailsInfo> baseDao;

    private boolean success;

    private String message;

    private String arry;

    public String instockdetailsdelete(){
        String []sarry = arry.split(",");
        int a=0 ;
        for(String ss : sarry){
           a  = baseDao.executeHQL("delete from TMeInStockDetailsInfo where id=?",Integer.valueOf(ss));
        }
        if(a>0){
            setSuccess(true);
            setMessage("删除成功");
        }else{
            setSuccess(false);
            setMessage("删除失败");
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
