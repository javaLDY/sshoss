package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeOrderInfo;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by Administrator on 2014-12-10.
 */
public class ProduceBillCodeAction extends ActionSupport {
    @Resource
    private BaseDao<TMeOrderInfo> baseDao;

    private TMeOrderInfo orderInfo;

    private List<Object[]> list;

    SimpleDateFormat sf=new SimpleDateFormat("yyyyMMdd");
    String date=sf.format(new Date());

    private String str;
    public  String generatBillCode(){

        String min=date+"00001";
        String max=date+"99999";

        List str1=baseDao.extcuteSQL(" select BillCode from TMe_OrderInfo WHERE BillCode like '"+date+"%'");
        if (str1.size()==0){
            str=min;
            return SUCCESS;
        }else {
            String ss=(String)str1.get(str1.size()-1);
            String sss=  ss.substring(ss.length()-5,ss.length());
            int i=Integer.parseInt(sss);
            i++;
            String s = String.valueOf(i);
            str= date+numString(s);
            return SUCCESS;
        }
    }

    public static  String  numString(String str){//递归生成后五位字符串
        if (str.length()==5){
            return str;
        }else{
            return numString("0"+str);
        }
    }

    public String getStr() {
        return str;
    }

    public void setStr(String str) {
        this.str = str;
    }

    public List<Object[]> getList() {
        return list;
    }

    public void setList(List<Object[]> list) {
        this.list = list;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
