package com.shinowit.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.sql.Timestamp;
import java.sql.Types;
import java.text.SimpleDateFormat;
import java.util.Date;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2014-12-06.
 */
@Repository
public class CurrentInstockMaxNumDao {
    @Resource
    private JdbcTemplate jt;

    public List<Map<String,Object>> listdetail(){
        List<Map<String,Object>> result=null;
        String sql = "select (b.Num*b.Price)as datail,c.MerchandiseName,a.OutTime from dbo.TMe_OutStockInfo a inner join dbo.TMe_OutStockDetailsInfo b on a.OutBillCode=b.OutBillCode inner join dbo.TMe_MerchandiseInfo c on b.MerchandiseID=c.MerchandiseID";
        result=jt.queryForList(sql,new Object[]{},new int[]{});
        return  result;
    }

    public List<Map<String,Object>> listdayprice(){
        List<Map<String,Object>> result = null;
        String sql = "select a.MerchandiseName,(b.Num*b.Price)as detail,c.InTime from dbo.TMe_MerchandiseInfo a inner join dbo.TMe_InStockDetailsInfo b on a.MerchandiseID=b.MerchandiseID inner join dbo.TMe_InStockInfo c on c.BillCode=b.BillCode";
        result = jt.queryForList(sql,new Object[]{},new int[]{});
        return result;
    }
}
