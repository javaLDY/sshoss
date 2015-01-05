package com.shinowit.action.AdminiStrator;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TAuOperInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-12-01.
 */
public class OperInfoInsertAction extends ActionSupport {
    @Resource
    private BaseDao<TAuOperInfo> baseDao;

    private boolean success;

    private String message;

    private TAuOperInfo oper;

    private List<TAuOperInfo> operInfoList;

    public String operinfoinsert(){
        operInfoList = baseDao.myfindByHql("from TAuOperInfo where operName=?",oper.getOperName());
        if(operInfoList.size()>0){
            setSuccess(false);
            setMessage("管理员已存在");
            return SUCCESS;
        }else{
            Object aa = baseDao.insert(oper);
            if(aa!=null){
                setSuccess(true);
                setMessage("提交成功");
                return SUCCESS;
            }else{
                setSuccess(false);
                setMessage("提交失败");
            }
        }
        return SUCCESS;
    }

    public List<TAuOperInfo> getOperInfoList() {
        return operInfoList;
    }

    public void setOperInfoList(List<TAuOperInfo> operInfoList) {
        this.operInfoList = operInfoList;
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
