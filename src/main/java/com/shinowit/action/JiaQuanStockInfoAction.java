package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeStockInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-25.
 */
public class JiaQuanStockInfoAction extends ActionSupport {
    @Resource
    private BaseDao<TMeStockInfo> stockinfobasedao;

    private List<TMeStockInfo> stockInfoList;

    private String arry;

    public String stockinfoselect(){
        try{
            stockInfoList = stockinfobasedao.myfindByHql("from TMeStockInfo where TMeMerchandiseInfoByMerchandiseId.merchandiseId=?",Integer.valueOf(arry));
        }catch (Exception e){
            e.printStackTrace();
        }

        return SUCCESS;
    }

    public String getArry() {
        return arry;
    }

    public void setArry(String arry) {
        this.arry = arry;
    }

    public List<TMeStockInfo> getStockInfoList() {
        return stockInfoList;
    }

    public void setStockInfoList(List<TMeStockInfo> stockInfoList) {
        this.stockInfoList = stockInfoList;
    }
}
