package com.shinowit.action.InStockInfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeInStockInfo;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-11-21.
 */
public class SingleInStockInfodelete extends ActionSupport {
    @Resource
    private BaseDao<TMeInStockInfo> baseDao;

    private boolean success;

    private String message;

    private String arry;

    public String singledeleteinstockinfo(){
        String sarry[] = arry.split(",");
        for(String ss : sarry){
            int a = baseDao.executeHQL("delete from TMeInStockInfo where billCode=?",Integer.valueOf(ss));
            if(a>0){
                setSuccess(true);
                setMessage("删除成功");
            }else{
                setSuccess(false);
                setMessage("删除失败");
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

    public String getArry() {
        return arry;
    }

    public void setArry(String arry) {
        this.arry = arry;
    }
}
