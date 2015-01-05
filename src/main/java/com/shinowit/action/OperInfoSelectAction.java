package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TAuOperInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-18.
 */
public class OperInfoSelectAction extends ActionSupport {

    @Resource
    private BaseDao<TAuOperInfo> baseDao;

    private List<TAuOperInfo> operlist;

    private TAuOperInfo oper;

    public String operinfoselect(){
        operlist = baseDao.listAll(TAuOperInfo.class);
        return  SUCCESS;
    }

    public TAuOperInfo getOper() {
        return oper;
    }

    public void setOper(TAuOperInfo oper) {
        this.oper = oper;
    }

    public List<TAuOperInfo> getOperlist() {
        return operlist;
    }

    public void setOperlist(List<TAuOperInfo> operlist) {
        this.operlist = operlist;
    }
}
