package com.shinowit.action.ProStatusInfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeProStatusInfo;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-11-16.
 */
public class ProStatusInfodelete extends ActionSupport {
    @Resource
    private BaseDao<TMeProStatusInfo> baseDao;

    private boolean success;

    private String message;

    private TMeProStatusInfo pro;

    private String arry;

    public String prostatusinfodelete(){
        String []sarry = arry.split(",");
        for(String ss : sarry){
            int i = baseDao.executeHQL("delete from TMeProStatusInfo where proStatusId=?",Integer.valueOf(ss));
            if(i<1){
                setSuccess(false);
                setMessage("删除失败,请重新删除");
            }
            if(i==1){
                setSuccess(true);
                setMessage("删除成功,请重新查看");
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

    public TMeProStatusInfo getPro() {
        return pro;
    }

    public void setPro(TMeProStatusInfo pro) {
        this.pro = pro;
    }
}
