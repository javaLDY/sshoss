package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TAuOperInfo;
import org.apache.struts2.ServletActionContext;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by user on 2014/11/8.
 */
public class LoginAction extends ActionSupport {

    @Resource
    private BaseDao<TAuOperInfo> operdap;

    private List<TAuOperInfo> operlist;

    private TAuOperInfo oper;

    private boolean success;

    private boolean isno;

    private String message;

    private String checknum;

    public String operlogin() {
        String realchecknum = (String)ServletActionContext.getRequest().getSession().getAttribute("rand");
        if((checknum==null)||(!checknum.equals(realchecknum))){
            setSuccess(true);
            setIsno(false);
            setMessage("验证码输入不正确");
            return SUCCESS;
        }
        operlist = operdap.myfindByHql("from TAuOperInfo where operName=?",oper.getOperName());
        for(TAuOperInfo op : operlist) {

            if ((oper.getOperName() == null) || (!oper.getOperName().equals(op.getOperName()))) {
                setSuccess(true);
                setIsno(false);
                setMessage("用户名或者密码不正确");
                return SUCCESS;
            }
            if ((oper.getOperName().equals(op.getOperName()))&&(checknum.equals(realchecknum)) && (oper.getPwd().equals(op.getPwd()))) {
                setSuccess(true);
                setIsno(true);
                setMessage("登陆成功");

                Integer role_id=op.getTAuRoleInfoByRoleId().getRoleId();

                ServletActionContext.getRequest().getSession().setAttribute("src",op);
                ServletActionContext.getRequest().getSession().setAttribute("operid",op.getOperId());
                ServletActionContext.getRequest().getSession().setAttribute("roleId",role_id);

                return SUCCESS;
            }
        }
        setSuccess(true);
        setIsno(false);
        setMessage("因为系统原因,请重新登陆");
        return SUCCESS;
        }

    public String getChecknum() {
        return checknum;
    }

    public void setChecknum(String checknum) {
        this.checknum = checknum;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isIsno() {
        return isno;
    }

    public void setIsno(boolean isno) {
        this.isno = isno;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
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
