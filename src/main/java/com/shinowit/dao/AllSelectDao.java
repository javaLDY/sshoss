package com.shinowit.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2014/12/15.
 */
@Repository
public class AllSelectDao  {
    @Resource
    private JdbcTemplate jt;

    public List<Map<String,Object>> merchaninfolist(){
        List<Map<String,Object>> result = null;
        String sql= "select * from dbo.TMe_MerchandiseInfo";
        result = jt.queryForList(sql,new Object[]{},new int[]{});
        return result;
    }
}
