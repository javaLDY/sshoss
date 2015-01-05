package com.shinowit.action.GYSinference;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TBaSupplierInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by user on 2014/11/11.
 */
public class GYSaction extends ActionSupport {

    @Resource
    private BaseDao<TBaSupplierInfo> supbasedao;

    private boolean success;

    private String message;



    private TBaSupplierInfo supper;

    private List<TBaSupplierInfo> list;



    public String superinsert(){

        list = supbasedao.myfindByHql("from TBaSupplierInfo where supplierName=?",supper.getSupplierName());
            if(list.size()>0){
                setSuccess(false);
                setMessage("供应商已存在,请查看后在添加");
                return SUCCESS;
        }
        Object su = supbasedao.insert(supper);
        if(su==null){
            setSuccess(false);
            setMessage("系统原因,无法录入，请重新输入");
            return SUCCESS;
        }
        if(su!=null){
            setSuccess(true);
            setMessage("录入成功,请查看工具栏的供应商编码");
            return SUCCESS;
        }
           return SUCCESS;
    }



    public List<TBaSupplierInfo> getList() {
        return list;
    }

    public void setList(List<TBaSupplierInfo> list) {
        this.list = list;
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

    public TBaSupplierInfo getSupper() {
        return supper;
    }

    public void setSupper(TBaSupplierInfo supper) {
        this.supper = supper;
    }
}
