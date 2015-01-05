package com.shinowit.action.DingDan;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.DingDanOutStoreDao;
import java.util.Map;
import java.util.List;
import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-12-08.
 */
public class DingDanStoreSelect extends ActionSupport {
    @Resource
    private DingDanOutStoreDao outstockbasedao;

    private List<Map<String,Object>> outstocklist;

    private List<Map<String,Object>> operinfolist;

    private List<Map<String,Object>> deliverylist;

    private List<Map<String,Object>> merberlist;

    private List<Map<String,Object>> merchanlist;

    private List<Map<String,Object>> unitlist;

    public String outstockselect(){
        outstocklist = outstockbasedao.listsoutstock();
        return SUCCESS;
    }
    public String operinfoselect(){
        operinfolist = outstockbasedao.listoperinfo();
        return SUCCESS;
    }
    public String deliveryselect(){
        deliverylist = outstockbasedao.listdelivery();
        return SUCCESS;
    }

    public String merberselect(){
        merberlist = outstockbasedao.listmerber();
        return SUCCESS;
    }

    public String merchanselect(){
        merchanlist = outstockbasedao.listmerchandise();
        return SUCCESS;
    }

    public String unitselect(){
        unitlist = outstockbasedao.listunite();
        return SUCCESS;
    }

    public List<Map<String, Object>> getMerchanlist() {
        return merchanlist;
    }

    public void setMerchanlist(List<Map<String, Object>> merchanlist) {
        this.merchanlist = merchanlist;
    }

    public List<Map<String, Object>> getUnitlist() {
        return unitlist;
    }

    public void setUnitlist(List<Map<String, Object>> unitlist) {
        this.unitlist = unitlist;
    }

    public List<Map<String, Object>> getOutstocklist() {
        return outstocklist;
    }

    public void setOutstocklist(List<Map<String, Object>> outstocklist) {
        this.outstocklist = outstocklist;
    }

    public List<Map<String, Object>> getOperinfolist() {
        return operinfolist;
    }

    public void setOperinfolist(List<Map<String, Object>> operinfolist) {
        this.operinfolist = operinfolist;
    }

    public List<Map<String, Object>> getDeliverylist() {
        return deliverylist;
    }

    public void setDeliverylist(List<Map<String, Object>> deliverylist) {
        this.deliverylist = deliverylist;
    }

    public List<Map<String, Object>> getMerberlist() {
        return merberlist;
    }

    public void setMerberlist(List<Map<String, Object>> merberlist) {
        this.merberlist = merberlist;
    }
}
