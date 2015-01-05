package com.shinowit.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;
/**
 * Created by Administrator on 2014-12-08.
 */
@Repository
public class DingDanOutStoreDao {

    @Resource
    private JdbcTemplate jt;

    public List<Map<String,Object>> listsoutstock(){
        List<Map<String,Object>> result = null;
        String sql = "select a.OutBillCode from dbo.TMe_OutStockInfo a ";
        result = jt.queryForList(sql,new Object[]{},new int[]{});
        return result;
    }

    public List<Map<String,Object>> listdelivery(){
        List<Map<String,Object>> result = null;
        String sql = "select a.DeliveryID,a.DeliveryName from dbo.TBa_DeliveryInfo a";
        result = jt.queryForList(sql,new Object[]{},new int[]{});
        return result;
    }

    public List<Map<String,Object>> listoperinfo(){
        List<Map<String,Object>> result = null;
        String sql = "select c.OperID,c.OperName from dbo.TAu_OperInfo c";
        result = jt.queryForList(sql,new Object[]{},new int[]{});
        return result;
    }

    public List<Map<String,Object>> listmerber(){
        List<Map<String,Object>> result = null;
        String sql = "select d.ID,d.UserName from dbo.TBa_MemberInfo d";
        result = jt.queryForList(sql,new Object[]{},new int[]{});
        return result;
    }

    public List<Map<String,Object>> listmerchandise(){
        List<Map<String,Object>> result = null;
        String sql = "select a.MerchandiseID,a.MerchandiseName from dbo.TMe_MerchandiseInfo a";
        result = jt.queryForList(sql,new Object[]{},new int[]{});
        return result;
    }

    public List<Map<String,Object>> listunite(){
        List<Map<String,Object>> result = null;
        String sql = "select d.UnitID,d.Name from dbo.TMe_UnitInfo d";
        result = jt.queryForList(sql,new Object[]{},new int[]{});
        return result;
    }


    public List<Map<String,Object>> operroleselect(){
        List<Map<String,Object>> result = null;
        String sql = "select * from TAu_RoleInfo where State='true'";
        result = jt.queryForList(sql,new Object[]{},new int[]{});
        return result;
    }
}
