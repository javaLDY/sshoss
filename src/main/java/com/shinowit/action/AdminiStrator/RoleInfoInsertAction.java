package com.shinowit.action.AdminiStrator;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TAuMenuInfo;
import com.shinowit.entity.TAuRoleInfo;
import com.shinowit.service.AdminiStratorInsert;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-12-01.
 */
public class RoleInfoInsertAction extends ActionSupport {
    @Resource
    private BaseDao<TAuRoleInfo> baseDao;

    @Resource
    private AdminiStratorInsert serviceadmin;

    private boolean success;

    private String message;

    private List<TAuRoleInfo> rolelist;

    private TAuRoleInfo role;

    private List<TAuMenuInfo> arry;

    public String roleinsert(){
        rolelist = baseDao.myfindByHql("from TAuRoleInfo where roleName=?",role.getRoleName());
        if(rolelist.size()>0){
            setSuccess(false);
            setMessage("角色信息已存在");
            return SUCCESS;
        }else{
            Object oo = serviceadmin.administratorinsertserv(role,arry);
            if(oo!=null){
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

    public List<TAuRoleInfo> getRolelist() {
        return rolelist;
    }

    public void setRolelist(List<TAuRoleInfo> rolelist) {
        this.rolelist = rolelist;
    }

    public TAuRoleInfo getRole() {
        return role;
    }

    public void setRole(TAuRoleInfo role) {
        this.role = role;
    }

    public List<TAuMenuInfo> getArry() {
        return arry;
    }

    public void setArry(List<TAuMenuInfo> arry) {
        this.arry = arry;
    }
}
