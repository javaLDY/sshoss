package com.shinowit.action.AdminiStrator;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.UpdateRoleDao;
import com.shinowit.entity.TAuRoleInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-12-11.
 */
public class NewUpdateRoleAction extends ActionSupport {

    @Resource
    private UpdateRoleDao updatedao;

    private boolean success;

    private String message;

    private List<String> sarry;

    private TAuRoleInfo role;

    public String roleupdate(){
        try{
            boolean status = updatedao.roleupdate(role,sarry);
            if(status==true){
                setSuccess(true);
                setMessage("更新成功");
                return SUCCESS;
            }else{
                setSuccess(true);
                setMessage("更新失败");
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        setSuccess(true);
        setMessage("更新失败");
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

    public List<String> getSarry() {
        return sarry;
    }

    public void setSarry(List<String> sarry) {
        this.sarry = sarry;
    }

    public TAuRoleInfo getRole() {
        return role;
    }

    public void setRole(TAuRoleInfo role) {
        this.role = role;
    }
}
