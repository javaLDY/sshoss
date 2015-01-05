package com.shinowit.action.AdminiStrator;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TAuOperInfo;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-12-04.
 */
public class OperInfoUpdataeAction extends ActionSupport {
    @Resource
    private BaseDao<TAuOperInfo> baseDao;

    private boolean success;

    private String message;

    private TAuOperInfo oper;

    public String operupdate(){
        try{
            Object uu = baseDao.update(oper);
            if(uu!=null){
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

    public TAuOperInfo getOper() {
        return oper;
    }

    public void setOper(TAuOperInfo oper) {
        this.oper = oper;
    }
}
